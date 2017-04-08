'use strict';
function setFullWidth(o_O){
  o_O.width = document.documentElement.clientWidth;
};
function setFullHeight(O_o){
  O_o.height = document.documentElement.clientHeight;
};
var Chicken = function(elem){
  this.obj = this,
  this.canvasElem = document.getElementById(elem),
  this.ctx=this.canvasElem.getContext('2d'),
  this.resizeFunctions=[],
  this.isResizableVal=true;
};
Chicken.prototype = {
  //Fullscreen function
  fullScreen : function(t='F'){
    var self = this;
    function draw(){
    if(t=="F"){setFullWidth(self.canvasElem);setFullHeight(self.canvasElem);}
    else if(t=="H"){setFullHeight(self.canvasElem);}
    else if(t=="W"){setFullWidth(self.canvasElem);};
    };
    draw();
    if(this.isResizableVal){window.addEventListener('resize',draw)};
    return this;
  },

  //Background-color function
  bg : function(color){
    var self = this;
    function draw(){
    self.ctx.fillRect(0,0,self.canvasElem.width,self.canvasElem.height);
    };
    draw();
    if(this.isResizableVal){window.addEventListener('resize',draw)};
    return this;
  },
    border : function(color,width){
      var self = this;
      function draw(){
        self.ctx.lineWidth=width;
      self.ctx.strokeStyle=color;
      self.ctx.lineCap="round";
      self.ctx.stroke();
      };
      draw();
      if(this.isResizableVal){window.addEventListener('resize',draw)};
      return this;
    },
    fill : function(color){
      var self = this;
      function draw(){
      self.ctx.fillStyle=color;
      self.ctx.fill();
      };
      draw();
      if(this.isResizableVal){window.addEventListener('resize',draw)};
      return this;
    },
    regularPolygon : function(x,y,n,r){
      var self = this;
      function draw(){
        var z=0,
            pi = Math.PI,
            x0=x+r,
            y0=y;
            self.ctx.beginPath();
            self.ctx.moveTo(x0,y0);
        for(let i = 1;i<=n;i++){
          var zNext =  (2*pi*i)/n,
          nextX = x+r*Math.cos(zNext),
          nextY = y+r*Math.sin(zNext);
          self.ctx.lineTo(nextX,nextY);
        };
      };
      draw();
      if(this.isResizableVal){window.addEventListener('resize',draw)};
      return this;
    },
};
