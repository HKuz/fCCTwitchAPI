/**
 * @author Heather Kusmierz
 */

// Variable Declarations
//var channels = ["freecodecamp", "ESL_SC2", "comster404", "OgamingSC2"]; //Short list for testing
  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","ESL_SC2", "brunofin", "comster404", "OgamingSC2"];

function getData(){
  $.each(channels, function(){
    var apiStream = 'https://api.twitch.tv/kraken/streams/' + this +'?callback=?';
    var apiChannels = 'https://api.twitch.tv/kraken/channels/' + this +'?callback=?';
    var name = this;
    var url = "https://www.twitch.tv/" + name;
    var image = "http://healthcarelighthouse.com/wp-content/themes/lighthouse/img/default_user.jpg";
    var activeClass;
    var valid;
    var info;
    // First getJSON call to check online and valid account status
    $.getJSON(apiStream, function(data) {
      if (data.hasOwnProperty("error")) {
        url = "#";
        info = "Account Closed";
        activeClass = "offline";
        valid = false;
      } else if (data.stream === null) {
        info = "Offline";
        activeClass = "offline";
        valid = true;
      } else {
        activeClass = "online";
        valid = true;
      }
      // Second $.getJSON call to retrieve logo, display name, and game (if online)
      $.getJSON(apiChannels, function(data) {
        if(valid) {
          name = data.display_name;
          if (activeClass == "online") {
            info = data.status;
          }
          if (data.logo != null) {
            image = data.logo;
          }
        }
        $("#streams").append("<div class='panel panel-default panel-body " + activeClass +"'><div class='media'><div class='media-left'>" + "<img class='img-responsive img-circle img-size' alt='user logo' src='" + image + "'></div><div class='media-body media-middle'><a target='_blank' href='" + url + "'>" + name + "</a><span class='pull-right'><i>" + info + "</i></span></div></div></div>");
      }); // Close second $.getJSON call
    }); // Close first $.getJSON call
  }); // Close $.each
} // Close function


$("document").ready(function() {
  getData();
  var currentTab = $(".active").attr("id");
  console.log(currentTab);
  $(".filter").on("click", function(){
    $(".filter").removeClass("active");
    $(this).addClass("active");
    currentTab = $(this).attr("id");
    if (currentTab === "all") {
      $(".online, .offline").removeClass("hidden");
    }
    else if (currentTab === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else if (currentTab ==="offline") {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  });
});