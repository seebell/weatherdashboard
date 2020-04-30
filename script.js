var currentCity = "";
var searchHistory = [];
var savedCities = JSON.parse(sessionStorage.getItem("userSearches"));

$(document).ready(function () {
    function displayCities() {
        $(".pastCities").empty();
        if (savedCities !== null) {
            searchHistory = savedCities;
            for (var i = 0; i < searchHistory.length; i++) {
                $(".pastCities").prepend('<li>' + searchHistory[i] + '</li>');
            }
            currentCity = searchHistory[searchHistory.length - 1];
        }
    };
    displayCities();

    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=0ac9cb995d5f79715638857ea68fa207";
    const queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=0ac9cb995d5f79715638857ea68fa207";

    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    }).then(function (response) {
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        const uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0ac9cb995d5f79715638857ea68fa207=" + lat + "&lon=" + lon;
        $('#currentCityJumbo').text(response.name + ", " + response.sys.country + " (" + SVGAnimateMotionElement().format('dddd MMMM Do') + ")");
        $('#currentWind').text("Wind Speed: " + response.wind.speed + " MPH");
        $('#currentHum').text("Humidity: " + response.main.humidity + "%");
        $('#currentTemp').text("Temperature: " + response.main.temp + " ˚F");
        $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            $('#currentUV').text(response.value);
            if (response.value < 3) {
                $('#currentUV').add("h5").css('background-color', 'green');
            } else if (response.value >= 3 && response.value < 6) {
                $('#currentUV').add("h5").css('background-color', 'orange');
            } else {
                $('#currentUV').add("h5").css('background-color', 'red');
            }
        });
    });

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // day 1 of 5
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt === (moment().add(1, 'day').format('YYYY-MM-DD') + "21:00:00")) {
                $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
                $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
                $("#day1Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");

            }
        }
        // day 2 of 5
        for (var j = 0; j < response.list.length; j++) {
            if (response.list[j].dt_txt === (moment().add(2, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
                $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
                $("#day2Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[j].weather[0].icon + "@2x.png");
            }
        }
        // day 3 of 5
        for (var k = 0; k < response.list.length; k++) {
            if (response.list[k].dt_txt === (moment().add(3, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
                $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
                $("#day3Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[k].weather[0].icon + "@2x.png");
            }
        }
        // day 4 of 5
        for (var l = 0; l < response.list.length; l++) {
            if (response.list[l].dt_txt === (moment().add(4, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
                $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
                $("#day4Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[l].weather[0].icon + "@2x.png");
            }
        }
        // day 5 of 5
        for (var m = 0; m < response.list.length; m++) {
            if (response.list[m].dt_txt === (moment().add(5, 'day').format('YYYY-MM-DD') + " 12:00:00")) {
                $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
                $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
                $("#day5Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[m].weather[0].icon + "@2x.png");
            }
        }

    });

});
