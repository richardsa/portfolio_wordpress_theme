function getDate(timestamp) {

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var stamp = new Date(timestamp);
  var day = stamp.getDate();
  var monthNum = stamp.getMonth();
  var month = months[monthNum];
  var year = stamp.getFullYear();
  var fullDate = month + " " + day + " , " + year;
  return fullDate;
}

$.getJSON("http://www.freecodecamp.com/news/hot", function(json) {
  var html = "";

  for (var i = 0; i < json.length; i++) {
    html += "<div class='col-md-3 col-sm-6 text-center'>";
    html += "<div class='article'>";
    html += "<a href='" + json[i].link + "'> <img src=" + json[i].author.picture + " ></a><br />";
    var title = json[i].headline;
    if (title.length > 55) {
      title = title.substr(0, 55) + "...";
    }
    html += "<span class='article-title'><a href='" + json[i].link + "'>" + title + "</a></span><br />";
    html += "<a href='http://www.freecodecamp.com/" + json[i].author.username + "'>@" + json[i].author.username + "</a><br />";
    html += json[i].rank + " points<br />";
    html += "posted: " + getDate(json[i].timePosted) + "<br />";
    html += "</div>";
    html += "</div>";

  }
  $("#articles").html(html);
});
