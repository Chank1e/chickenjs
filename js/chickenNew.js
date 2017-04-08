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

    triangle : function(x,y,a){
      var self = this;
      function draw(){
      let h = Math.round((a*Math.sqrt(3))/2);
      self.ctx.beginPath();
      self.ctx.moveTo(x,y-Math.round(2*h/3));
      self.ctx.lineTo(x+Math.round(a/2),y+Math.round(h/3));
      self.ctx.lineTo(x-Math.round(a/2),y+Math.round(h/3));
      self.ctx.lineTo(x,y-Math.round(2*h/3));
      self.ctx.lineTo(x+Math.round(a/2),y+Math.round(h/3));
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
    hexagon : function(x,y,r){
      var self = this;
      function draw(){
        let xStart = x-Math.round(r/Math.sqrt(3)),
            yStart = y-r,
            a = Math.round(2*r/Math.sqrt(3)),
            a_2=Math.round(a/2),x_pos,y_pos;
            self.ctx.beginPath();
            x_pos=xStart,y_pos=yStart;
            self.ctx.moveTo(x_pos,y_pos);
            x_pos+=a;
            self.ctx.lineTo(x_pos,y_pos);
            x_pos+=a_2;y_pos+=r;
            self.ctx.lineTo(x_pos,y_pos);
            x_pos-=a_2;y_pos+=r;
            self.ctx.lineTo(x_pos,y_pos);
            x_pos-=a;
            self.ctx.lineTo(x_pos,y_pos);
            x_pos-=a_2;y_pos-=r;
            self.ctx.lineTo(x_pos,y_pos);
            x_pos+=a_2;y_pos-=r;
            self.ctx.lineTo(x_pos,y_pos);
            x_pos+=1;
            self.ctx.lineTo(x_pos,y_pos);
      };
      draw();
      if(this.isResizableVal){window.addEventListener('resize',draw)};
      return this;
    },
};
