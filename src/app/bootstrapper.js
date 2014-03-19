define(['jQuery', 'model/Grid', 'Visualizer', 'finders/Dijkstra'], function($, Grid, Visualizer, Dijkstra) {

    function start() {
        var grid = new Grid(25, 35);
        var visualizer = new Visualizer('#grid', 18, grid);
        var dijkstra = new Dijkstra();
        
        $('#resetButton').click(function reset() {
            for (var i = 0; i < grid.vertices.length; i++) {
                for (var j = 0; j < grid.vertices[i].length; j++) {
                    grid.vertices[i][j].reset();
                }
            }
            visualizer.reset(grid.vertices);
        });

        $('#startButton').click(function start() {
            var startVertex = grid.vertices[1][2];
            var endVertex = grid.vertices[20][30];
            
            startVertex.cost = 0.0;
            startVertex.isStart = true;
            endVertex.isEnd = true;
            visualizer.isGridReady = false;
            
            dijkstra.search(startVertex, endVertex).progress(function () {
                visualizer.update();
            }).then(function () {
                visualizer.update();
                visualizer.complete(function () {
                    for (var i = 0; i < rows; i++) {
                        for (var j = 0; j < cols; j++) {
                            grid.vertices[i][j].reset();
                        }
                    }
                });
            });
        });
    }
    
    return {
        start: start
    };
});