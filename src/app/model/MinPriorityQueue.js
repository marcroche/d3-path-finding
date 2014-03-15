define(['underscore'], function(_) {

    var array = [];
    var keyFieldName;
    var valueFieldName;

    function leftChild(i) {
        return 2 * i + 1;
    }

    function rightChild(i) {
        return 2 * i + 2;
    }

    function parent(i) {
        return Math.floor(i / 2); 
    }

    function minHeapify(A, i, size) {
        var left = leftChild(i);
        var right = rightChild(i);
        var smallest;

        if(left <= size && A[left][valueFieldName] < A[i][valueFieldName]) {
            smallest = left; 
        } else {
            smallest = i; 
        }

        if(right <= size && A[right][valueFieldName] < A[smallest][valueFieldName]) {
            smallest = right; 
        }

        if(smallest != i) {
            var tmp = A[i];
            A[i] = A[smallest];
            A[smallest] = tmp;

            minHeapify(A, smallest, size);
        }
    }

    function buildMinHeap(A, size) {
        for(var i = Math.floor(size / 2); i >= 0; i--) { 
            minHeapify(A, i, size); 
        }
    }

    function decreaseKey(i, key){
        heapDecreaseKey(array, i, key);
    }

    function heapDecreaseKey(A, i, key) {
        while(i > 0 && A[parent(i)][valueFieldName] > A[i][valueFieldName]) {
            var tmp = A[i];
            A[i] = A[parent(i)];
            A[i].heapInded = i;
            A[parent(i)] = tmp;
            A[parent(i)].heapIndex = parent(i);
            i = parent(i);
        }
    }

    function peek() {
        if(array.length < 1) {
            throw 'peek(): Heap has no elements';
        }
        return array[0][valueFieldName];
    }

    function pop() {
        if(array.length < 1) {
            throw 'pop(): Heap has no elements';
        }

        var min = array[0];
        array[0] = array[array.length - 1];
        array.splice(array.length - 1, 1);

        minHeapify(array, 0, array.length - 1);

        return min;
    }

    function push(value) {
        array.push(value);
        value.heapIndex = array.length - 1;
        heapDecreaseKey(array, value.heapIndex, value);
    }

    function dump() {
        var dump = [];
        for(var i = 0; i < array.length; i++) {
            dump.push(i + ': ' + array[i]);
        }
        return dump.join(', ');
    }

    function isEmpty() {
        return array.length === 0;
    }

    function contains(key) {
        return _.findWhere(array, {key: key}) !== undefined;  
    }

    function clear() {
        array = [];
    }

    var api = function(_keyFieldName, _valueFieldName, _array) {
        keyFieldName = _keyFieldName;
        valueFieldName = _valueFieldName;

        if(_array !== undefined && _array.length > 0) {
            array = _array;
            buildMinHeap(array, array.length -1);
        }

        this.peek = peek;
        this.pop = pop;
        this.push = push;
        this.decreaseKey = decreaseKey;
        this.isEmpty = isEmpty;
        this.contains = contains;
        this.dump = dump;
        this.clear = clear;
    };

    return api;
});