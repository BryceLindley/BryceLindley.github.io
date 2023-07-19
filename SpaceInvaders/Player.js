export default class Player{

    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas, velocity, bulletController){
        this.velocity = velocity;
        this.canvas = canvas;
        this.bulletController = bulletController;
        this.x = canvas.width / 2;
        this.y = canvas.height - 70;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = 'images/SlimeDefenderHero.png';

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx){
        if(this.shootPressed == true){
            this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
        }
        this.move();
        this.collideWithWall();
        ctx.drawImage(this.image,
            this.x, this.y, this.width,
            this.height);
        
        }

        collideWithWall(){
            if(this.x < 0) {
                this.x = 0;
            }

            if(this.x > this.canvas.width - this.width){
                this.x = this.canvas.width - this.width;
            }
        }

        move(){
            if(this.rightPressed){
                this.x += this.velocity;
            } else if(this.leftPressed){
                this.x -= this.velocity;
            }
        }

        keydown = (event) => {
            if(event.code == 'ArrowRight'){
                this.rightPressed = true;
            }
            if(event.code === 'ArrowLeft'){
                this.leftPressed = true;
            }
            if(event.code === 'Space'){
                this.shootPressed = true;
            }
        };

        keyup = (event) => {
            if(event.code == 'ArrowRight'){
                this.rightPressed = false;
            }
            if(event.code == 'ArrowLeft'){
                this.leftPressed = false;
            }
            if(event.code === 'Space'){
                this.shootPressed = false;
            }
        };
    
}
    
