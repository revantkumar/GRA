$(function() {
  panZoomInstance = svgPanZoom('chart', {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true,
    minZoom: 0.1
  });
  
  // zoom out
  panZoomInstance.zoom(0.2)

  $("#move").on("click", function() {
    // Pan by any values from -80 to 80
    panZoomInstance.panBy({x: Math.round(Math.random() * 160 - 80), y: Math.round(Math.random() * 160 - 80)})
  });
})