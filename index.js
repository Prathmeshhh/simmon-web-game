
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];

    // selecting a random image
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // adding animations to the image
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    // updating the level
    level++;
    $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
    // checking the ans
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000); 
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            }, 200);   
            
        startOver();
        }
}

// function to reset the game
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

// function to play sound
function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

// function to add animations
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
        }, 100);
}

$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
    }
    nextSequence();
    started = true;
});


