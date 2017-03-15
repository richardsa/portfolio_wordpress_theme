$(function() {
  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "noobs2ninjas", "OgamingSC2", "brianamarie132", "KrisVos130", "iseptimusi", "streamerhouse"];
  var channelInfo = [];
  var html = "";

  function checkStreams(channel) {
    $.ajax({
      url: "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?",
      async: false,
      dataType: 'json',
      type: 'GET',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
      success: function(data) {
        channelInfo.push(data);
        // check for offline stream
        if (channelInfo[0].stream === null) {
          html += "<div class='row offline'>";
          html += "<div class='col-md-4'>";
          html += "<a href='http://www.twitch.tv/" + channel + "'>" + channel + "</a>";
          html += "</div>";
          html += "<div class='col-md-8 status text-center'>";
          html += "offline";
          html += "</div>";
          html += "</div>";
          $("#offlineStreams").append(html);
        }
        // check for closed streams
        else if (channelInfo[0].hasOwnProperty('error')) {
          html += "<div class='row closed'>";
          html += "<div class='col-md-4'>";
          html += channel;
          html += "</div>";
          html += "<div class='col-md-8 status text-center'>";
          html += "account closed";
          html += "</div>";
          html += "</div>";
          $("#closedStreams").append(html);
        }
        // check for live streams
        else {
          html += "<div class='row streaming'>";
          html += "<div class='col-md-4'>";
          html += "<a href='http://www.twitch.tv/" + channel + "'>" + channel + "</a>";
          html += "</div>";
          html += "<div class='col-md-8 status text-center'>";
          html += channelInfo[0].stream.game + ": " + channelInfo[0].stream.channel.status;
          html += "</div>";
          html += "</div>";
          $("#activeStreams").append(html);

        }
        $(".message").append(html);
        channelInfo = [];
        html = "";
      }

    });
  } //submitSearch closing curly brace

  // run checkStreams function and iterate through channels array upon page loading
  $(document).ready(function() {
    for (var i = 0; i < channels.length; i++) {
      checkStreams(channels[i]);
    }
  });

  // show all streams
  $("#allStreamsBtn").click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $("#activeStreams").show();
    $("#offlineStreams").show();
    $("#closedStreams").show();

  });

  // show offline streams only
  $("#offlineStreamsBtn").click(function() {
    // assumes element with id='button'
    $(this).addClass('active').siblings().removeClass('active');
    $("#activeStreams").hide();
    $("#offlineStreams").show();
    $("#closedStreams").show();

  });

  // show online streams only
  $("#onlineStreamsBtn").click(function() {
    // assumes element with id='button'
    $(this).addClass('active').siblings().removeClass('active');
    $("#activeStreams").show();
    $("#offlineStreams").hide();
    $("#closedStreams").hide();
  });
});
