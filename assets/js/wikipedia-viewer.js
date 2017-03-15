$(function() {

var results = [];

function submitSearch() {
  var search = $('#searchQuery').val();
  search = search.split(' ').join('%20');
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + search + "&srlimit=20&callback=?",
    async: false,
    dataType: 'json',
    type: 'GET',
    headers: {
      'Api-User-Agent': 'Example/1.0'
    },
    success: function(data) {
      results.push(data);
      var html = "";
      if (results[0].query.searchinfo.totalhits === 0) {
        html += "<div class='alert alert-danger' role='alert'>";
        html += "Sorry, no results found for " + search.split('%20').join(' ') + "<br />";
        html += "Please try again!";
        html += "</div>";

      } else {
        for (var i = 0; i < results[0].query.search.length; i++) {
          var title = results[0].query.search[i].title;
          var link = "https://en.wikipedia.org/wiki/" + title.split(" ").join("_");
          html += "<div class='result'>";
          html += "<a href='" + link + "'><h3 class='resultTitle'>" + title + "</h3></a>";
          html += "<div class='resultURL'>" + link + "</div>";
          html += "<div class='resultSnippet'>" + results[0].query.search[i].snippet + "</div>";
          html += "</div>";
        }
      }
      $(".searchResults").html(html);
      results = [];
    }
  });

}
// perform search when search button clicked
$("#submit").on("click", function() {
  submitSearch();

});

// perform search if enter key pressed while in seaerch box
// taken from http://stackoverflow.com/questions/6524288/jquery-event-for-user-pressing-enter-in-a-textbox
$('#searchQuery').bind("enterKey", function(e) {
  submitSearch();
});
$('#searchQuery').keyup(function(e) {
  if (e.keyCode == 13) {
    $(this).trigger("enterKey");
  }
});
});
