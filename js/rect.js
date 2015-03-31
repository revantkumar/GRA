function drawRect() {
var svg, frameGroup, dragRect, dragBarTop, dragBarRight, rotateHandler, areaResize,
    x = 100, y = 100,
    angle = 0,
    width = 200, height = 100,
    bar = 6,
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

dragRect = frameGroup.append('rect')
.attr('class', 'dummy dragRect')
.attr('fill', 'black')
.attr('fill-opacity', 0.3)
.attr('cursor', 'move')
.call(d3.behavior.drag().origin(function() {
    return {x: 0, y: 0}
}).on('drag', function() {
    x = x + d3.event.dx;
    y = y + d3.event.dy;
    
    positionate();
}));

dragBarTop = frameGroup.append('rect')
.attr('class', 'dummy dragBarTop')
.attr('fill', 'black')
.attr('fill-opacity', 0.6)
.attr('cursor', 'ns-resize')
.call(d3.behavior.drag().on('drag', function() {
    height = height + (y - d3.event.y);
    y = d3.event.y;
    if (height < bar) {
        return;
    }
    
    positionate();
}));

dragBarRight = frameGroup.append('rect')
.attr('class', 'dummy dragBarRight')
.attr('fill', 'black')
.attr('fill-opacity', 0.6)
.attr('cursor', 'ew-resize')
.call(d3.behavior.drag().on('drag', function() {
    width = width + d3.event.dx;
    if (width < bar) {
        return;
    }
    
    positionate();
}));

rotateHandler = frameGroup.append('circle')
.attr('class', 'dummy rotateHandler')
.attr('r', bar)
.attr('fill', 'black')
.attr('fill-opacity', 1)
.attr('stroke-width', 1)
.attr('stroke', 'white')
.call(d3.behavior.drag().on('drag', function() {
    var pointerX = d3.event.sourceEvent.x,
        pointerY = d3.event.sourceEvent.y,
        centerX = x + width / 2,
        centerY = y + height / 2;
    
    angle = Math.atan2(pointerY - centerY, pointerX - centerX) * (180 / Math.PI);
    
    positionate();
}));
/*
var pointerX, pointerY;
areaResize = framegroup.append("circle")
       .attr("class","rectareadragger")
       .attr("cx",x+width)
       .attr("cy",y+height)
       .attr("r",bar)
       .attr("fill","black")
       .call(d3.behavior.drag().on('drag', function() {
        height = height + d3.event.dy;
        width = width + d3.event.dx;
        if ((width*height) < (Math.PI*dragR*dragR)) {
            return;
        }        
        pointerX = d3.event.sourceEvent.x,
        pointerY = d3.event.sourceEvent.y;
                //angle = Math.atan2(pointerY - centerY, pointerX - centerX) * (180 / Math.PI);
        
        positionate();
    }));*/

positionate();

function positionate() {
    var rotate, translate;
    rotate = ' rotate(' + angle + ', ' + (width / 2) + ', ' + (height / 2) + ')';
    translate = 'translate(' + x + ',' + y + ')';
    dragRect.attr('transform', translate + rotate);
    dragRect.attr('width', width);
    dragRect.attr('height', height);
    
    rotate = ' rotate(' + angle + ', ' + (width / 2) + ', ' + (height / 2) + ')';
    translate = 'translate(' + x + ',' + y + ')';
    dragBarTop.attr('transform', translate + rotate);
    dragBarTop.attr('height', bar);
    dragBarTop.attr('width', width);
    
    rotate = ' rotate(' + angle + ', ' + (-1 * width / 2) + ', ' + 0 + ')';
    translate = 'translate(' + (x + width) + ',' + (y + height / 2) + ')';
    rotateHandler.attr('transform', translate + rotate);
    
    rotate = ' rotate(' + angle + ', ' + (-1 * width / 2) + ', ' + (height / 2) + ')';
    translate = 'translate(' + (x + width) + ',' + y + ')';
    dragBarRight.attr('transform', translate + rotate);
    dragBarRight.attr('height', height);
    dragBarRight.attr('width', bar);

    /*rotate = ' rotate(' + angle + ', ' + (width / 2) + ', ' + (height / 2) + ')';
    translate = 'translate(' + (x + width - 200) + ',' + (y + height - 200) + ')';
    areaResize.attr('transform', translate + rotate);*/
}
}