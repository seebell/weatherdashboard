// set variables
var currentCity = "";
var searchHistory = [];
var savedCities = JSON.parse(sessionStorage.getItem("userSearches"));
var apiKey = '&appid=0ac9cb995d5f79715638857ea68fa207';

$(document).ready(function () {
    // past searches to html
    function displayCities() {
        $(".pastCities").empty();
        if (savedCities !== null) {
            searchHistory = savedCities;
            for (var i = 0; i < searchHistory.length; i++) {
                $(".pastCities").prepend('<li>' + searchHistory[i] + '</li>');
            }
            currentCity = searchHistory[searchHistory.length - 1];

            //     var cityBtn = <button type="button" class="btn btn-outline-primary btn-block" id="city" data-name="${searchHistory[i]}">${searchHistory[i]}</button>   

            //     $(".pastCities").append('<li>' + cityBtn + '</li>');
            //     $(document).on('click', '#city', function() {
            //         city = $(this).attr('data-name');
            //     displayCities();})    
            // }


            //     $(".pastCities").append('<li>' + cityBtn + '</li>');


        }
    };
    displayCities();

    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=0ac9cb995d5f79715638857ea68fa207";
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=0ac9cb995d5f79715638857ea68fa207";


    //call grabbing current weather & assigning variables to UV requirements for that call
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    }).then(function (response) {
        // more variables required for the UV index & URL
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0ac9cb995d5f79715638857ea68fa207=" + lat + "&lon=" + lon;
        $('#currentCityJumbo').text(response.name + ", " + response.sys.country + " (" + moment().format('dddd MMMM Do') + ")");
        $('#currentWind').text("Wind Speed: " + response.wind.speed + " MPH");
        $('#currentHum').text("Humidity: " + response.main.humidity + "%");
        $('#currentTemp').text("Temperature: " + response.main.temp + " ˚F");
        $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

        //call for UV index & color code the Index
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

    //call for 5 day forecast
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // day 1 of five day
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt === (moment().add(1, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
                $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
                $("#day1Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
            }
        }
        // day 2 of five day
        for (var j = 0; j < response.list.length; j++) {
            if (response.list[j].dt_txt === (moment().add(2, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
                $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
                $("#day2Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[j].weather[0].icon + "@2x.png");
            }
        }
        // day 3 of five day
        for (var k = 0; k < response.list.length; k++) {
            if (response.list[k].dt_txt === (moment().add(3, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
                $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
                $("#day3Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[k].weather[0].icon + "@2x.png");
            }
        }
        // day 4 of five day
        for (var l = 0; l < response.list.length; l++) {
            if (response.list[l].dt_txt === (moment().add(4, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
                $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
                $("#day4Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[l].weather[0].icon + "@2x.png");
            }
        }
        // day 5 of five day
        for (var m = 0; m < response.list.length; m++) {
            if (response.list[m].dt_txt === (moment().add(5, 'day').format('YYYY-MM-DD') + " 12:00:00")) {
                $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
                $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
                $("#day5Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[m].weather[0].icon + "@2x.png");
            }
        }

    });

    //storage function
    function refreshStorage(name) {
        searchHistory.push(name);
        sessionStorage.setItem("userSearches", JSON.stringify(searchHistory));
        savedCities = JSON.parse(sessionStorage.getItem("userSearches"));
        displayCities();
    }
    //listening for the search button click & push input to storage
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        currentCity = $("#userSearch").val();
        $("#userSearch").val('');
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=0ac9cb995d5f79715638857ea68fa207";
        var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=0ac9cb995d5f79715638857ea68fa207";
        // call for user input
        $.ajax({
            url: queryURLCurrent,
            method: "GET"
        }).then(function (response) {

            $('#currentCityJumbo').text(response.name + ", " + response.sys.country + " (" + moment().format('dddd MMMM Do') + ")");
            //assign variables for the UV index
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0ac9cb995d5f79715638857ea68fa207&lat=" + lat + "&lon=" + lon;
            $('#currentWind').text("Wind Speed: " + response.wind.speed + " MPH");
            $('#currentHum').text("Humidity: " + response.main.humidity + "%");
            $('#currentTemp').text("Temperature: " + response.main.temp + " ˚F");
            $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

            refreshStorage(response.name)

            $.ajax({
                url: uvQueryURL,
                method: "GET"
            }).then(function (response) {

                $('#currentUV').text(response.value);
                if (response.value < 4) {
                    $('#currentUV').add("h5").css('background-color', 'green', 'low');
                } else if (response.value >= 4 && response.value < 7) {
                    $('#currentUV').add("h5").css('background-color', 'orange', 'moderate');
                } else {
                    $('#currentUV').add("h5").css('background-color', 'red', 'high');
                }

            });

        });
        //5 day 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // day 1 of five day
            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt === (moment().add(1, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
                    $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
                    $("#day1Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                }
            }
            // day 2 of five day
            for (var j = 0; j < response.list.length; j++) {
                if (response.list[j].dt_txt === (moment().add(2, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
                    $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
                    $("#day2Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[j].weather[0].icon + "@2x.png");
                }
            }
            // day 3 of five day
            for (var k = 0; k < response.list.length; k++) {
                if (response.list[k].dt_txt === (moment().add(3, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
                    $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
                    $("#day3Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[k].weather[0].icon + "@2x.png");
                }
            }
            // day 4 of five day
            for (var l = 0; l < response.list.length; l++) {
                if (response.list[l].dt_txt === (moment().add(4, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
                    $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
                    $("#day4Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[l].weather[0].icon + "@2x.png");
                }
            }
            // day 5 of five day
            for (var m = 0; m < response.list.length; m++) {
                if (response.list[m].dt_txt === (moment().add(5, 'day').format('YYYY-MM-DD') + " 12:00:00")) {
                    $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
                    $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
                    $("#day5Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[m].weather[0].icon + "@2x.png");
                }
            }

        });


    })

});