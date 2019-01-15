var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;



$(document).ready(function(){
    
    //if start/reset button is pressed(clicked)
    $("#startreset").click(function(){
        
        //check if playing
        if(playing == true){
            
            // reload the pade
            location.reload();
            
        }else{ //if not playing
            
            //Initiate the game
            playing = true;   //start game
            
            //set score to zero
            score = 0;
            $("#scorevalue").html(score);
            
            //Show trials left
            $("#trialsLeft").show();
            trialsLeft = 3; //initialize the max # of trails at the beginning;
            addHearts(); //Add the heart picture in the trialsLeft
            
            
            //reset the start button text to 'reset Game'
            $("#startreset").html("Reset Game");
            
            //Hide gameOver div
            $("#gameOver").hide();
            
            //start sending fruits
            startAction();
            
        } //end of else part
    }); //end of startreset function generation
    
    
    
    //slice the fruits when mouse is over the fruits
    $("#fruit1").mouseover(function(){
        score++;
        $("#score").html(score); //update score
        
        //play slicesound
    //    document.getElementById("slicesound").play(); //using javaScript to play audio   OR
        $("#slicesound")[0].play();  //Play sound using jQuery method
        
        //stop fruit
        clearInterval(action);
        
        //hide stopped fruit
        $("#fruit1").hide("explode", 500); //jquery ui is required to use this parameters in hide() method with delay 500 secs
        
        //Send new fruit
        setTimeout(startAction, 500); //give few milliseconds after the previous fruits has exploded
        
    }); //end of fruit slicing function
    
    
    
    
    /* FUNCTIONS */
    
    //addHearts() function to add the remaining hearts in the trailsLeft div
    
    function addHearts(){
        $("#trailsLeft").empty(); //Make trialsLeft div empty before adding any hearts otherwise heats will keep increasing instead of decreasing
        
        //Now add the hearts
        for(i= 0; i < trialsLeft; i++){
            $("#trailsLeft").append('<img src="images/heart.png" class="life">');
        }
    } //end of addHearts() function
    
    
    
    // startAction function to drop the fruits one by one randomly in random location
    
    function startAction(){
        
        //Generate a fruit 
        $("#fruit1").show();
        chooseFruits();  //choose a random fruit
        
        //Drop the fruits on random location
        $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50}); //random position
    
        
        //generate a random step
        step = 1 + Math.round(5*Math.random());  //change step -> this is to move the fruit by random steps down
        
    
        //Move fruit down by one step every 10ms
        action = setInterval(function(){
            
            //move fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step); // $("#fruit1).position().top -> will read the current top position of fruit and to that position 'step' is added to make effect of going down.
            
            //check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                
                //check if have trails left
                if(trialsLeft > 1){
                    //generate a fruit
                    $("#fruit1").show();
                    chooseFruits(); //choose random fruit
                    $("#fruit1").css({'left': Math.round(550*Math.random()), 'top' : -50}); //randomize the fruits dropping location
                    
                    
                    //generate a random step
                    step = Math.round(5*Math.random()) + 1; // we don't want 0 as new moving step
                    
                    //reduce the trial by one step
                    trialsLeft--;
                    
                    //populate trialsLeft box
                    addHearts();
                    
                }//end if statement
                else{
                    playing = false; // We are not playing anymore
                    
                    $("#startreset").html("Start Game"); // change button to Start Game
                    
                    //Show game over message
                    $("#gameOver").show();
                    
                    $("#gameOver").html("<p>Game Over!</p><p>Your Score is " + score + "</p>");
                     
                    //hide trailsLeft div
                    $("#trailsLeft").hide();
                    
                    stopAction();
                }
            }
        }, 10);
    
    } // end of startAction function
    
    
    
    //chooseFruits() function
    function chooseFruits(){
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
    }
    
    
    //Function stopAction
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
    
    
});