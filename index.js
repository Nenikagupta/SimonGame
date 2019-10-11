var buttoncolors=["red", "blue","green","yellow"];
var gamePattern=[];
var userclickedpattern=[];
var level=0;
var started=false;

$(document).keypress(function(event){
  if(!started){
    nextSequence();
    started=true;
}
});

$(".btn").click(function(){
  var userchosenColour=$(this).attr("id");
  userclickedpattern.push(userchosenColour);
  animatePress(userchosenColour);
  playSound(userchosenColour);
  checkAnswer(userclickedpattern.length-1);
});

function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var random_number=Math.floor(Math.random()*4);
  var randomChosenColor=buttoncolors[random_number];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] == userclickedpattern[currentLevel]) {
     if (userclickedpattern.length == gamePattern.length){
       userclickedpattern=[];
       setTimeout(function () {
         nextSequence();
       }, 1000);
     }
   } else {
     playSound("wrong");
     $("body").addClass("game-over");
     $("h1").text("Game Over, Press Any Key to Restart");

     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     startOver();
   }
}

function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentcolor).removeClass("pressed");
  },100);
}
function playSound(Color){
  var audio=new Audio(Color +".mp3");
  audio.play();
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
