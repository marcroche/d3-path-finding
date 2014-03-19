define(['Q', 'model/MinPriorityQueue'], function(Q, MinPriorityQueue) {
    var priorityQueue;
    var distTo = [];
    var shortestEdges = [];
    var startVertex, endVertex;
    
    function relax(edge) {
        var source = edge.source;
        var target = edge.target;

        if (target.isBlocked) {
            return;
        }

        if (target.cost > source.cost + edge.weight) {
            target.cost = source.cost + edge.weight;

            var se = _.findWhere(shortestEdges, { key: target.key });
            if (se !== undefined) {
                se.edge = edge;
            } else {
                shortestEdges.push({ key: target.key, edge: edge });
            }

            if (priorityQueue.contains(target.key)) {
                priorityQueue.decreaseKey(target.heapIndex, target.cost);
            } else {
                priorityQueue.push(target);
            }
        }
    }

    function shortestPath(destinationKey) {
        var path = [];
        var e = _.findWhere(shortestEdges, { key: destinationKey });

        if (e === undefined) {
            return path;
        }

        while (e !== undefined) {
            e = _.findWhere(shortestEdges, { key: e.edge.source.key });
            path.unshift(e);
        }
        return path;
    }

    function search(_startVertex, _endVertex) {
        var deferred = Q.defer();
        
        startVertex = _startVertex;
        endVertex = _endVertex;

        priorityQueue.push(startVertex);
        shortestEdges = [];

        var runner = setInterval(function () {
            var v = priorityQueue.pop();
            v.heapIndex = -1;
            for (var i = 0; i < v.edges.length; i++) {
                relax(v.edges[i]);
            }
            v.visited = true;
            deferred.notify({
                status: 'visited'
            });

            if (priorityQueue.isEmpty()) {
                clearInterval(runner);
                var sp = shortestPath(endVertex.key);

                if (sp.length === 0) {
                    deferred.resolve();
                }
                for (var s = 0; s < sp.length; s++) {
                    if (sp[s] !== undefined) {
                        sp[s].edge.target.isOnPath = true;
                    }
                }
                deferred.notify({
                    status: 'complete'
                });
                deferred.resolve();
            }
        }, 25);

        return deferred.promise;
    }

    var api = function () {
        priorityQueue = new MinPriorityQueue('key', 'cost', []);

        this.search = search;
    };

    return api;
});