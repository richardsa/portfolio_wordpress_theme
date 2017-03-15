$(function() {
  // declare variables
  var x;
  var power = 1;
  var sec = 59;
  var min = 24;
  var swapperHolder = 0;
  var audio = new Audio('http://freesound.org/data/previews/331/331156_321967-lq.mp3');


  // increase break length
  function increaseBreak() {
    $("#break-high").on("click", function() {
      x = parseInt($('#break-length').text());
      $("#break-length").text(x + 1);
      console.log(swapperHolder);
      if (swapperHolder % 2 === 1) {
        $("#clock").text(x + 1);
        min = x;
        sec = 59;
      }
    });
  }

  // decrease break length
  function decreaseBreak() {
    $("#break-low").on("click", function() {

      x = parseInt($('#break-length').text());
      console.log(x);
      if (x === 1) {
        x = 1;
      } else {
        $("#break-length").text(x - 1);
      }
      if (swapperHolder % 2 === 1 && x > 1) {
        $("#clock").text(x - 1);
        min = x - 2;
        sec = 59;
      }
    });
  }
  // increase session length
  function increaseSession() {
    $("#session-high").on("click", function() {
      x = parseInt($('#session-length').text());
      $("#session-length").text(x + 1);

      if (swapperHolder % 2 === 0) {
        $("#clock").text(x + 1);
        min = x;
        sec = 59;
      }
    });
  }

  // decrease session length
  function decreaseSession() {
    $("#session-low").on("click", function() {
      x = parseInt($('#session-length').text());
      console.log(x);
      sec = 59;
      if (x === 1) {
        x = 1;
      } else {
        $("#session-length").text(x - 1);

      }
      if (swapperHolder % 2 === 0 && x >= 2) {
        $("#clock").text(x - 1);

        min = x - 2;
        console.log(min);
        sec = 59;
      }
    });
  }

  // swap between break and session
  function swapper() {
    audio.play();
    if (swapperHolder % 2 === 0) {
      $("#label").text("Break!");
      min = parseInt($('#break-length').text());
      sec = 0;
      swapperHolder += 1;
    } else {
      $("#label").text("Session");
      min = parseInt($('#session-length').text());
      sec = 0;
      swapperHolder += 1;
    }

  }

  // function for printing clock to console

  function printClock() {
    if (sec < 10) {
      $("#clock").text(min + ":0" + sec);

    } else {
      $("#clock").text(min + ":" + sec);
    }
  }

  //set up control listeners for initial adjustments
  increaseBreak();
  decreaseBreak();
  increaseSession();
  decreaseSession();

  // start and stop timer
  $("#timer").on("click", function() {

    power += 1;
    console.log(power);
    //turn off control listeners until clock is stopped
    $(".timeControl").off();
    if (power % 2 === 0) {

      interval = setInterval(function() {
        printClock();
        if (sec === 0) {

          if (min === 0) {
            swapper();

          } else {
            min -= 1;
            sec = 59;
          }
        } else {
          sec -= 1;
        }

      }, 1000);
    } else {
      clearInterval(interval);
      increaseBreak();
      decreaseBreak();
      increaseSession();
      decreaseSession();

    }
  });
});
