const board = ['pink', 'blue', 'green', 'red', 'purple', 'orange'];
const myBoard = [];
const dotSound = document.createElement('pacman_chomp');
dotSound.src = 'pacman_chomp.wav';
const tempBoard = 
[   1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 2, 1, 2, 3, 2, 1, 2, 1,
    1, 2, 2, 1, 2, 1, 2, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 2, 1, 2, 1, 2, 1, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 2, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 1, 1, 1,
    1, 2, 1, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const ghosts = [];
const game = {
    x: '', y: '', h: 40, size: 10, ghosts: 4, inplay: false
}

const player = {
    pos: 32, speed: 4, cool: 0, pause: false, score: 0, lives: 5, gameover: true,
    gamewin: false, powerup: false, powerCount: 0
}

const keys = { ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false };

// Event Listeners
const startGame = document.querySelector('.startButton');
document.addEventListener('DOMContentLoaded', () => {
    game.grid = document.querySelector('.grid'); //gameBoard
    game.pacman = document.querySelector('.pacman'); //pacman the player
    game.eye = document.querySelector('.eye');
    game.mouth = document.querySelector('.mouth');
    game.ghost = document.querySelector('.ghost');
    game.score = document.querySelector('.score');
    game.lives = document.querySelector('.lives');
    game.startGame = document.querySelector('.startButton');
    game.grid.display = 'none';
    game.boxStart = document.querySelectorAll('.boxStart');
    dot.addEventListener('click', () => {
        dotSound.currentTime = 0;
        dotSound.play();
      });
      
    

})

document.addEventListener('keydown', (e) => {
    console.log(e.code); // Key presses
    if (e.code in keys) {
        keys[e.code] = true;
    }
    if (!game.inplay && !player.pause) {
        player.play = requestAnimationFrame(playerMove);
        game.inplay = true;
    }
})

document.addEventListener('keyup', (e) => {
    if (e.code in keys) {
        keys[e.code] = false;
        game.startGame.display = 'none';
    }
})

startGame.addEventListener('click', startSetup);

// Main Gameplay



function createGame() {
    for (let i = 0; i < game.ghosts; i++) {
        createGhost();
    }

    tempBoard.forEach((cell) => {
        console.log(cell);
        createSquare(cell);
    })

    for (let i = 0; i < game.size; i++) {
        game.x += ` ${game.h}px `; //cell grid height
    }


    game.grid.style.gridTemplateColumns = game.x;
    game.grid.style.gridTemplateRows = game.x;
    startPos();
}

// Starting And Restarting Functions

function startSetup() {
    myBoard.length = 0;
    ghosts.length = 0;
    game.x = '';
    console.log('start game');
    game.grid.innerHTML = '';
    if (!player.gamewin) {
        player.score = 0;
        player.lives = 3;
    } else {
        player.gamewin = false;
    }
    player.gameover = false;
    createGame(); //create game board
    updateScore();
    game.grid.display = 'grid';
    startSetup.style.display = 'none';
}

//removes scrollbar from moving with keys
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var keyCode = evt.keyCode;
    if (keyCode >= 37 && keyCode <= 40) {
        return false;
    }
};

function startPos() {
    player.pause = false;
    let firstStartPos = 44;
    player.pos = startPosPlayer(firstStartPos);
    myBoard[player.pos].append(game.pacman);
    ghosts.forEach((ghost, ind) => {
        let temp = (game.size + 1) + ind;
        ghost.pos = startPosPlayer(temp);
        myBoard[ghost.pos].append(ghost);
    })
}



function startPosPlayer(val) {
    if (myBoard[val].t != 1) {
        return val;
    }
    return startPosPlayer(val + 1);
}

// Game Updates
function updateScore() {
    if (player.lives <= 0) {
        game.startGame.style.display = 'block';
        player.gameover = true;
        game.lives.innerHTML = 'Game Over';
    } else {
        game.score.innerHTML = `Score : ${player.score}`;
        game.lives.innerHTML = `Lives : ${player.lives}`;
    }
}

// Game Board Setup
function createGhost() {
    let newGhost = game.ghost.cloneNode(true);
    newGhost.pos = 7 + ghosts.length;
    newGhost.style.display = 'block';
    newGhost.counter = 0;
    newGhost.defaultColor = board[ghosts.length];
    newGhost.direction = Math.floor(Math.random() * 2);
    newGhost.style.backgroundColor = board[ghosts.length];
    newGhost.style.opacity = '0.95';
    newGhost.namer = board[ghosts.length] + 'y';
    ghosts.push(newGhost);
}

