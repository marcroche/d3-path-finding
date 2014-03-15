define(function() {

    var Edge = function(source, target, weight) {
        this.weight = weight;
        this.target = target;
        this.source = source;
    };
    
    return Edge;
});