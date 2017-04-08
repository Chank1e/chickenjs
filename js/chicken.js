//Chank1e - 16-years old developer =3
//LOL KEK Cheburek
//vk.com/chank1e
//github.com/chank1e
//Just Chicken.JS
//Library for canvas
//'use strict';

function Chicken(elem){
  console.log(this);
  //variables main
  var canvasElem = document.getElementById(elem),
      ctx=canvasElem.getContext('2d'),
      resizeFunctions=[],
      isResizableVal=true;
      //is resizable func
      this.isResizable =  function(i_r){isResizableVal=i_r||true;};

      //Fullscreen function
      this.fullScreen=function(t='F'){
        if(t=="F"){setFullWidth(canvasElem);setFullHeight(canvasElem);}
        else if(t=="H"){setFullHeight(canvasElem);}
        else if(t=="W"){setFullWidth(canvasElem);};
        resizeFunctions.push('setFullWidth(canvasElem);setFullHeight(canvasElem)');
      };

      //Background-color function
      this.bg=function(color){
        ctx.fillRect(0,0,canvasElem.width,canvasElem.height);
        resizeFunctions.push('ctx.fillRect(0,0,canvasElem.width,canvasElem.height)');
      };

      this.draw = function(){
        triangle = function(x,y,a){
          let h = Math.round(a*Math.sqrt(3)/2);
          ctx.beginPath();
          ctx.moveTo(x,y-Math.round(2*h/3));
          ctx.lineTo(x+Math.round(a/2),y+h);
          ctx.lineTo(x-a,y);
          ctx.lineTo(x+Math.round(a/2),y-h);
          this.stroke = function(color){
            ctx.strokeStyle=color;
            ctx.stroke();
          };
        };
      };

      //Resize function eval here \/
      function resizeEvalFunctions(){
        if(isResizableVal){
          resizeFunctions.forEach(function(item,i,arr){
            eval(item);
          });
        };
      };
      //eval resizable functions when resize
      window.addEventListener('resize',resizeEvalFunctions);
};
