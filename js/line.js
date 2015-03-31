function drawLine() {
	var svg, frameGroup, dragCircle, resizeCircle, dragRect, dragBarTop, dragBarRight, rotateHandler,
    x = 100, y = 100,
    angle = 0,
    r = 40//, height = 5,
    dragR = 6,
    that = this;

    svg = d3.select('#canvasSVG').attr({
        width: 1000,
        height: 800
    });

    frameGroup = svg.append('g')
.attr({
    'pointer-events': 'all',
    'class': 'dummy frameGroup'
});

    dragLine = frameGroup.append("line")
       .attr("class","vizline")
       .attr("x1",x)
       .attr("x2",y)
       .attr("y1",)
       .attr("y2",r)
       .attr("fill","black")
       .style("opacity",0.5)
       .attr('cursor', 'move')
       .call(d3.behavior.drag().origin(function() {
           return {x: 0, y: 0}
       }).on('drag', function() {
          x = x + d3.event.dx;
          y = y + d3.event.dy;        
          positionate();
       }));

    resizeCircle = frameGroup.append("circle")
       .attr("class","circleareadragger")
       .attr("cx",x+r)
       .attr("cy",y)
       .attr("r",dragR)
       .attr("fill","black")
       .call(d3.behavior.drag().on('drag', function() {
        r = r + d3.event.dx;
        if (r < dragR) {
            return;
        }        
        positionate();
    }));
    
    positionate(); 

    function positionate() {
    var translate;

    translate = 'translate(' + x + ',' + y + ')';
    dragCircle.attr('transform', translate);
    dragCircle.attr('r', r);

    translate = 'translate(' + (x + (r-40)) + ',' + y + ')';
    resizeCircle.attr('transform', translate);
    }	
}
	var line;

var svg = d3.select("#canvasSVG");

var frameGroup = svg.append('g')
.attr({
    'pointer-events': 'all',
    'class': 'dummy frameGroup'
});

var vis = framegroup.append("line").on("mousedown", mousedown).on("mouseup", mouseup);

function mousedown() {
    var m = d3.mouse(this);
    line = vis
    	.attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1]);
    
    vis.on("mousemove", mousemove);
}

function mousemove() {
    var m = d3.mouse(this);
    line.attr("x2", m[0])
        .attr("y2", m[1]);
}

function mouseup() {
    vis.on("mousemove", null);
}
}