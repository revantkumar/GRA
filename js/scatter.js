function scatterChart() {
// create the chart
    var chart;
    nv.addGraph(function() {
        chart = nv.models.scatterChart()
            .showDistX(true)
            .showDistY(true)
            .useVoronoi(true)
            .color(d3.scale.category10().range())
            .duration(300)
        ;
        chart.dispatch.on('renderEnd', function(){
            console.log('render complete');
        });

        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));
        chart.tooltipContent(function(key) {
            return '<h2>' + key + '</h2>';
        });

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

    var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);


    // register our custom symbols to nvd3
    // make sure your path is valid given any size because size scales if the chart scales.
    nv.utils.symbolMap.set('thin-x', function(size) {
        size = Math.sqrt(size);
        return 'M' + (-size/2) + ',' + (-size/2) +
                'l' + size + ',' + size +
                'm0,' + -(size) +
                'l' + (-size) + ',' + size;
    });

        var framegroup = d3.select("#chart");

        var svg = framegroup.append("g")
                  .attr("id", "groupScatter")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  .call(zoom);

        d3.select('#groupScatter')
            .datum(randomData(4,40))
            .call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });
        return chart;
    });


    function randomData(groups, points) { //# groups,# points per group
        // smiley and thin-x are our custom symbols!
        var data = [],
            shapes = ['thin-x', 'circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
            random = d3.random.normal();

        for (i = 0; i < groups; i++) {
            data.push({
                key: 'Group ' + i,
                values: []
            });

            for (j = 0; j < points; j++) {
                data[i].values.push({
                    x: random(),
                    y: random(),
                    size: Math.round(Math.random() * 100) / 100,
                    shape: shapes[j % shapes.length]
                });
            }
        }

        return data;
    }

function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}

}