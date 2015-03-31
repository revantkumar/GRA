function drawCircle() {
	var svg, frameGroup, dragCircle, resizeCircle, dragRect, dragBarTop, dragBarRight, rotateHandler,
    x = 200, y = 200,
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

    dragCircle = frameGroup.append("circle")
       .attr("class","vizelement")
       .attr("cx",x)
       .attr("cy",y)
       .attr("r",r)
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