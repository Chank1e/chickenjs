'use strict';
function setFullWidth(o_O){
  o_O.width = document.documentElement.clientWidth;
};
function setFullHeight(O_o){
  O_o.height = document.documentElement.clientHeight;
};
var Chicken = function(elem){
  this.canvasElem = document.getElementById(elem),
  this.ctx=this.canvasElem.getContext('2d'),
  this.isResizableVal=true,
  this.objects = [],
  this.lastCreatedObject={},
  this.layers = [];
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
    regularPolygon : function(x,y,n,r,angle){
      var self = this;
      function draw(){
        var pi = Math.PI,
            x0=r,
            y0=0;
            self.ctx.save();
            self.ctx.translate(x,y);
            self.ctx.rotate(angle*Math.PI/180);

            self.ctx.beginPath();
            self.ctx.moveTo(x0,y0);

        for(let i = 1;i<=n;i++){
          var zNext =  (2*pi*i)/n,
          nextX = r*Math.cos(zNext),
          nextY = r*Math.sin(zNext);
          if(i==1){var x1=nextX,y1=nextY};
          self.ctx.lineTo(nextX,nextY);
          if(i==n){self.ctx.lineTo(x1,y1);}
        };
        self.ctx.restore();

      };
      //draw();
      var idOfObject=this.objects.length;
      this.objects.push({id:idOfObject,draw:draw});
      this.lastCreatedObject=idOfObject;
      /*this.objects.forEach(function(item,i,arr){
        if(item.id==idOfObject){item.funcToDraw()};
      });*/
      //if(this.isResizableVal){window.addEventListener('resize',draw)};
      return this;
    },
    addToLayer : function(n){
      if (this.layers[n]==undefined){this.layers[n]=this.lastCreatedObject.toString();}
      else {this.layers[n]+=','+this.lastCreatedObject.toString();}
      return this;
    },
    drawLayer: function(n){
      var self = this;
      this.layers[n].split(',').forEach(function(item,i,arr){
        var id=item;
        self.objects.forEach(function(item,i,arr){
          if(item.id==id){item.draw()};
        });
      });
      return this;
    }
};
