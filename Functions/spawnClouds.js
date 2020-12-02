function spawnClouds() {
    if (frameCount % 60 === 0) {
        var cloud = createSprite(600, 120, 40, 10);
        cloud.y = Math.round(random(80, 120));
        cloud.addImage(cloudImage);
        cloud.scale = 0.5;
        cloud.velocityX = -3;
        
        //assign lifetime to the variable
        cloud.lifetime = 200;
        
        //adjust the depth
        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;
        
        //add each cloud to the group
        cloudsGroup.add(cloud);
    }
}