define(['jQuery', 'model/Grid', 'Visualizer', 'finders/Dijkstra', 'model/Vertex', 'model/Edge'], 
        function($, Grid, Visualizer, Dijkstra, Vertex, Edge) {

    function start() {
        var grid = new Grid(25, 35, Vertex, Edge);
        var visualizer = new Visualizer('#grid', 25, 35, 20, grid.vertices);
        var dijkstra = new Dijkstra(grid.vertices[1][2], grid.vertices[20][30], visualizer);
        
        $('#resetButton').click(function reset() {
            for (var i = 0; i < grid.vertices.length; i++) {
                for (var j = 0; j < grid.vertices[i].length; j++) {
                    grid.vertices[i][j].reset();
                }
            }
            visualizer.reset(grid.vertices);
        });
            

        $('#startButton').click(function start() {
            grid.vertices[1][2].cost = 0.0;
            grid.vertices[1][2].isStart = true;
            grid.vertices[20][30].isEnd = true;

            dijkstra.search().progress(function () {
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