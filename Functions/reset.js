function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    trex.changeAnimation("running",trex_running);
    
    if(localStorage["HighestScore"] < score){
        localStorage["HighestScore"] = score;
    }
    console.log(localStorage["HighestScore"]);
    
    score = 0;
    
}