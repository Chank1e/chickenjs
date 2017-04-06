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
  var canvasElem = document.getElementById(elem),
      ctx=canvasElem.getContext('2d');
      //Fullscreen function
      this.fullScreen=function(resizeFunc,t='F'){
        if(t=="F"){setFullWidth(canvasElem);setFullHeight(canvasElem);}
        else if(t=="H"){setFullHeight(canvasElem);}
        else if(t=="W"){setFullWidth(canvasElem);};
        if(resizeFunc){window.addEventListener('resize',function(){setFullWidth(canvasElem);setFullHeight(canvasElem);})};
      };
      //Background-color function
      this.bg=function(color){

      };
};
