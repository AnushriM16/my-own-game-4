var trucks;

class Game{
    constructor(){
    }
getState(){
   var gameStateRef = database.ref('gameState');
   gameStateRef.on("value",function(data){
       gameState = data.val();
   })
}

update(state){
    database.ref('/').update({
        gameState:state
    });
}
async start() {
    if(gameState===0){
        player = new Player();
        var playerCountRef = await databse.ref('playerCount').once("value");
        if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount ();
        }
        form = new Form();
        form.display();
    }
}
    truck1 = createSprite(100,200);
    truck2 = createSprite(300,200);

    play(){
       form.hide();

       Player.getPlayerInfo();
       Player.getTrucksAtend();

       if(allPlayers !== undefined){
           background(rgb(198,135,103));
           image(track,0,-displayHeight*4,displayWidth, displayHeight*5);
           var index = 0;
           var x = 185;
           var y;

           for(var plr in allPlayers ){
               index = index+1;
           }
           x = x+200;
           y = displayHeight - allPlayers[plr].distance;
           trucks[index-1].x = x;
           trucks[index-1].y = y;

           if(index ===player.index ){
               stroke(11);
               fill("blue");
               ellipse(x,y,60,60);
               trucks[index-1].shapeColor = "blue";
               camera.position.x = displayWidth/2;
               camera.position.y = trucks[index-1].y;
           }
           if(keyIsDown(UP_ARROW) && player.index !== null){
               player.distance+=10;
               player.update();
           }
           drawSprites();
       }
       
    }
    end(){
        console.log("Game over");
    }
}

