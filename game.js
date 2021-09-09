var buttonColours = ["red", "blue", "green", "yellow"];
var user_pattern = [];
var game_pattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  user_pattern.push(this.id);

  playSound(this.id);
  animatePress(this.id);

  checkAnswer(user_pattern.length - 1);
});


function nextSequence() {
  user_pattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var nos = Math.floor(Math.random() * 4);
  var choose_color = buttonColours[nos];
  game_pattern.push(choose_color);

  $("#" + "choose_color")
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

    playSound(choose_color);
    animatePress(choose_color);

}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(color){
  $("#"+color).addClass("pressed");

  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  }, 100)

};

function checkAnswer(currentLevel){
  
  if(game_pattern[currentLevel] === user_pattern[currentLevel]){

      if (user_pattern.length === game_pattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

  }else{

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }

};

function startOver(){
  level=0;
  game_pattern=[];
  started=false;
};