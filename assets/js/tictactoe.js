$(function() {
  var player;
  var computer;
  var computerCounter = 0;
  var counter = 0;
  var move = "";
  var computerMoves = [];
  var playerMoves = [];
  var gameOver = false;
  var moveNumber;
  var winner = 0;
  var winningMoves = [];
  var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // new game function to reset board - intially run after game ends for first time
  function newGame() {
    counter = 0;
    player = "";
    computer = "";
    $('#pickerButtons').show();
    $('#gameboard').hide();
    for (var i = 0; i < 9; i++) {
      var boardID = "#" + i;
      $(boardID).css("background-color", "blue");
    }
    $(".square h3").text('');
    $(".square").removeClass("played");
    computerMoves = [];
    playerMoves = [];
    gameOver = false;
    moveNumber = [];
    winningMoves = [];
  }

  // upon intial load - user is prompted to choose side
  // after selecting, game board is displayed
  $(".pickerButton").click(function() {
    if ($(this).is('#pickX')) {
      counter = 0;
      player = "X";
      computer = "O";
    } else if ($(this).is('#pickO')) {
      //counter = 1;
      player = "O";
      computer = "X";
    }
    $('#pickerButtons').hide();
    $('#gameboard').show();
    computerMove(counter);
  });

  // function to check if anyone has won the game
  function checkMoves(moves, moveNumber) {
    moves.push(moveNumber);
    for (var i = 0; i < winningCombinations.length; i++) {
      winner = 0;
      for (var j = 0; j < winningCombinations[i].length; j++) {
        if (moves.indexOf(winningCombinations[i][j]) >= 0) {
          winner += 1;
        }
      }
      if (winner === 3) {
        winningMoves = winningCombinations[i];
        gameOver = true;
      } else if (counter === 4) {

        gameOver = true;
      }
    }

  }

  // function to see who won
  function checkWinner(move) {
    if (gameOver) {

      if (counter === 4 && winningMoves.length < 3) {
        alert("Tie! Good Game!");
      } else {
        for (var i = 0; i < winningMoves.length; i++) {
          var winningID = "#" + winningMoves[i];
          $(winningID).css("background-color", "red");
        }
        if (move === computer) {
          alert("You Lose!");
        } else {
          alert("You Won!");
        }
      }
      newGame();
    }
  }
  // main function to determine computer moves
  function computerMove(counter) {
    //initial move
    if (counter === 0) {
      moveNumber = 0; // start in square 0
    } else if (counter === 1) { // second move
      if (playerMoves[0] === 8 || playerMoves[0] === 3 || playerMoves[0] === 5 || playerMoves[0] === 6 || playerMoves[0] === 7) {
        moveNumber = 2; // moves so far [0, 2]
      } else if (playerMoves[0] === 1) {
        moveNumber = 6; // moves so far [0, 6]
      } else {
        moveNumber = 8;
      }
    } else if (counter === 2) { // third move
      if (playerMoves[0] === 4 && computerMoves[1] === 8) {
        if (playerMoves[1] === 3) {
          moveNumber = 5; //moves so far [0, 8, 5]
        } else if (playerMoves[1] === 1) {
          moveNumber = 7; //moves so far [0, 8, 7]
        } else if (playerMoves[1] === 2) {
          moveNumber = 6; //moves so far [0, 8, 6]
        } else if (playerMoves[1] === 5) {
          moveNumber = 3; //moves so far [0, 8, 3]
        } else if (playerMoves[1] === 6) {
          moveNumber = 2; //moves so far [0, 8, 3]
        } else if (playerMoves[1] === 7) {
          moveNumber = 1; //moves so far [0, 8, 3]
        }

      } else if (computerMoves[1] === 8) {
        // play 6 empty play there if not play 2
        if (playerMoves.indexOf(4) < 0) {
          moveNumber = 4; // wins with moves [0, 8, 4]
        } else if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // moves so far [0, 8, 6]
        }
      } else if (computerMoves[1] === 6 && computerMoves[0] === 0) {
        if (playerMoves.indexOf(3) < 0) {
          moveNumber = 3; // wins with moves [0, 6, 3]
        } else if (playerMoves.indexOf(4) < 0) {
          moveNumber = 4; // moves so far moves [0, 6, 4]
        }

      } else if (computerMoves[1] === 2 && playerMoves[0] === 7 && playerMoves[1] === 1) {
        //if 3 empty move there if not play 2
        moveNumber = 4;
      } else if (computerMoves[1] === 2) {
        //if 3 empty move there if not play 2
        if (playerMoves.indexOf(1) < 0) {
          moveNumber = 1; // this wins if played (played 0 2 1)
        } else if (playerMoves[0] === 5) {
          moveNumber = 6;
        } else if (playerMoves.indexOf(8) < 0) {
          moveNumber = 8;
        } else {
          moveNumber = 6;
        }

      }
    } else if (counter === 3) { // fourth move
      if (playerMoves[0] === 4 && computerMoves[2] === 5) { // center move first player
        if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // this wins if played (played 0 2 6 4)
        }
      } else if (playerMoves[0] === 4 && computerMoves[2] === 5) { // center move first player
        if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(7) < 0) {
          moveNumber = 7; // this wins if played (played 0 2 6 4)
        }
      } else if (playerMoves[0] === 4 && playerMoves[1] === 6) { // center move first player
        if (playerMoves.indexOf(5) < 0) {
          moveNumber = 5; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(1) < 0) {
          moveNumber = 1; // this wins if played (played 0 2 6 4)
        }
      } else if (playerMoves[0] === 4 && playerMoves[1] === 5) { // center move first player
        if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // this wins if played (played 0 2 6 3)
        }
      } else if (playerMoves[0] === 4 && playerMoves[1] === 2) { // center move first player
        if (playerMoves.indexOf(3) < 0) {
          moveNumber = 3; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(7) < 0) {
          moveNumber = 7; // this wins if played (played 0 2 6 4)
        }
      } else if (playerMoves[0] === 4 && playerMoves[1] === 1) { // center move first player
        if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // this wins if played (played 0 2 6 4)
        }
      } else if (playerMoves[0] === 4 && playerMoves[2] === 6) { // center move first player
        if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(7) < 0) {
          moveNumber = 7; // this wins if played (played 0 2 6 4)
        }
      } else if (playerMoves[0] === 4 && playerMoves[1] === 7) { // center move first player
        if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // (played 0 8 2 5)
        } else if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // (played 0 8 2 5)
        }
      } else if (playerMoves[0] === 4 && computerMoves[2] === 6) { // center move first player
        if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // this wins if played (played 0 8 3 6)
        } else if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // moves (played 0 8 3 2)
        }
      } else if (playerMoves[0] === 4 && computerMoves[2] === 1) { // center move first player
        if (playerMoves.indexOf(3) < 0) {
          moveNumber = 3; // this wins if played (played 0 8 3 6)
        } else if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // moves (played 0 8 3 2)
        }
      } else if (playerMoves[0] === 1 && playerMoves[1] === 3) { // center move first player
        if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // this wins if played (played 0 6 4 2)
        } else if (playerMoves.indexOf(8) < 0) {
          moveNumber = 8; // this wins if played (played 0 6 4 8)
        }
      } else if (computerMoves[2] === 6 && computerMoves[1] === 2) {
        if (playerMoves.indexOf(3) < 0) {
          moveNumber = 3; // this wins if played (played 0 2 6 3)
        } else if (playerMoves.indexOf(4) < 0) {
          moveNumber = 4; // this wins if played (played 0 2 6 4)
        }
      } else if (computerMoves[2] === 4) {
        if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // wins with moves [0, 6, 4, 2]
        } else if (playerMoves.indexOf(8) < 0) {
          moveNumber = 8; // moves so far moves [0, 6, 4, 8]
        }

      } else if (computerMoves[1] === 6 && computerMoves[0] === 0) {
        if (playerMoves.indexOf(2) < 0) {
          moveNumber = 2; // wins with moves [0, 6, 4, 2]
        } else if (playerMoves.indexOf(8) < 0) {
          moveNumber = 8; // moves so far moves [0, 6, 4, 8]
        }

      } else if (computerMoves[1] === 8 && computerMoves[0] === 0) {
        if (playerMoves.indexOf(3) < 0) {
          moveNumber = 3; // wins with moves [0, 8, 6, 3]
        } else if (playerMoves.indexOf(7) < 0) {
          moveNumber = 7; // moves so far moves [0, 8, 6, 4]
        }

      } else if (computerMoves[1] === 2 && computerMoves[2] === 8) {
        if (playerMoves.indexOf(4) < 0) {
          moveNumber = 4; // wins with moves [0, 6, 4, 2]
        } else if (playerMoves.indexOf(5) < 0) {
          moveNumber = 5; // moves so far moves [0, 6, 4, 8]
        }

      } else {
        moveNumber = "";
      }
    } else if (counter === 4) { //fifth move
      if (computerMoves[0] === 4 && computerMoves[2] === 4) {
        if (playerMoves.indexOf(6) < 0) {
          moveNumber = 6; // wins with moves [0, 6, 4, 2]
        }

      } else {
        for (var i = 0; i < 9; i++) {
          if (playerMoves.indexOf(i) < 0 && computerMoves.indexOf(i) < 0) {
            moveNumber = i;
          }
        }
      }
    }
    move = computer;
    var moveId = "#" + moveNumber;
    checkMoves(computerMoves, moveNumber);
    $(moveId).find('h3').append(move);
    $(moveId).addClass("played");
    checkWinner(move);
    }

  // main game function
  $(".square").click(function() {
    //check to see if square has been played yet
    if (!$(this).hasClass("played")) {
      move = player;
      moveNumber = parseInt(($(this).attr("id")));
      checkMoves(playerMoves, moveNumber);
      $(this).find('h3').append(move);
      $(this).addClass("played");
      checkWinner(move);
      counter += 1;
    }
    computerMove(counter);
  });
});
