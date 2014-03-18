define(['d3', 'model/Vertex', 'model/Edge'], function(d3, Vertex, Edge) {
    var self;
    var id, rows, cols, squareSize, data;
    var isMouseDown = false;
    var isGridReady = true;
    var grid, row, cell, w, h, scaleX, scaleY;
    
    d3.select(window).on('mousedown', function () { isMouseDown = true; });
    d3.select(window).on('mouseup', function () { isMouseDown = false; });
    
        function init() {
        scaleX = d3.scale.linear()
            .domain([0, 1])
            .range([0, w]);

        scaleY = d3.scale.linear()
            .domain([0, 1])
            .rangeRound([0, h]);

        grid = d3.select(id).append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + w + " 50")
            .attr("class", "chart");

        row = grid.selectAll('.row')
            .data(data, function (d) {
                return data.indexOf(d);
            })
            .enter()
            .append("svg:g")
          .attr("class", "row");

        cell = row.selectAll('.cell')
          .data(function (d) {
              return d;
          },
              function (d) {
                  return d.key;
              })
          .enter()
          .append('rect')
          .attr('x', function (d, i, r) {
              return i * squareSize;
          })
          .attr('y', function (d, i, r) {
              return r * squareSize;
          })
          .attr('width', squareSize)
          .attr('height', squareSize)
              .attr('class', 'cell')
          .style('fill', function (d) {
              return d.visited === false ? 'white' : 'blue';
          })
          .style("stroke", '#A5A5A5')
          .on('mouseover', function (d, i, a, p) {
              if (d.isBlocked === false && isGridReady) {
                  d3.select(this).style("fill", "#E2E2E2");
              }

              if (isMouseDown && isGridReady) {
                  d.isBlocked = true;
                  d3.select(this).style("fill", "#05056B");
                  d3.select(this).style("stroke", "#676767");
              }
          })
        .on('mouseout', function (d, i) {
            if (d.isBlocked === false && isGridReady) {
                d3.select(this).style("fill", "white");
            }
        })
        .on('mousedown', function (d, i) {
            if (d.isBlocked === false && isGridReady) {
                d.isBlocked = true;
                d3.select(this).style("fill", "#05056B");
                d3.select(this).style("stroke", "#676767");
            } else if (isGridReady) {
                d.isBlocked = false;
                d3.select(this).style("fill", "#E2E2E2");
                d3.select(this).style("stroke", "#676767");
            }
        });
    }

    function update() {
        var r = grid.selectAll('.row')
          .data(data, function (d) {
              return data.indexOf(d);
          });

        var c = r.selectAll('rect')
              .data(function (d) {
                  return d;
              }, function (d) {
                  return d.key;
              })
            .transition()
            .style('fill', function (d) {
                var fill = 'white';
                if (d.visited) {
                    fill = '#67CCFE';
                }
                if (d.isBlocked) {
                    fill = "#05056B";
                }
                if (d.isStart) {
                    fill = '#87FF6F';
                }
                if (d.isEnd) {
                    fill = '#FF0F0F';
                }
                if (d.isOnPath) {
                    fill = '#FFF886';
                }
                return fill;
            });
    }

    function complete() {
        isGridReady = false;
    }

    function reset(_data) {
        data = _data;
        isGridReady = true;
        update();
    }

    function resize() {
        w = parseInt(d3.select(id).style('width'), 10);

        scaleX.range([0, w]);
        scaleY.rangeRound([0, h]);

        d3.select(id)
            .attr("width", w)
            .attr("viewBox", "0 0 " + w + " 50");
    }

    var api = function (_id, _squareSize, _grid) {
        self = this;
        data = _grid.vertices;
        id = _id;
        cols = _grid.cols;
        rows = _grid.rows;
        squareSize = _squareSize;
        w = cols * squareSize;
        h = rows * squareSize;

        init();

        this.update = update;
        this.reset = reset;
        this.complete = complete;
        this.isGridReady = isGridReady;
    };

    return api;
});
