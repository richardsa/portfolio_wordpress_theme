$(document).ready(function() {
    // initialize booststrap temperature toggle switch
    $("[name='temp-toggle']").bootstrapSwitch();
    var lat;
    var long;
    var temperature;
    var celciusTemp;
    var city;
    var state;
    var condition;
    var direction;
    var location;
    var icon;
    var tempCounter = 0;

    // convert degree returned from openweather api call to direction
    function windDirection(deg) {
        if (deg >= 348.75 || deg <= 11.25) {
            direction = "N";
        } else if (deg > 11.25 || deg <= 33.75) {
            direction = "NNE";
        } else if (deg > 33.75 || deg <= 56.25) {
            direction = "NE";
        } else if (deg > 56.25 || deg <= 78.75) {
            direction = "ENE";
        } else if (deg > 78.75 || deg <= 101.25) {
            direction = "E";
        } else if (deg > 101.25 || deg <= 123.75) {
            direction = "ESE";
        } else if (deg > 123.75 || deg <= 146.25) {
            direction = "SE";
        } else if (deg > 146.25 || deg <= 168.75) {
            direction = "SSE";
        } else if (deg > 168.75 || deg <= 191.25) {
            direction = "S";
        } else if (deg > 191.25 || deg <= 213.75) {
            direction = "SSW";
        } else if (deg > 213.75 || deg <= 236.25) {
            direction = "SW";
        } else if (deg > 236.25 || deg <= 258.75) {
            direction = "WSW";
        } else if (deg > 258.75 || deg <= 281.25) {
            direction = "W";
        } else if (deg > 281.25 || deg <= 303.75) {
            direction = "WNW";
        } else if (deg > 303.75 || deg <= 326.25) {
            direction = "NW";
        } else if (deg > 326.25 || deg <= 348.75) {
            direction = "NNW";
        }
        return direction;
    }
    // retrieve lat and long of user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            getCity(lat, long);
            getWeather();
        });
    }

    // function to convert lat and long coordinates to city name
    function getCity(lat, long) {
        var url = "//maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true";
        $.getJSON(url, function(json) {
            city = json.results[0].address_components[2].long_name;
            state = json.results[0].address_components[4].short_name;
            location = city + ", " + state;
            return location;
        });

    }
    // function to print temp to screen
    function printTemp(temp, icon, scale) {
        $("#temperature").html("<img id='weather-icon' src=" + icon + " />" + temp + "<sup>&deg; " + scale + "</sup>");
    }

    // listens and converts temp to celcius when clicked
    $('#celcius').on('switchChange.bootstrapSwitch', function(event, state) {
        if ($(this).is(':checked')) {
            printTemp(temperature.toFixed(1), icon, "F");
        } else {
            printTemp(celciusTemp.toFixed(1), icon, "C");
        }
    });

    // function to set background image
    function setBackground(icon) {
        //clear sky
        switch (icon) {
            //clear sky
            case "clear-day":
            case "clear-night":
                $('body').css("background-image", "url(//res.cloudinary.com/richard-saldivar/image/upload/v1452477084/clear_pjpqy6.png)");
                break;
                //few clouds
            case "cloudy":
            case 'partly-cloudy-day':
            case 'partly-coudy-night':
            case 'windy':
                $('body').css("background-image", "url(//res.cloudinary.com/richard-saldivar/image/upload/v1452478091/cloudy_mpi4te.jpg)");
                //$('body').css("color", "#000000");
                break;
                // shower rain
            case "rain":
            case "09n":
                //rain
            case "10d":
            case "10n":
                $('body').css("background-image", "url(https://res.cloudinary.com/richard-saldivar/image/upload/v1452478269/rain_u1txqv.jpg)");
                //$('body').css("color", "#ffffff");
                break;
                //thunderstorm
            case "11d":
            case "11n":
                $('body').css("background-image", "url(//res.cloudinary.com/richard-saldivar/image/upload/v1452478434/lightning_zf8sp1.jpg)");
                //$('body').css("color", "#ffffff");
                break;
                //snow
            case "sleet":
            case "snow":
                $('body').css("background-image", "url(//res.cloudinary.com/richard-saldivar/image/upload/v1452478493/snow_lqvquh.jpg)");
                //$('body').css("color", "#000000");
                break;
                //mist
            case "50d":
            case "fog":
                $('body').css("background-image", "url(//res.cloudinary.com/richard-saldivar/image/upload/v1452478630/fog_vaqm4b.png)");
                //$('body').css("color", "#000000");
                break;
        }
    }

    //$("#getWeather").on("click", function() {
    function getWeather() {
        var url = "https://api.darksky.net/forecast/da80259681ef97837b32e52cbebe12f2/" + lat + "," + long;

        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(results) {
                console.log(url);
                console.log(results);
                temperature = results.currently.temperature;
                celciusTemp = (temperature - 32) * 5 / 9;
                condition = results.currently.summary;
                $("#condition").text(condition);
                icon = "/wp-content/uploads/2017/02/" + results.currently.icon + ".png";
                printTemp(temperature.toFixed(1), icon, "F");
                if (typeof results.currently.windBearing !== "undefined") {
                  windDir = windDirection(results.currently.windBearing);
                  wind = windDir + " " + results.currently.windSpeed + " mph";
                } else {
                  wind = json.wind.speed + " mph";
                }
                setBackground(results.currently.icon);
                $("#wind").text(wind);
                $("#location").text(location);
            }
        });

        //make call to openweather map
        //  $.getJSON("//api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid=1b88888895a6d6f52a820b56b2332ca5", function(json) {
        /*.getJSON("https://api.darksky.net/forecast/da80259681ef97837b32e52cbebe12f2/"+lat+","+ long+ "/", function(json) {
              temperature = json.main.temp;
              celciusTemp = (temperature - 32) * 5 / 9;
              icon = "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
              printTemp(temperature.toFixed(1), icon, "F");
              condition = json.weather[0].description;
              setBackground(json.weather[0].icon);
              $("#condition").text(condition);
              if (typeof json.wind.deg !== "undefined") {
                windDir = windDirection(json.wind.deg);
                wind = windDir + " " + json.wind.speed + " mph";
              } else {
                wind = json.wind.speed + " mph";
              }
              $("#wind").text(wind);
              $("#location").text(location);
              $(".json-element").html(JSON.stringify(json));
            });*/
    }
});
