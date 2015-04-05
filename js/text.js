function drawText() {
  var svg, frameGroup, dragCircle, resizeCircle, dragRect, dragBarTop, dragBarRight, rotateHandler,
    x = 200, y = 200,
    text = "hello",
    angle = 0,
    fontSize = 40//, height = 5,
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

    dragCircle = frameGroup.append("text")
       .text(text)
      .attr('font-family', 'sans-serif')
      .attr('font-size', fontSize)
      .attr('fill','green')
       .attr("x",x)
       .attr("y",y)
       .attr("contentEditable","true")
      .attr('class', 'dummy dragBarTop')
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
       .attr("cx",x)
       .attr("cy",y)
       .attr("r",dragR)
       .attr("fill","black")
       .call(d3.behavior.drag().on('drag', function() {
        fontSize = fontSize + d3.event.dx + d3.event.dy;
        if (fontSize < dragR) {
            return;
        }        
        positionate();
    }));
    
    positionate(); 

    function positionate() {
    var translate;

    translate = 'translate(' + x + ',' + y + ')';
    dragCircle.attr('transform', translate);
    dragCircle.attr('font-size', fontSize);

    
    resizeCircle.attr('transform', translate);
    } 
}