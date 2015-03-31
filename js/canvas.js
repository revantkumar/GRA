var context;

$(document).ready(function() {
              var canvas = document.getElementById("drawingCanvas");
              canvas.width = $("#page-wrapper").width();
              canvas.height = $("#page-wrapper").height();
          });

// Check for the canvas tag onload. 
if(window.addEventListener) { 
    window.addEventListener('load', function () {
        var canvas, canvaso, contexto; 
        // Default tool. (chalk, line, rectangle) 
        var tool; 
        var tool_default = 'chalk'; 
  
        function init () { 
           canvaso = document.getElementById('drawingCanvas'); 
           if (!canvaso) { 
               alert('Error! The canvas element was not found!'); 
               return; 
           } 
           if (!canvaso.getContext) { 
               alert('Error! No canvas.getContext!'); 
               return; 
           } 
           // Create 2d canvas. 
           contexto = canvaso.getContext('2d'); 
           if (!contexto) { 
               alert('Error! Failed to getContext!'); 
               return; 
           } 
           // Build the temporary canvas. 
           var container = canvaso.parentNode;           

           canvas = document.createElement('canvas'); 
           if (!canvas) { 
               alert('Error! Cannot create a new canvas element!'); 
               return; 
           } 
           canvas.id = 'tempCanvas'; 
           canvas.width  = canvaso.width; 
           canvas.height = canvaso.height; 
           container.appendChild(canvas); 
           context = canvas.getContext('2d'); 
           context.strokeStyle = "#000000";// Default line color. 
           context.lineWidth = 1.0;// Default stroke weight. 
          
           // Fill transparent canvas with dark grey (So we can use the color to erase). 
           context.fillStyle = "#FFFFFF"; 
           //context.fillRect(0,0,897,532);//Top, Left, Width, Height of canvas.

           // Create a select field with our tools. 
           var tool_select = document.getElementById('selector'); 
           if (!tool_select) { 
               alert('Error! Failed to get the select element!'); 
               return; 
           } 
           tool_select.addEventListener('change', ev_tool_change, false); 
              
           // Activate the default tool (chalk). 
           if (tools[tool_default]) { 
             tool = new tools[tool_default](); 
             tool_select.value = tool_default; 
           } 
           // Event Listeners. 
           canvas.addEventListener('mousedown', ev_canvas, false); 
           canvas.addEventListener('mousemove', ev_canvas, false); 
           canvas.addEventListener('mouseup',   ev_canvas, false); 
        }


        // Get the mouse position. 
        function ev_canvas (ev) { 
            if (ev.layerX || ev.layerX == 0) { // Firefox 
                ev._x = ev.layerX; 
                ev._y = ev.layerY; 
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera 
                ev._x = ev.offsetX; 
                ev._y = ev.offsetY; 
            } 

            /*jQuery('#chalk').click(function(){
              $(this).data('clicked', true);
            });

            jQuery('#rect').click(function(){
              $(this).data('clicked', true);
            });

            jQuery('#line').click(function(){
              $(this).data('clicked', true);
            });

            var func;

            if(jQuery('#chalk').data('clicked'))
              func = document.getElementById("chalk").onclick;
            else if (jQuery('#rect').data('clicked'))
                    func = document.getElementById("rect").onclick;
                  else
                    func = document.getElementById("line").onclick;

            console.log(func);
            func(ev);
          }


            /*var funcRect = document.getElementById("rect").onclick;
            var funcChalk = document.getElementById("chalk").onclick;
            var funcLine = document.getElementById("line").onclick
            if(funcChalk)
              funcChalk(ev);
            else if(funcRect)
                  funcRect(ev);
                  else
                    funcLine(ev);*/


                        // Get the tool's event handler. 
           var func = tool[ev.type]; 
                if (func) { 
                   func(ev); 
                }
        }

        function ev_tool_change (ev) { 
            if (tools[this.value]) { 
                tool = new tools[this.value](); 
            } 
        } 
        
        // Create the temporary canvas on top of the canvas, which is cleared each time the user draws. 
        function img_update () { 
            contexto.drawImage(canvas, 0, 0); 
            context.clearRect(0, 0, canvas.width, canvas.height); 
        } 
        
        var tools = {}; 
        // Chalk tool. 

        tools.chalk = function () { 
            var tool = this; 
            this.started = false; 
            // Begin drawing with the chalk tool. 
            this.mousedown = function (ev) { 
                context.beginPath(); 
                context.moveTo(ev._x, ev._y); 
                tool.started = true; 
            }; 
            this.mousemove = function (ev) { 
                if (tool.started) { 
                   context.lineTo(ev._x, ev._y); 
                   context.stroke(); 
                } 
            }; 
            this.mouseup = function (ev) { 
                if (tool.started) { 
                   tool.mousemove(ev); 
                   tool.started = false; 
                   img_update(); 
                } 
            }; 
        };
      

        // The rectangle tool. 

          tools.rect = function () { 
          var tool = this; 
          this.started = false; 
          this.mousedown = function (ev) { 
             tool.started = true; 
             tool.x0 = ev._x; 
             tool.y0 = ev._y; 
          }; 
          this.mousemove = function (ev) { 
            if (!tool.started) { 
              return; 
            } 
           // This creates a rectangle on the canvas. 
           var x = Math.min(ev._x,  tool.x0), 
           y = Math.min(ev._y,  tool.y0), 
           w = Math.abs(ev._x - tool.x0), 
           h = Math.abs(ev._y - tool.y0); 
           context.clearRect(0, 0, canvas.width, canvas.height);// Clears the rectangle onload. 
            
           if (!w || !h) { 
             return; 
           } 
           context.strokeRect(x, y, w, h); 
          };

          // Now when you select the rectangle tool, you can draw rectangles. 
          this.mouseup = function (ev) { 
           if (tool.started) { 
             tool.mousemove(ev); 
             tool.started = false; 
             img_update(); 
           } 
           }; 
        };

        // The line tool. 
         tools.line = function () { 
            var tool = this; 
            this.started = false; 
            this.mousedown = function (ev) { 
                tool.started = true; 
               tool.x0 = ev._x; 
               tool.y0 = ev._y; 
            }; 

            this.mousemove = function (ev) { 
              if (!tool.started) { 
                  return; 
              } 
             context.clearRect(0, 0, canvas.width, canvas.height); 
             // Begin the line. 
             context.beginPath(); 
             context.moveTo(tool.x0, tool.y0); 
             context.lineTo(ev._x,   ev._y); 
             context.stroke(); 
             context.closePath(); 
            }; 

             // Now you can draw lines when the line tool is seletcted. 
             this.mouseup = function (ev) { 
                 if (tool.started) { 
                     tool.mousemove(ev); 
                     tool.started = false; 
                     img_update(); 
                  } 
              }; 
        };

 init();

 }, false); }

