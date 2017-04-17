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
  this.objects =0,
  this.selectedObject,
  this.layers = [],
  this.currentLayer=0,
  this.updateObjects=[],
  this.delayTime=0;
};
Chicken.prototype = {
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
  bg : function(color){
    var self = this;
    function draw(){
      self.ctx.fillStyle=color;
    self.ctx.fillRect(0,0,self.canvasElem.width,self.canvasElem.height);
    };
    if(this.layers[this.currentLayer]===undefined){this.layers[this.currentLayer]=[]};
    this.layers[this.currentLayer].push({
      id:self.objects+1,
      name:'BG',
      draw:draw,
      visible:true
    });
    this.objects++;
    return this;
  },
  regularPolygon : function(x,y,n,r,angle){
    var self = this;
    function draw(_x,_y,_n,_r,_angle){
      var pi = Math.PI,
          x0=_r,
          y0=0;
          self.ctx.save();
          self.ctx.translate(_x,_y);
          self.ctx.rotate(_angle*Math.PI/180);

          self.ctx.beginPath();
          self.ctx.moveTo(x0,y0);

      for(let i = 1;i<=_n;i++){
        var zNext =  (2*pi*i)/_n,
        nextX = _r*Math.cos(zNext),
        nextY = _r*Math.sin(zNext);
        if(i==1){var x1=nextX,y1=nextY};
        self.ctx.lineTo(nextX,nextY);
        if(i==_n){self.ctx.lineTo(x1,y1);}
      };
      self.ctx.restore();
    };
    var newObj = {
      id:self.objects+1,
      name:'regularPolygon',
      visible:true,
      x:x,
      y:y,
      n:n,
      radius:r,
      angle:angle,
      draw:function(){
        draw(this.x,this.y,this.n,this.radius,this.angle);
      }
    };
    if(this.layers[this.currentLayer]===undefined){this.layers[this.currentLayer]=[]};
    this.layers[this.currentLayer].push(newObj);
    this.objects++;
    this.selectedObject = newObj;
    return this;
  },
  fill : function(color){
    var self = this;
    self.layers.forEach(function(item,i,arr){
      item.forEach(function(atem,a,irr){

        if(atem.id==self.selectedObject.id){
          atem.fill=fill;
          function fill(){
            self.ctx.fillStyle=color;self.ctx.fill();
          };
          self.selectedObject.fill=fill;
        };
      });
    });
    return this;
  },
  border : function(color,width){
    var self = this;
    self.layers.forEach(function(item,i,arr){
      item.forEach(function(atem,a,irr){

        if(atem.id==self.selectedObject.id){
          atem.border=border;
          function border(){
            if(width){self.ctx.lineWidth=width;}
            if(color){self.ctx.strokeStyle=color;}
            self.ctx.stroke();
          };
          self.selectedObject.border=border;
        };
      });
    });
    return this;
  },
  animateToPos: function(x,y,time){
    var self = this;
    var delta_x=(x-self.selectedObject.x)*32/time,
    delta_y=(y-self.selectedObject.y)*32/time;
    console.log(self.selectedObject.x)
    /*self.layers.forEach(function(item,i,arr){
      item.forEach(function(atem,a,irr){
        if(atem.id==self.selectedObject.id){
          atem.x+=delta_x;
          atem.y+=delta_y;
          self.selectedObject.x=atem.x;
          self.selectedObject.y=atem.y;
        };
      });
    });*/
    this.updateObjects.push({
      id:self.selectedObject.id,
      x:delta_x,
      y:delta_y,
      time:time,
    });
    return this;
  },
  updateAll:function(){
    var self = this;
      self.layers.forEach(function(item,i,arr){
        item.forEach(function(atem,a,irr){
          self.updateObjects.forEach(function(f,ff,fff){
          if(atem.id===f.id){
            atem.x+=f.x;atem.y+=f.y;
            f.time-=33;
            console.log(f.time)
            if(f.time<=0){delete fff[ff];}
          };
        });
      });
    });
    return this;
  },
  render:function(){
    var self = this;
    this.updateAll();
    self.layers.forEach(function(item,i,arr){
      item.forEach(function(atem,a,irr){
        if(atem.visible){atem.draw();
          //console.log(atem.fill);
          if(atem.fill){atem.fill();};
          if(atem.border){atem.border()};
        };

      });
    });
  }
};
