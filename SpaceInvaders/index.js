import EnemyController from './EnemyController.js';
import Player from './Player.js';
import BulletController from './BulletController.js';
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

const background = new Image();
background.src = 'images/SpaceInvadersBackground.png';

const playerBulletController = new BulletController(canvas, 10, 'blue', true); // 10 bullets at a time
const enemyBulletController = new BulletController(canvas, 4, 'yellow', false); // 3 bullets at a time
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController); 
const player = new Player(canvas, 3, playerBulletController); 

let isGameOver = false;
let didWin = false;

function gameLoop(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver) {
      let text = didWin ? "You Winner!" : "Game Over";
      let textOffset = didWin ? 3.5 : 5;
  
      ctx.fillStyle = "red";
      ctx.font = "70px Arial";
      ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
  }


function checkGameOver() {
    if (isGameOver) {
      return;
    }
  
    if (enemyBulletController.collideWith(player)) {
      isGameOver = true;
    }
  
    if (enemyController.collideWith(player)) {
      isGameOver = true;
    }
  
    if (enemyController.enemyRows.length === 0) {
      didWin = true;
      isGameOver = true;
    }
  }




setInterval(gameLoop, 1000/60); // 60 times per second