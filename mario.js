var canvas, w, h;
var ctx;
var rects = [];
var cercles = [];
var mousePos = { x: 0, y: 0 };
var cases = [];
var selectedCase;
var caseAllie = [];
var caseEnnemi = [];
var rects = [];
var imgMechant = [];
for (var i = 0; i < 4; i++) {
    imgMechant[i] = [];
}
var nbScore = 0;
var casesVies = [];
var nbVies = 1;
var caseChampion = [];
var son = [];
var energie = 100;
var nbKill = 0;
var carapaces = [];
var PosCarapace = 0;

var effectiveW = 800; // treat game as if it's this width, then scale to actual width
var effectiveH; // height of the screen in game coordinates, used for internal stuff
var scaleFactor; // scale input and output by this. all internal stuff (collisions, etc.) can ignore it


var table = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [7, 7, 7, 7, 7, 7],
    [1, 2, 3, 4, 5, 6],
    [8,9]
];

var color = 0;

var isAnimate=0;

class Case{
    constructor (x, y, posX, posY, color, propriete, energieNecessary, hp, tileI, tileJ, dmg){
        this.x=x;//*50;
        this.y=y;//*50;
        this.posX=posX+canvas.width/6;// *50+50;
        this.posY=posY+canvas.height/11;// *50+50;
        this.color=color;
        this.propriete=propriete;
        this.dx=(this.posX+this.x)/2;
        this.dy=(this.posY+this.y)/2;
        this.energieNecessary=energieNecessary;
        this.hp=hp;
        this.tileI=tileI;
        this.tileJ=tileJ;
        this.dmg=dmg;
    }
    draw(){
        if(this.hp>0){
        ctx.save();
        //ctx.translate(this.x, this.y);
        ctx.beginPath(); // vide le "chemin/buffer" avant de dessiner
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, canvas.width/6, canvas.height/11)
        ctx.strokeRect(this.x, this.y, this.posX, this.posY)
        ctx.closePath();
        ctx.restore();
        }
    }
}

function init() {

 rects = [];
 cercles = [];
 mousePos = {x: 0, y: 0};
 cases = [];
 selectedCase;
 caseAllie = [];
 caseEnnemi = [];
 rects = [];
 imgMechant = [];
for (var i =0; i < 4; i++){
    imgMechant[i] = [];
}
 nbScore=0 ;
 casesVies = [];
 nbVies = 1;
 caseChampion = [];
 son =[];
 energie=100;
 nbKill=0;
 carapaces = [];
 PosCarapace=0;
    
table = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [7, 7, 7, 7, 7, 7],
    [1, 2, 3, 4, 5, 6],
    [8,9]
];
    
  canvas = document.querySelector("#gameBoard");
    if (!canvas) {
        alert("Impossible de récupérer le canvas")
    }

    ctx = canvas.getContext("2d");
    if (!ctx) {
        alert("Impossible de récupérer le context");
    }

    //canvas = document.querySelector("#myCanvas");


    
     canvas.width =window.innerWidth; //Math.min(window.innerWidth-50,840);
     canvas.height = window.innerHeight;
