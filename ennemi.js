var i = 0;

class Ennemi {
    constructor(img, x, y, posX, posY, color, propriete, pv, ctx, speed) {
        this.img = img;
        this.x = x; //*50;
        this.y = y; //*50;
        this.posX = 2 * x + canvas.width / 6; //*50+50;
        this.posY = y; //*50+50;
        this.dy = speed;
        this.ctx = ctx;
        this.color = color;
        this.proptiete = propriete;
        this.pv = pv;
        this.etat = 0;
    }
    draw() {
        if (this.pv > 0) {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.beginPath(); // vide le "chemin/buffer" avant de dessiner
            this.ctx.fillStyle = this.color;
            this.ctx.drawImage(this.img[this.etat], this.x, this.y, canvas.width / 6, canvas.height / 11);

            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.x, this.y, this.pv / 2, 10);
            this.ctx.closePath();
            this.ctx.restore();
        } else {
            this.play();
            i = 1;
        }
    }

    move() {
        if (this.y > canvas.height) {
            this.y = 0;
        } else {
            this.y += this.dy;
        }
    }

    play() {
        if (i == 0) {
            var player = document.querySelector("#bowserSound");
            player.play();
        }

    }

    updateImg() {
        this.etat++;

        if (this.etat < 3) {
            this.etat++;
        } else {
            this.etat = 0;
        }
    }
}