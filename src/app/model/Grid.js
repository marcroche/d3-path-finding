define(['model/Vertex', 'model/Edge'], function(Vertex, Edge) {

    var Grid = function(rows, cols) {
        var self = this;
        this.vertices = [];
        this.cols = cols;
        this.rows = rows;

        function findNeighbors() {
            for(var r = 0; r < self.rows; r++) {
                for(var c = 0; c < self.cols; c++) {
                    if(c - 1 >= 0) {
                        self.vertices[r][c].edges.push(new Edge(self.vertices[r][c], self.vertices[r][c - 1], 1.0));
                    }

                    if(c + 1 < cols) {
                        self.vertices[r][c].edges.push(new Edge(self.vertices[r][c], self.vertices[r][c + 1], 1.0));
                    }

                    if(r - 1 >= 0) {
                        self.vertices[r][c].edges.push(new Edge(self.vertices[r][c], self.vertices[r - 1][c], 1.0));
                    }

                    if(r + 1 < rows) {
                        self.vertices[r][c].edges.push(new Edge(self.vertices[r][c], self.vertices[r + 1][c], 1.0));
                    }
                }
            }
        }
        
        function createGraph() { 
            self.vertices = [];
            for(var i = 0; i < self.rows; i++) {
                var r = [];
                for (var j = 0; j < self.cols; j++) {
                    r.push(new Vertex(i, j));
                }
                self.vertices.push(r);
            }
        }

        createGraph();
        findNeighbors();
    };

    return Grid;
});