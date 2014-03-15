define(function() {
    var Vertex = function(row, column) {
  
        this.key = '[' + row + ',' + column + ']';
        this.row = row;
        this.column = column;

        this.heapIndex = -1;
        this.visited = false;
        this.isOnPath = false;
        this.cost = Number.POSITIVE_INFINITY;
        this.edges = [];

        this.isBlocked = false;
        this.isStart = false;
        this.isEnd = false;
    };
    
    Vertex.prototype.reset = function() {
        this.heapIndex = -1;
        this.visited = false;
        this.isOnPath = false;
        this.cost = Number.POSITIVE_INFINITY;
        this.isBlocked = false;
        this.isStart = false;
        this.isEnd = false;
    };
    
    return Vertex;
});