let highScore = localStorage.getItem('highscore') ? parseInt(localStorage.getItem('highscore')) : 0;
let currentScore = 0;

const screenWidth = 400;
const screenHeight = 300;

function updateScores(){
    document.getElementById('high-score').innerText = highScore;
    document.getElementById('current-score').innerText = currentScore;
}

function increaseScore(){
    currentScore++;

    updateScores();

    if(currentScore > highScore){
        highScore = currentScore

        localStorage.setItem('highScore', highScore);
    }
}
updateScores();

let player = {
    x: 100,
    y: 100,
    speed: 5,
    width: 50,
    height: 50
}

let keys = {
    W: false,
    A: false,
    S: false,
    D: false
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W'  ) {
        keys.W = true;
    }
    if (event.key === 'a' || event.key === 'A'  ) {
        keys.A = true;
    }
    if (event.key === 's' || event.key === 'S'  ) {
        keys.S = true;
    }
    if (event.key === 'd' || event.key === 'D'  ) {
        keys.D = true;
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key === 'a' || event.key === 'A'  ) {
        keys.A = true;
    }
    if (event.key === 'd' || event.key === 'D'  ) {
        keys.D = true;
    }
})
document.addEventListener('keysideways', (event) => {
    if (event.key === 'w' || event.key === 'W'  ) {
        keys.W = true;
    }
    if (event.key === 'a' || event.key === 'A'  ) {
        keys.A = true;
    }
    if (event.key === 's' || event.key === 'S'  ) {
        keys.S = true;
    }
    if (event.key === 'd' || event.key === 'D'  ) {
        keys.D = true;
    }
})
function updatePlayerPosition(){
  if (keys.W){
    player.y -= player.speed
  }  
  if (keys.A){
    player.y -= player.speed
  }  
  if (keys.S){
    player.x += player.speed
  }  
  if (keys.D){
    player.x += player.speed
  }  
}
if (player.x > screenWidth){
    player.x = 0 - player.width
}else if (player.x + player.width < 0){
    player.x = screenWidth;
}
if(player.y > screenHeight){
    player.y = 0 - player.height
}else if (player.y + player.height < 0){
    player.y = screenHeight;
}
function gameLoop(){
   updatePlayerPosition();
   requestAnimationFrame(gameLoop); 
}
gameLoop();