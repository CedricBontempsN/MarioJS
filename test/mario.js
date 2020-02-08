window.onload = init;

var canvas;
var ctx;
var rects = [];
var cercles = [];
var mousePos = {x:0, y:0};
var cases=[];
var selectedCase;
class Case{
    constructor (x, y, posX, posY, color, propriete){
        this.x=x;
        this.y=y;
        this.posX=posX;
        this.posY=posY;
        this.color=color;
        this.proptiete=propriete;
    }
    draw(){
        ctx.save();
        //ctx.translate(this.x, this.y);
        ctx.beginPath(); // vide le "chemin/buffer" avant de dessiner
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.posX, this.posY)
        ctx.strokeRect(this.x, this.y, this.posX, this.posY)
        ctx.closePath();
        ctx.restore();
    }
}




function drawBoard(){
    var posX0=canvas.width/6;
    var posY0=canvas.height/8;
    var x=0;
    var y=0;
    var c=0;
    
        for(var i=0; i<8; i++){
            for(var j=0; j<6; j++){
                cases[c]=new Case(x, y, posX0, posY0, "white", 0);
                //console.log(cases[c]);
                cases[c].draw();
                c=c+1;
                posX0+=canvas.width/6;
                x+=canvas.width/6;
                //console.log(cases[c]);
            }
        x=0;
        y+=canvas.height/8
        posX0=canvas.width/6;
        posY0+=canvas.height/8;
        } 
    
}


function init() {
  
  canvas = document.querySelector("#gameBoard");
  
  //context graphique
  ctx = canvas.getContext("2d");
 
    drawBoard();
  // creer les écouteurs pour le canvas
  canvas.onmousedown = (event) => {
    console.log("souris cliquée");
    getSelectedCase(event);
    //let c = new Cercle(mousePos.x, mousePos.y, 10, "red"); 
    //cercles.push(c);
  }
  
    canvas.onmousemove = (event) => {
      //console.log("souris deplacee");
      processMouseMouve(event);
  }
    
    
     //requestAnimationFrame(anime60fps);
}

function processMouseMouve(evt) {
  let rect = evt.target.getBoundingClientRect()
  let mouseX = evt.clientX - rect.left;
  let mouseY = evt.clientY - rect.top;  
  
  mousePos = {
    x: mouseX,
    y: mouseY
  }
    //buisness model : a quel moment on va dégager du revenus ?
    for(var i=0; i<cases.length; i++){
        if(cases[i].x<(mousePos.x/1.15) && cases[i].posX>(mousePos.x/1.15)){
            if(cases[i].y<(mousePos.y/3.5) && cases[i].posY>(mousePos.y/3.5)){
                if(cases[i].propriete!=0){
                cases[i].color=cases[i].color;
                cases[i].draw();
                
            }
                else{
                cases[i].color="red";
                cases[i].draw();  
                  
                }
                
            }
            else if(cases[i].propriete!=0){
                cases[i].color=cases[i].color;
                cases[i].draw();
            }
            else{
                cases[i].color="white";
                cases[i].draw();
            }
        }
        else if(cases[i].propriete!=0){
                cases[i].color=cases[i].color;
                cases[i].draw();
            }
        else{
                cases[i].color="white";
                cases[i].draw();
            }
    }
    cases[42].color="blue";
    cases[42].draw();
    cases[43].color="green";
    cases[43].draw();
    cases[44].color="yellow";
    cases[44].draw();
    cases[45].color="purple";
    cases[45].draw();
    cases[46].color="lightgrey";
    cases[46].draw();
    cases[47].color="black";
    cases[47].draw();
}

function getSelectedCase(evt){
     let rect = evt.target.getBoundingClientRect()
  let mouseX = evt.clientX - rect.left;
  let mouseY = evt.clientY - rect.top;  
  
  mousePos = {
    x: mouseX,
    y: mouseY
  }

    for(var i=42; i<cases.length; i++){
        if(cases[i].x<(mousePos.x/1.15) && cases[i].posX>(mousePos.x/1.15)){
            if(cases[i].y<(mousePos.y/3.5) && cases[i].posY>(mousePos.y/3.5)){
                //cases[i].color="blue";
                cases[i].draw();
                selectedCase= new Case(cases[i].x, cases[i].y, cases[i].posX, cases[i].posY, cases[i].color, 0);
                console.log(selectedCase);
            }
            else{
                cases[i].color="white";
                cases[i].draw();
            }
        }
        else{
                cases[i].color="white";
                cases[i].draw();
            }
    }
    
    putCase();
}

