var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var currentScoreDiv = document.getElementById("current");
var highScoreDiv = document.getElementById("high");
document.getElementById("gameover").style.display = "none";
var gameover = document.getElementById("gameover");
var jumping = 0;
var counter = 0;

let highScore = localStorage.getItem("flippyHighScore") || 0;
highScoreDiv.innerText = "High Score: " + highScore;

hole.addEventListener('animationiteration', () => {
    var random = Math.random() * 3;
    var top = (random*100)+150;
    hole.style.top = -(top) + "px";
    counter++;
    currentScoreDiv.innerText = "Your Score: " + counter;

    if (counter > highScore) 
    {
        highScore = counter;
        localStorage.setItem("flippyHighScore", highScore);
        highScoreDiv.innerText = "High Score: " + highScore;
    }
});

setInterval(function(){
    
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-characterTop);
    if((characterTop>480)||((blockLeft<70)&&(blockLeft>20)&&((cTop<holeTop)||(cTop>holeTop+130))))
    {
        gameOver();
    }

}, 10);

function gameOver() {
    document.getElementById("game").style.display = "none";
    

   
    gameover.style.display = "flex";
    gameover.style.position = "fixed";
    gameover.style.top = "50%";
    gameover.style.left = "50%";
    gameover.style.transform = "translate(-50%, -50%)";

    counter = 0;
}


function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop> 6) && (counter< 15))
        {
            character.style.top = (characterTop -5) + "px";
        }
        
        if(jumpCount > 20)
        {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

function restartGame() {
    location.reload();
}