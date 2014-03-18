define(['model/Vertex', 'model/Edge'], function(Vertex, Edge) {

    var vertices = [];
    var self;
    var cols;
    var rows;
    
    function findNeighbors() {
        for(var r = 0; r < rows; r++) {
            for(var c = 0; c < cols; c++) {
                if(c - 1 >= 0) {
                    vertices[r][c].edges.push(new Edge(vertices[r][c], vertices[r][c - 1], 1.0));
                }

                if(c + 1 < cols) {
                    vertices[r][c].edges.push(new Edge(vertices[r][c], vertices[r][c + 1], 1.0));
                }

                if(r - 1 >= 0) {
                    vertices[r][c].edges.push(new Edge(vertices[r][c], vertices[r - 1][c], 1.0));
                }

                if(r + 1 < rows) {
                    vertices[r][c].edges.push(new Edge(vertices[r][c], vertices[r + 1][c], 1.0));
                }
            }
        }
    }
    
    function createGraph(_rows, _cols) {
        vertices = [];
        for(var i = 0; i < rows; i++) {
            var r = [];
            for (var j = 0; j < cols; j++) {
                r.push(new Vertex(i, j));
            }
            vertices.push(r);
        }
    }

    var api = function(_rows, _cols) {
        self = this;
        rows = _rows;
        cols = _cols;

        createGraph(rows, cols);
        findNeighbors();

        this.vertices = vertices;
        this.rows = rows;
        this.cols = cols;
    };

    return api;
});