setResolution(canvas.width, canvas.height);

    //canvas.width = canvas.clientWidth;
    //canvas.height = canvas.clientHeight;
    canvas.style.backgroundColor = 'grey';


    getMechant();
    //createEnnemis();
    FPS = 50;
    if (isAnimate == 0) {
        myInterval = setInterval(animate, 1000 / FPS);
        animateScript();
        isAnimate = 1;
    }
    couleur = 'rgb(0,255,255)';
    //context graphique
    //x, y, posX, posY, color, propriete, energieNecessary, hp, tileI, tileJ, dmg

        casesVies.push(new Case(9*(canvas.height/11), 0, 9*(canvas.height/11), 0, "white",0,  0, 100, 8, 0));
        casesVies.push(new Case(9*(canvas.height/11), (canvas.width/6), 9*(canvas.height/11), (canvas.width/6), "white",0,  0, 100, 8, 1));
        casesVies.push(new Case(9*(canvas.height/11),2*(canvas.width/6), 9*(canvas.height/11), 2*(canvas.width/6), "white",0,  0, 100, 8, 2));
        casesVies.push(new Case(9*(canvas.height/11), 3*(canvas.width/6), 9*(canvas.height/11), 3*(canvas.width/6), "white",0,  0, 100, 8, 3));
        casesVies.push(new Case(9*(canvas.height/11), 4*(canvas.width/6), 9*(canvas.height/11), 4*(canvas.width/6), "white",0,  0, 100, 8, 4));
        casesVies.push(new Case(9*(canvas.height/11), 5*(canvas.width/6), 9*(canvas.height/11), 5*(canvas.width/6), "white",0,  0, 100, 8, 5));
        
        caseChampion.push(new Case(9*(canvas.height/11), 0, 9*(canvas.height/11), 0, "white",0,  50, 100, 9, 0, 5));
        caseChampion.push(new Case(9*(canvas.height/11), (canvas.width/6), 9*(canvas.height/11), 1*(canvas.width/6), "white",0,  100, 150, 9, 1, 6));
        caseChampion.push(new Case(9*(canvas.height/11), 2*(canvas.width/6), 9*(canvas.height/11), 2*(canvas.width/6), "white",0,  125, 175, 9, 2, 7));
        caseChampion.push(new Case(9*(canvas.height/11), 3*(canvas.width/6), 9*(canvas.height/11), 3*(canvas.width/6), "white",0,  150, 200, 9, 3, 10));
        caseChampion.push(new Case(9*(canvas.height/11), 4*(canvas.width/6), 9*(canvas.height/11), 4*(canvas.width/6), "white",0,  200, 250, 9, 4, 12));
        caseChampion.push(new Case(9*(canvas.height/11), 5*(canvas.width/6), 9*(canvas.height/11), 5*(canvas.width/6), "white",0,  300, 300, 9, 5, 15));
    
        canvas.addEventListener("touchstart", touch, false);
        canvas.addEventListener("touchend", touch, false);
        canvas.addEventListener("touchcancel", touch, false);
        //canvas.addEventListener("touchleave", handleLeave, false);
        canvas.addEventListener("touchmove", touch, false);
        
    
     window.scrollTo(0, 1);

        // Check size and orientation
        var previousOrientation = window.orientation;
        var checkOrientation = function () {

            //if(window.orientation === undefined) return;
            if (w != window.innerWidth || h != window.innerHeight) {
                setResolution(/*Math.min(window.innerWidth-50,840)*/window.innerWidth, window.innerHeight);
                w = canvas.width; h = canvas.height;
            }
            if (window.orientation !== previousOrientation) {
                previousOrientation = window.orientation;
                
        }
    };
    window.addEventListener("resize", checkOrientation, false);
    window.addEventListener("orientationchange", checkOrientation, false);

    //createEnnemis();
    setInterval(checkOrientation, 2000);

}

