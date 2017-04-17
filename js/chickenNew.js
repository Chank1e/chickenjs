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
  this.selectedObject,
  this.layers = [],
  this.currentLayer,
  this.bgColor,
  this.drawedLayers=[];
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
    this.bgColor=color;
    function draw(){
    self.ctx.fillRect(0,0,self.canvasElem.width,self.canvasElem.height);
    };
    draw();
    if(this.isResizableVal){window.addEventListener('resize',draw)};
    return this;
  },
    border : function(color,width){
      /*var self = this;
      function draw(){
        self.ctx.lineWidth=width;
      self.ctx.strokeStyle=color;
      self.ctx.lineCap="round";
      self.ctx.stroke();
      };
      draw();
      if(this.isResizableVal){window.addEventListener('resize',draw)};*/
      var self = this;
      this.objects.forEach(function(item,i,arr){
        if(item.id==self.selectedObject){
          item.borderColor=color;
          item.borderWidth=width;
        };
      });
      /*this.lastCreatedObject.borderColor = color;
      this.lastCreatedObject.borderWidth = width;*/
      return this;
    },
    fill : function(color){
      /*var self = this;
      function draw(){
      self.ctx.fillStyle=color;
      self.ctx.fill();
      };
      draw();
      if(this.isResizableVal){window.addEventListener('resize',draw)};*/
      var self = this;
      this.objects.forEach(function(item,i,arr){
        if(item.id==self.selectedObject){
          item.fillColor=color;
        };
      });
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
      this.selectedObject=idOfObject;

      /*this.objects.forEach(function(item,i,arr){
        if(item.id==idOfObject){item.funcToDraw()};
      });*/
      //if(this.isResizableVal){window.addEventListener('resize',draw)};
      return this;
    },
    addToLayer : function(n){
      var self = this;
      if (this.layers[n]==undefined){this.layers[n]=this.selectedObject.toString();}
      else {this.layers[n]+=','+this.selectedObject.toString();}
      this.objects.forEach(function(item,i,arr){
        if(item.id==self.selectedObject){
          item.layer=n;
        };
      });
      return this;
    },
    drawLayer: function(n){
      var self = this;
      function drawThisLayer(){
      self.layers[n].split(',').forEach(function(item,i,arr){
        var id=item;
        self.objects.forEach(function(item,i,arr){
          if(item.id==id){item.draw();
            if(item.fillColor){self.ctx.fillStyle=item.fillColor;self.ctx.fill();};
            if(item.borderWidth){self.ctx.lineWidth=item.borderWidth;};
            if(item.borderColor){self.ctx.strokeStyle=item.borderColor;self.ctx.stroke();};
          };
        });
      });

    };
    this.drawedLayers.push(n);
    drawThisLayer();
    window.addEventListener('resize',function(){drawThisLayer();});
      return this;
    },
    setId: function(id){
      var self = this;
    this.objects.forEach(function(item,i,arr){
      if(self.selectedObject==item.id){
        item.id=id;
        self.selectedObject=id;
      };
    });
    return this;
  },
  selectId:function(id){
    this.selectedObject=id;
    var self = this,isRealObject=0;
    this.objects.forEach(function(item,i,arr){
      if(item.id==self.selectedObject){
        isRealObject=1;
      };
    });
    if(!isRealObject)console.info('Object with id <'+id+'> not found');
    return this;
  },

  delete:function(){
    var self = this,
    layer;

    this.objects.forEach(function(item,i,arr){
      if(item.id==self.selectedObject){
        layer = item.layer;
        delete self.objects[i];
        console.info('Object with id <'+self.selectedObject+'> was succesfully deleted');
      };
    });
    this.redraw();
    return this;
  },
  deleteFromLayer:function(){
    var self=this,
    obj=this.selectedObject,
    layer,newArr;
    this.objects.forEach(function(item,i,arr){
      if(item.id==obj){
      layer=item.layer;
      newArr = self.layers[layer].split(',').forEach(function(item,i,arr){
        console.log(item+' '+obj);
        if(item==obj){
          delete arr[i];
        };
      });
    };
    });
      console.log('asd');
    if(newArr!=undefined){
      this.layers[layer]=newArr.join(',');
    } else {
      delete this.layers[layer];
    };
    this.redraw();
    return this;
  },
  redraw:function(){
    this.bg(this.bgColor);
    var self=this;
    this.drawedLayers.forEach(function(item,i,arr){
      self.drawLayer(item);
    });
    return this;
  }
};
