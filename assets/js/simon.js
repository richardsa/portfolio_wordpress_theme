$(function() {

  // declare global variables
  // strict mode on or off
  var strictCounter = 0;
  var strict = false;
  // hold interval id values
  var intervalIds = [];
  var playerIntervalIds = [];
  // hold computer Moves
  var computerMoves = [];

  // hold player moves
  var playerMoves = [];
  //move variable to keep track of user's score and computer position in array
  var move = 1;
  // counter variable to compare again move variable for each player's move
  var counter = 0;
  // identifies square to play
  var thisId;
  // holds value for square to apply css to animate pressing square
  var remove;
  // holds value for computer setInterval
  var looper;
  //function that picks music sample to play based on move

  // variables for try again function
  var tryAgainCounter = 0;
  var tryAgainLooper;
  var x = 0;

  //initialize power toggle button
  $("[name='power-switch']").bootstrapSwitch();

  // audio variables
  var audio0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  //function for playing correct music sample based on move
  function playMusic(id) {
    switch (id) {
      case 0:
        audio0.play();
        break;
      case 1:
        audio1.play();
        break;
      case 2:
        audio2.play();
        break;
      case 3:
        audio2.play();
        break;
    }
  }

  // function to increment move number
  function printMove() {
    $("#count-screen").text(move);
  }

  //function to reset computer moves and player moves
  function resetScores() {
    //reset playerMoves and computerMoves
    playerMoves = [];
    computerMoves = [];
    counter = 0;
    move = 1;
    // assing new computerMoves
    for (var i = 0; i < 20; i++) {
      var x = Math.floor((Math.random() * 4));
      computerMoves.push(x);
    }
  }

  // fucntion to stop computer looper
  function stopLooper() {
    for (var i = 0; i < intervalIds.length; i++) {
      clearInterval(intervalIds[i]);
    }
    counter = 0;
    playerMoves = [];
    player();
  }
  // function to remove active color from played id
  function resetClass() {
    $(thisId).removeClass(remove);
  }
  // function to display computer moves
  function computerMoveDisplay() {
    if (counter === move) {
      stopLooper();
    } else {
      printMove();
      thisId = "#" + computerMoves[counter];
      remove = "active" + computerMoves[counter];
      $(thisId).addClass(remove);
      playMusic(computerMoves[counter]);
      setTimeout(resetClass, 500);
      counter++;
    }
  }
  // main computer move loop
  function computerDemo() {
    x = 1;
    looper = setInterval(computerMoveDisplay, 1000);
    intervalIds.push(looper);
  }
  // function for restarting game if user makes incorrect move
  function tryAgain() {
    if (tryAgainCounter >= 3) {
      for (var i = 0; i < playerIntervalIds.length; i++) {
        clearInterval(playerIntervalIds[i]);
      }
      //tryAgainLooper = undefined;
      playerMoves = [];
      counter = 0;
      move = 1;
      computerDemo();
      tryAgainCounter = 0;
    }
    $("#count-screen").text("-- ");
    $('#count-screen').fadeOut(200);
    $('#count-screen').fadeIn(200);
    tryAgainCounter += 1;
  }


  function player() {
    $(".gameButton").unbind("click").click(function(event) {
      id = parseInt(event.target.id);
      playerMoves.push(id);
      thisId = "#" + id;
      remove = "active" + id;
      $(thisId).addClass(remove);
      setTimeout(function() {
        $(thisId).removeClass(remove);
      }, 400);
      playMusic(id);
      checkMove();
    });
  }

  // function to check user's move
  function checkMove() {
    for (var i = 0; i < counter + 1; i++) {
      if (playerMoves[i] != computerMoves[i]) {
        if (strict) {
          tryAgainLooper = setInterval(tryAgain, 450);
          playerIntervalIds.push(tryAgainLooper);
          resetScores();
          return;
        } else {
          tryAgainLooper = setInterval(tryAgain, 450);
          playerIntervalIds.push(tryAgainLooper);
          return;
        }
      }
    }
    counter += 1;
    playerLoop();
  }

  // moves game back to computer when ready
  function playerLoop() {
    if (counter === 20) {
      alert('You win! Great job!');
      resetScores();
      computerDemo();
    } else if (counter === move) {
      $(".gameButton").off();
      counter = 0;
      move += 1;
      playerMoves = [];
      setTimeout(computerDemo, 500);
    }
  }
  // toggle strict mode
  function strictMode() {
    $("#strictBtn").on("click", function() {
      strictCounter += 1;
      if (strictCounter % 2 === 1) {
        $('#strictBtn').addClass('strictOn');
        strict = true;
      } else {
        $('#strictBtn').removeClass('strictOn');
        strict = false;
      }
    });
  }
  //power button controls
  $('#power-toggle').on('switchChange.bootstrapSwitch', function(event, state) {
    if ($(this).is(':checked')) {
      $("#count-screen").text("-- ");
      resetScores();
      startGame();
      strictMode();
    } else {
      stopLooper();
      $("#count-screen").text("");
      resetScores();

    }
  });

  //start button click - reinitialize computer moves array
  function startGame() {
    $('#startBtn').on("click", function() {
      computerDemo();
    });
  }

// closing brackets
});
