//Chank1e - 16-years old developer =3
//LOL KEK Cheburek
//vk.com/chank1e
//github.com/chank1e
//Just Chicken.JS
//Library for canvas
'use strict';
function setFullWidth(o_O){
  o_O.width = document.documentElement.clientWidth;
};
function setFullHeight(O_o){
  O_o.height = document.documentElement.clientHeight;
};
function Chicken(elem){
  //variables main
  var canvasElem = document.getElementById(elem),
      ctx=canvasElem.getContext('2d'),
      resizeFunctions=[],
      isResizable=true;
      //is resizable func
      this.isResizable = function(i_r){
        isResizable=i_r||true;
      }
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
      //Resize function eval here \/
      function resizeEvalFunctions(){
        if(isResizable){
          resizeFunctions.forEach(function(item,i,arr){
            eval(item);
          });
        };
      };
      //eval resizable functions when resize
      window.addEventListener('resize',resizeEvalFunctions);
};
