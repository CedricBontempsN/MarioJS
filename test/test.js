/// CONSTANTE

var table = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 2, 3, 4, 5, 6]
];

var color = 0;
/// CODE 

window.onload = function () {
    var canvas = document.getElementById("gameBoard");
    if (!canvas) {
        alert("Impossible de récupérer le canvas")
    }

    var context = canvas.getContext("2d");
    if (!context) {
        alert("Impossible de récupérer le context");
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvas.style.backgroundColor = 'grey';



    FPS = 50;
    myInterval = setInterval(animate, 1000 / FPS);


    couleur = 'rgb(0,255,255)';

    function animate() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                var tile = table[i][j];
                afficherMap(tile);
            }
        }

        function afficherMap(tile) {
            if (tile == 1) {
                context.fillStyle = 'blue';
                context.fillRect(j * 50, i * 50, 50, 50);
            }
            else if (tile == 0) {
                context.fillStyle = 'white';
                context.fillRect(j * 50, i * 50, 50, 50)
                context.strokeRect(j * 50, i * 50, 50, 50);
            }
            else if (tile == 2) {
                context.fillStyle = 'green';
                context.fillRect(j * 50, i * 50, 50, 50);
            }
            else if (tile == 3) {
                context.fillStyle = 'yellow';
                context.fillRect(j * 50, i * 50, 50, 50);
            }
            else if (tile == 4) {
                context.fillStyle = 'purple';
                context.fillRect(j * 50, i * 50, 50, 50);
            }
            else if (tile == 5) {
                context.fillStyle = 'lightgrey';
                context.fillRect(j * 50, i * 50, 50, 50);
            }
            else if (tile == 6) {
                context.fillStyle = 'black';
                context.fillRect(j * 50, i * 50, 50, 50);
            }
            else if (tile == 7) {
                context.fillStyle = 'red';
                context.fillRect(j * 50, i * 50, 50, 50);
            }
        }
    }


    canvas.onmousedown = (event) => {
        console.log("souris cliquée");
        getSelectedCase(event);
        //let c = new Cercle(mousePos.x, mousePos.y, 10, "red"); 
        //cercles.push(c);
    }

}

function getSelectedCase(evt) {
    let rect = evt.target.getBoundingClientRect()
    let mouseX = (evt.clientX - rect.left) / 50;
    let mouseY = (evt.clientY - rect.top) / 50;

    mousePos = {
        x: Math.trunc(mouseX),
        y: Math.trunc(mouseY)
    }

    console.log(mousePos.x);
    console.log(mousePos.y);
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if (mousePos.y == i && mousePos.x == j) {
                if (table[i][j] != 0) {
                    console.log(table[i][j]);
                    color = table[i][j];
                }
                else{
                    table[i][j] = color;
                }
            }
        }
    }
}