function createSquare(val) {
    // Add a new Audio object for the dot eating sound effect



    const div = document.createElement('div');
    div.classList.add('box');
    switch (val) {
        case 1: div.classList.add('wall');
            break;
        case 2: dot = document.createElement('div');
            dot.classList.add('dot');
            div.append(dot);
            dot.addEventListener('click', () => {
                dotSound.currentTime = 0; // Reset the sound to the beginning
                dotSound.play(); // Play the dot eating sound
              });
            break;
        case 3: dot = document.createElement('div');
            div.classList.add('superdot');
            div.append(dot);
            break;
        case 4: console.log("did not create value for square");
            break;
        default:
    }
    game.grid.append(div);
    myBoard.push(div);
    div.t = val;
    div.idVal = myBoard.length;
    div.addEventListener('click', (e) => {
        console.dir(div);
    })
}


function playerMove() {
    if (game.inplay) {
        game.startGame.style.display = 'none';
        
        player.cool--;
        if (player.cool < 0) {
            let tempPower = 0;
            if (player.powerup)
                player.powerCount--;
            if (player.powerCount <= 0) {
                player.powerCount = false;
                console.log('Power Down');
                tempPower = true;
            }
            ghosts.forEach((ghost) => {
                if (tempPower == 1) {
                    ghost.style.backgroundColor = ghost.defaultColor;
                } else if (player.powerCount > 0) {
                    if (player.powerCount % 2) {
                        ghost.style.backgroundColor = 'white';
                    } else {
                        ghost.style.backgroundColor = 'teal';
                    }
                }


                myBoard[ghost.pos].append(ghost);
                ghost.counter--;
                let oldPos = ghost.pos; // original ghost pos
                if (ghost.counter <= 0) {
                    chasePlayer(ghost);
                } else {
                    switch (ghost.direction) {
                        case 0: ghost.pos -= game.size;
                            break;
                        case 1: ghost.pos += game.size;
                            break;
                        case 2: ghost.pos += 1;
                            break;
                        case 3: ghost.pos -= 1;
                            break;
                        default: console.log("ghost position didn't change");
                    }
                }
                if (player.pos == ghost.pos) {
                    if(player.powerCount > 0) {
                        //Ate the ghost
                        player.score += 45;
                        let randomGenerateSpot = Math.floor(Math.random()* 50);
                        ghost.pos = startPosPlayer(79);
                    } else {
                        player.lives--;
                        gameReset();
                        if (player.lives <= 0) {
                            endGame();
                        }
                    }
                    console.log('Ghost got you! ' + ghost.namer);
                    
                    updateScore();
                    
                }
                let valGhost = myBoard[ghost.pos]; //future pos of ghost
                if (valGhost.t == 1) {
                    ghost.pos = oldPos;
                    chasePlayer(ghost);
                }
                myBoard[ghost.pos].append(ghost);



            })


            let tempPos = player.pos;
           

            switch (true) {
                case keys.ArrowRight: player.pos += 1;
                                game.eye.style.left = '20%';
                                game.mouth.style.left = '60%';break;
                case keys.ArrowLeft: player.pos -= 1;
                                game.eye.style.left = '60%';
                                game.mouth.style.left = '0%';break;
                case keys.ArrowUp: player.pos -= game.size;break;
                case keys.ArrowDown: player.pos += game.size;break;
                default: console.log("arrow key did not work.");
            }



            let newPlace = myBoard[player.pos];
         
            switch(newPlace.t) {
                case 1: player.pos = tempPos; 
                break;
                case 2: myBoard[player.pos].innerHTML = null; 
                let tempDots = document.querySelectorAll('.dot');
                console.log(tempDots.length); 
                if (tempDots.legth == 0) {
                    player.gamewin = true;
                    playerWins();
                }
                player.score++;
                updateScore();
                newPlace.t = 0;
                break;
                case 3:  player.pos = tempPos; 
                myBoard[player.pos].innerHTML = " "; 
                
                
                player.powerCount = 100; 
                player.powerup = true;
                
                player.score += 5; updateScore(); newPlace.t = 0;
                break;

            }



            if (player.pos != tempPos) {
                if (player.tog) {
                    game.mouth.style.height = '30%';
                    player.tog = false;
                } else {
                    game.mouth.style.height = '10%';
                    player.tog = true;
                }
            }

            player.cool = player.speed;
            console.log(newPlace.t);
        }


        console.log(player.pos);
        game.pacman.style.display = 'block';
        if (!player.pause) {
            myBoard[player.pos].append(game.pacman);
            player.play = requestAnimationFrame(playerMove);
        }
    }
}

function findDirection(a) {
    let val = [a.pos % game.size, Math.ceil(a.pos / game.size)];
    return val;
}

function chasePlayer(enemy) {
    let enemyPos = findDirection(enemy);
    let playerPos = findDirection(player);
    let ran = Math.floor(Math.random() * 3);
    if (ran == 1) { enemy.dx = (enemyPos[0] < playerPos[0]) ? 2 : 3; }
    else { enemy.dx = (enemyPos[2] < playerPos[1]) ? 1 : 0; }
    enemy.direction = Math.floor(Math.random() * 7);
    enemy.counter = (Math.random() * 1) + (Math.random(1, 5));
}