function putCase(){
    for( var i=24; i<34; i++){
        if(cases[i].x<(mousePos.x/1.15) && cases[i].posX>(mousePos.x/1.15)){
            if(cases[i].y<(mousePos.y/3.5) && cases[i].posY>(mousePos.y/3.5)){
                cases[i].color=selectedCase.color;
                cases[i].draw()
                cases[i].proptiete=1;
                console.log(cases[i]);
            }
        }
    }
}
    
 




function anime60fps() {

    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawBoard();
  /*rects.map(r => {
    r.move();
    r.draw();
  });

  cercles.map(c => {
    c.draw();
  });*/
  
  //dessinerPosSouris();
  //testeCollisionsSourisAutresCercles();
  //testeCollisionsSourisAutresRectangles();

  requestAnimationFrame(anime60fps);
}






/*class Rectangle {
  constructor(x, y, width, height, color, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dy = 1;
    this.dx = 1;
    this.ctx = ctx;
    this.ctx.fillStyle = this.color;  
    this.ctx.lineWith = 10;
  }
 
  draw() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
  
  if(this.x + this.width >= canvas.width) {
      this.dx = -1;
  }
  if(this.x <= 0){
      this.dx = 1;
  }
  
  if(this.y + this.height >= canvas.height) {
    this.dy = -1;
  } 
  
  if(this.y <= 0) {
    this.dy = 1;
  }
  }
}*/
/*
function circleCollide(x1, y1, r1, x2, y2, r2) {
var dx = x1 - x2;
var dy = y1 - y2;
return ((dx * dx + dy * dy) < (r1 + r2)*(r1+r2));
}*/
/*
// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
   var testX=cx;
   var testY=cy;
   if (testX < x0) testX=x0;
   if (testX > (x0+w0)) testX=(x0+w0);
   if (testY < y0) testY=y0;
   if (testY > (y0+h0)) testY=(y0+h0);
   return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}*/
/*
class Cercle {
  constructor(x, y, rayon, couleur, ctx) {
    this.x = x;
    this.y = y;
    
    this.color = couleur;
   
    this.ctx = ctx;
    this.rayon = rayon;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath(); // vide le "chemin/buffer" avant de dessiner
    ctx.arc(0, 0, this.rayon, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill(); // dessine tout ce qui est dans le buffer
    ctx.restore();
  }
 
}*/

/*
function ajouteRectangle() {
  console.log("ajout rect");
  rects.push(new Rectangle(Math.random() * 100,
                            Math.random() * 100,
                            100,
                            100,
                            "red",
                            ctx));
}*/
/*
function ajouteCercle() {
  console.log("ajout cercle");
  //drawCercle(); // marche pas car l'écran est effacé 60 fois/s
  
  cercles.push(new Cercle(Math.random()*400, Math.random()*400, 10, "red"));
}
*/
/*
function dessinerPosSouris() {
    console.log(mousePos.x);
    console.log(mousePos.y);
  let c = new Cercle(mousePos.x, mousePos.y, 10, "red");
  c.draw(ctx);
}
*/


/*
function testeCollisionsSourisAutresCercles() {
  // on parcourt les cercles
  cercles.forEach(c => {
    if(circleCollide(mousePos.x, mousePos.y,  10, c.x, c.y, c.rayon)) {
      console.log("collision");
      c.color = "green";
      //cercles.splice(cercles.indexOf(c), 1);
    } else {
      c.color = "red";
    }
  })
}*/
/*
function testeCollisionsSourisAutresRectangles() {
  // on parcourt les cercles
  rects.forEach(r => {
    if(circRectsOverlap(r.x, r.y, r.width, r.height, mousePos.x, mousePos.y, 10)) {
      console.log("collision");
      r.color = "green";
      //rects.splice(rects.indexOf(r), 1);
    } else {
      r.color = "red";
    }
    
  })
}
*/

