define(['jQuery', 'model/GridGraph', 'model/Grid', 'finders/Dijkstra', 'model/Vertex', 'model/Edge'], 
        function($, GridGraph, Grid, Dijkstra, Vertex, Edge) {

    function start() {
        var gridGraph = new GridGraph(25, 35, Vertex, Edge);
        var grid = new Grid('#grid', 25, 35, 20, gridGraph.vertices);
        var dijkstra = new Dijkstra(gridGraph.vertices[1][2], gridGraph.vertices[20][30], grid);
        
        $('#resetButton').click(function reset() {
            for (var i = 0; i < gridGraph.vertices.length; i++) {
                for (var j = 0; j < gridGraph.vertices[i].length; j++) {
                    gridGraph.vertices[i][j].reset();
                }
            }
            grid.reset(gridGraph.vertices);
        });
            

        $('#startButton').click(function start() {
            gridGraph.vertices[1][2].cost = 0.0;
            gridGraph.vertices[1][2].isStart = true;
            gridGraph.vertices[20][30].isEnd = true;

            dijkstra.search().progress(function () {
                grid.update();
            }).then(function () {
                grid.update();
                grid.complete(function () {
                    for (var i = 0; i < rows; i++) {
                        for (var j = 0; j < cols; j++) {
                            gridGraph.vertices[i][j].reset();
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