function animate() {
    if (nbVies <= 0) {
        console.log("NULLLL");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillRect(canvas.width/6, canvas.height/11, canvas.width/6*4, canvas.height/11*8);
        ctx.fillStyle="lightgrey";
        ctx.font = "30px serif";
        ctx.fillText("Score final : "+nbScore, 2*(canvas.width/6), 4*canvas.height/11);
        ctx.strokeRect(canvas.width/6, canvas.height/11*6, canvas.width/6*4, canvas.height/11*2);
        ctx.fillText("Rejouer", 2*(canvas.width/6), 7*canvas.height/11);
        ctx.fillStyle="white";
        
    }
    else{
        //console.log(nbVies);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.scale(scaleFactor, scaleFactor);

        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                var tile = table[i][j];
                afficherMap(tile);
            }
        }

        function afficherMap(tile) {
            if (tile == 1) {
                ctx.fillStyle = 'blue';

                ctx.fillRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                var img = document.getElementById("mario");
                ctx.drawImage(img, j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                
            }
            else if (tile == 0) {
                
                ctx.strokeRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                
            }
            else if (tile == 2) {
               
                ctx.fillRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                var img = document.getElementById("luigi");
                ctx.drawImage(img, j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
            }
            else if (tile == 3) {
                
                ctx.fillRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                var img = document.getElementById("daisy");
                ctx.drawImage(img, j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
            }
            else if (tile == 4) {
                
                ctx.fillRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                var img = document.getElementById("peach");
                ctx.drawImage(img, j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
            }
            else if (tile == 5) {
                
                ctx.fillRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                var img = document.getElementById("yoshi");
                ctx.drawImage(img, j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
            }
            else if (tile == 6) {
                
                ctx.fillRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                var img = document.getElementById("toad");
                ctx.drawImage(img,j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
            }
            else if (tile == 7) {
                
                ctx.fillRect(j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
                var img = document.getElementById("donkeykong");
                ctx.drawImage(img,j*(canvas.width/6), i*canvas.height/11, canvas.width/6,canvas.height/11);
            }
            else if (tile == 8) {                
                ctx.fillStyle = 'white';
                ctx.fillRect(j*(canvas.width/2), i*canvas.height/11, canvas.width/2,canvas.height/11);
                
                ctx.fillStyle="black";
                ctx.font = "20px serif";
                ctx.fillText("Score : "+nbScore, 3*j*(canvas.width/6), (i+0.5)*canvas.height/11);
            }
            else if (tile == 9) {
             
                ctx.fillStyle = 'white';
                ctx.fillRect(j*(canvas.width/2), i*canvas.height/11, canvas.width/2,canvas.height/11);
                ctx.fillStyle="black";
                ctx.font = "20px serif";
                ctx.fillText("Energie : "+energie, 3*j*(canvas.width/6), (i+0.5)*canvas.height/11);
            }
            
        }
        tireAllie();
        shootAllie();
        drawEnnemis();
        collisionTir();
        collisionEnnemiAllie();
        collisionPerteVie();
        collisionDefaite();
    //getEnergie();
    //createEnnemis();
        if(caseEnnemi.length-2<2){
            createEnnemis();
        }
    }

    canvas.onmousedown = (event) => {
        console.log("souris cliquée");
        getSelectedCase(event);
    }


}

function play(idPlayer, control) {
    var player = document.getElementById(idPlayer);

    if (player.paused) {
        player.play();
        control.textContent = 'Pause';
    } else {
        player.pause();
        control.textContent = 'Play';
    }
}

function getSelectedCase(evt) {
    let rect = evt.target.getBoundingClientRect();

    let mouseX = (evt.clientX - rect.left) /(canvas.width/6) ;
    let mouseY = (evt.clientY - rect.top)/(canvas.height/11) ;


    mousePos = {
        x: Math.trunc(mouseX),
        y: Math.trunc(mouseY)
    }

    console.log("Pos x : " + mousePos.x);
    console.log("Pos y : " + mousePos.y);
    if (nbVies > 0) {
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                if (mousePos.y == i && mousePos.x == j && i != 8) {
                    if (table[i][j] != 0) {
                        color = table[i][j];
                        console.log("I==" + i);
                        console.log("J == " + j);
                        selectedCase = caseChampion[j];

                    } else {
                        putCase(mousePos.x, mousePos.y);
                    }
                }
            }
        }
    } else {
        if ((mousePos.y == 6 || mousePos.y == 7) && mousePos.x >= 1 && mousePos.x <= 4) {
            console.log("rejouer");
            nbVies = 1;
            console.log(nbVies);
            init();
        }
    }
}



function putCase(mouseX, mouseY) {

    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if (mousePos.y == i && mousePos.x == j) {
                if (table[i][j] != 0) {
                    color = table[i][j];
                } else {
                    if (selectedCase != null && selectedCase.color != 7) {
                        if (selectedCase.energieNecessary <= energie) {
                            table[i][j] = color;
                            console.log("i===" + i);
                            console.log("j...." + j);
                            //x, y, posX, posY, color, propriete, energieNecessary, hp, tileI, tileJ, dmg

                            caseAllie.push(new Case(j*(canvas.width/6),i*(canvas.height/11),j*(canvas.width/6),i*(canvas.height/11),color,1, i*(j+1), selectedCase.hp, i, j, selectedCase.dmg));
                            energie-=selectedCase.energieNecessary;
                        }
                        else{

                            var trumpet = document.getElementById("trumpet");
                            trumpet.play();
                            alert("Pour poser ce champion il vous faut : " + selectedCase.energieNecessary + " points d'énergie !")
                        }

                    }

                }
            }
        }
    }
}

function tireAllie() {
    for (var i = 0; i < caseAllie.length; i++) {
        ctx.beginPath();
        ctx.drawImage(carapaces[PosCarapace], caseAllie[i].dx - 10, caseAllie[i].dy, 25, 25);
        ctx.fill();
        ctx.closePath();
    }
}

function shootAllie() {
    for (var i = 0; i < caseAllie.length; i++) {
        caseAllie[i].dy -= 2;
        if (caseAllie[i].dy <= 0) {
            caseAllie[i].dy = (caseAllie[i].y + caseAllie[i].posY) / 2;
        }
    }
}

function drawCase() {
    for (var i = 0; i < caseAllie.length; i++) {
        caseAllie[i].draw();
    }
}
//test push
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createEnnemis() {
    console.log("ENNEMIS");

    var col = canvas.width/6;
    var l = canvas.height/11;
    var posColone= [0, 0.5*col, col, 1.5*col, 2*col, 2.5*col, 3*col, 3.5*col];
    var posLigne=[0, l, 2*l];
    var speed = [0.1, 0.2, 0.3];//[ 0.02, 0.03, 0.04, 0.05, 0.1];

    var color = ["red", "blue", "purple", "yellow", "green", "black", "grey", "orange"];
    var image = getRandomInt(imgMechant.length - 1);
    var hp = [75, 100, 125, 150, 300];

    var c = getRandomInt(color.length - 1);
    var y = getRandomInt(speed.length - 1);
    var j = getRandomInt(posLigne.length - 1);
    var i = getRandomInt(posColone.length - 1);
    var v = getRandomInt(hp.length - 1);
    //Image random     position x et y rand     taille du monstre /!!\           color random  nom      hp        vitesse     
    caseEnnemi.push(new Ennemi(imgMechant[image], posColone[i], posLigne[j], posColone[i], posLigne[j], color[c], "EnnemiBleu", hp[v], ctx, speed[y]));
    drawEnnemis();
}

function drawEnnemis() {
    caseEnnemi.map(ennemi => {
        ennemi.move();
        ennemi.draw();
    });

}




function collisionTir(){
    
   /* for(var j=0; j<caseEnnemi.length; j++){
    for(var i=0; i<caseAllie.length; i++){
        //console.log("d X==="+caseAllie[i].dx);
        //console.log("d Y==="+caseAllie[i].dy);
            var touche= circRectsOverlap(caseEnnemi[j].x*2, caseEnnemi[j].y, caseEnnemi[j].posX, caseEnnemi[j].y+canvas.height/11, caseAllie[i].x, caseAllie[i].posX, caseAllie[i].dx, caseAllie[i].dy, 3); 
            //var score =document.querySelector("#score");
*/

    for (var j = 0; j < caseEnnemi.length; j++) {
        for (var i = 0; i < caseAllie.length; i++) {
            var touche = circRectsOverlap(caseEnnemi[j].x * 2, caseEnnemi[j].y, caseEnnemi[j].posX, caseEnnemi[j].y + canvas.height / 11, caseAllie[i].x, caseAllie[i].posX, caseAllie[i].dx, caseAllie[i].dy, 3);
            var score = document.querySelector("#score");

            if (touche == true) {
                if (caseEnnemi[j].pv > 0) {
                    console.log(caseAllie[i].dmg)
                caseEnnemi[j].pv-=caseAllie[i].dmg;
                if(caseEnnemi[j].pv<=0){
                    caseEnnemi.splice(j, 1);
                    nbKill++;
                }
                if(nbKill==1){
                    energie+=15;
                    nbKill=0;
                }
                //score.setAttribute("value", nbScore);
                nbScore+=2.5;
                }
                caseAllie[i].dy = (caseAllie[i].y + caseAllie[i].posY) / 2;
            }

        }

    }
//}
//}
}
//dy diminue
function circRectsOverlap(x0, y0, w0, h0, x, posX, cx, cy, r) {

    if(cy<h0 && cy>y0){
        if(x0+1>x && w0-1<posX){
            return true;
        } else
            return false;
    }
}

function collisionEnnemiAllie() {
    for (var j = 0; j < caseEnnemi.length; j++) {
        for (var i = 0; i < caseAllie.length; i++) {
            var touche = ennemiOverlap(caseEnnemi[j].x * 2, caseEnnemi[j].y, caseEnnemi[j].posX, caseEnnemi[j].y + 25, caseAllie[i].x, caseAllie[i].y, caseAllie[i].posX, caseAllie[i].posY);

            if (touche) {
                caseAllie[i].hp -= 1;
            }
            if (caseAllie[i].hp <= 0) {
                var s = getRandomInt(son.length - 1);
                son[s].play();
                table[caseAllie[i].tileI][caseAllie[i].tileJ] = 0;
                caseAllie.splice(i, 1);
            }
        }
    }
}
//X =j.x*2 Y        X2          Y2              x       y           x2      y2         
function ennemiOverlap(ennemiX, ennemiY, ennemiWidth, ennemiHeight, allieX, allieY, allieWidth, allieHeight) {
    if (ennemiX == allieX) {
        return (ennemiY * 2 >= allieY - 50 && ennemiY * 2 <= allieHeight);
    }
}

function collisionPerteVie() {
    for (var j = 0; j < caseEnnemi.length; j++) {
        for (var i = 0; i < casesVies.length; i++) {
            var touche = ennemiOverlap(caseEnnemi[j].x * 2, caseEnnemi[j].y, caseEnnemi[j].posX, caseEnnemi[j].y + 25, casesVies[i].y, casesVies[i].x, casesVies[i].posY, casesVies[i].posX);
            var son = document.getElementById("bowserSound")
            if (touche) {
                casesVies[i].hp -= 1;
            }
            if (casesVies[i].hp <= 0) {
                son.play();
                caseEnnemi.splice(j, 1);
                table[casesVies[i].tileI][casesVies[i].tileJ] = 0;
                casesVies.splice(i, 1);
                j++;
                i++;
            }

        }
    }
}

function collisionDefaite() {
    if (casesVies.length <= 4) {
        for (var j = 0; j < caseEnnemi.length; j++) {
            for (var i = 0; i < caseChampion.length; i++) {
                var touche = ennemiOverlap(caseEnnemi[j].x * 2, caseEnnemi[j].y, caseEnnemi[j].posX, caseEnnemi[j].y + 25, caseChampion[i].y, caseChampion[i].x, caseChampion[i].posY, caseChampion[i].posX);
                if (touche) {
                    nbVies = 0;
                    console.log("PERDU");
                    console.log(nbVies);
                }
            }
        }
    }
}


function getMechant() {

    var img = document.getElementById("g2");
    imgMechant[0].push(img);
    var img = document.getElementById("g1");
    imgMechant[0].push(img);
    var img = document.getElementById("g3");
    imgMechant[0].push(img);

    var img = document.getElementById("b1");
    imgMechant[1].push(img);
    var img = document.getElementById("b2");
    imgMechant[1].push(img);
    var img = document.getElementById("b3");
    imgMechant[1].push(img);

    var img = document.getElementById("s2");
    imgMechant[2].push(img);
    var img = document.getElementById("s1");
    imgMechant[2].push(img);
    var img = document.getElementById("s3");
    imgMechant[2].push(img);

    var sound = document.getElementById("10%");
    son.push(sound);
    sound = document.getElementById("150%");
    son.push(sound);
    sound = document.getElementById("echo");
    son.push(sound);
    sound = document.getElementById("echo2");
    son.push(sound);
    sound = document.getElementById("oowecho");
    son.push(sound);
    sound = document.getElementById("owwo");
    son.push(sound);
    sound = document.getElementById("woow");
    son.push(sound);
    sound = document.getElementById("woowecho");
    son.push(sound);
    img = document.getElementById("c1");
    carapaces.push(img);
    img = document.getElementById("c2");
    carapaces.push(img);
    img = document.getElementById("c3");
    carapaces.push(img);
    img = document.getElementById("c4");
    carapaces.push(img);
    img = document.getElementById("c5");
    carapaces.push(img);
    img = document.getElementById("c6");
    carapaces.push(img);
    img = document.getElementById("c7");
    carapaces.push(img);


}





var tID; //we will use this variable to clear the setInterval()
function animateScript(posY, posX) {
    var position = 256; //start position for the image slicer
    var pos2 = 200;
    const interval = 250; //100 ms of interval for the setInterval()
    tID = setInterval(() => {
        document.getElementById("piece").style.backgroundPosition =
            `-${position}px 0px`;
        document.getElementById("sun").style.backgroundPosition =
            `-${pos2}px 0px`;

        document.getElementById("chomp").style.backgroundPosition =
            `-${pos2}px 0px`;

        document.getElementById("carapaceBleu").style.backgroundPosition =
            `-${position}px 0px`;

        //we use the ES6 template literal to insert the variable "position"
        if (position < 1536) { position = position + 256; }
        //we increment the position by 256 each time
        else { position = 256; }
        //reset the position to 256px, once position exceeds 1536px

        if (pos2 < 2000) { pos2 = pos2 + 200; }
        //we increment the position by 256 each time
        else { pos2 = 200; }
        //reset the position to 256px, once position exceeds 1536px
    }, interval); //end of setInterval
} //end of animateScript()




function getEnergie(){
    //var energieValue =document.querySelector("#energie");
    //energieValue.setAttribute("value", energie);
    //console.log(cases[0].energieNecessary);
}

window.setInterval(function updateEnergie() {
    energie += 25;
}, 15000);

window.setInterval(function updateCarapace() {
    if (PosCarapace < carapaces.length - 1) {
        PosCarapace++;
    } else {
        PosCarapace = 0;
    }
}, 100);

window.setInterval(function changePic() {

    caseEnnemi.map(ennemi => {
        ennemi.updateImg();
    });
}, 400);

var ongoingTouches = [];

function touch(evt) {
    let rect = evt.target.getBoundingClientRect()
    console.log(evt.touches);

    let touchX = (evt.touches[0].clientX-rect.left)/(canvas.width/6);
    let touchY = (evt.touches[0].pageY-rect.top)/(canvas.height/11);

    mousePos = {
        x: Math.trunc(touchX),
        y: Math.trunc(touchY)
    }

    console.log("POS X" + mousePos.x);
    console.log("POSY" + mousePos.y);

    if (nbVies > 0) {
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                if (mousePos.y == i && mousePos.x == j && i != 8) {
                    if (table[i][j] != 0) {
                        color = table[i][j];
                        console.log("I==" + i);
                        console.log("J == " + j);
                        selectedCase = caseChampion[j];

                    } else {
                        putCase(mousePos.x, mousePos.y);
                    }
                }
            }
        }
    } else {
        if (mousePos.y == 9 && mousePos.x >= 1 && mousePos.x <= 4) {
            console.log("rejouer");
            nbVies = 1;
            console.log(nbVies);
            init();
        }
    }
}

function setResolution(width, height) {
    canvas.width = w = width;
    canvas.height = h = height;

    scaleFactor = w / effectiveW;
    effectiveH = h / scaleFactor;
}

window.onload = init;