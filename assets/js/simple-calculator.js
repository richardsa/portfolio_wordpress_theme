$(function() {

  //declare global variables
  var x = "";
  var formula = "";
  var solution = "";

  // function that builds formula for calculation
  function formulaBuilder(input) {
    formula = formula + x + input;
    x = "";
    $("#calc-screen").text(x);
  };

  // function for clearing screen
  function clearScreen() {
    $("#calc-screen").text("0");
  };

  // listener function checking for number button clicks
  $(".calc-number").on("click", function() {
    x = x + $(this).text();
    $("#calc-screen").text(x);

  });

  // listener function checking for symbol button clicks
  $(".control").on("click", function() {
    if ($(this).is('#all-clear')) {
      clearScreen();
      x = "";
      formula = "";
    } else if ($(this).is("#clear-entry")) {
      clearScreen();
      x = "";

    } else if ($(this).is("#equal")) {
      formula = formula + x;
      var lastChar = formula.substr(formula.length - 1)
      if (isNaN(lastChar) && lastChar !== ")") {
        formula = formula.substring(0, formula.length - 1);
      }
      $("#calc-screen").text(eval(formula));
      x = "";
      //formula = "";

    } else if ($(this).is("#add")) {
      formulaBuilder("+");

    } else if ($(this).is("#subtract")) {
      formulaBuilder("-");

    } else if ($(this).is("#multiply")) {
      formulaBuilder("*");

    } else if ($(this).is("#divide")) {
      formulaBuilder("/");

    } else if ($(this).is("#open-paren")) {
      formulaBuilder("(");

    } else if ($(this).is("#close-paren")) {
      formulaBuilder(")");

    }
  });

});
