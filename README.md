# CHICKEN JS - Best library for canvas. Kudah-tah-tah=3
**To start you should add main object**
```javascript
var chicken = new Chicken(CanvasIdInDOM);
```
**This object contains methods:**

`.fullScreen(t)`

`.bg(color)`

`.border(color,width)`

`.fill(color)` 

`.regularPolygon(x,y,n,r,angle)`



**Example(P.S. you'll love this library)**
```javascript
let a = new Chicken('el');
    a.fullScreen().bg('black')
    .regularPolygon(500,500,5,100,60).border('white',10).fill('red')
    .regularPolygon(600,600,3,50,10).border('red',15).fill('white');
```
