var cities = JSON.parse( window.localStorage.getItem('cities')) || [];
var lastCity = cities[cities.length - 1];
console.log(lastCity)



function displayWeatherInfo(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=34d64e7f0ea3fec2362c6a680ab02a2b";
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=34d64e7f0ea3fec2362c6a680ab02a2b";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=34d64e7f0ea3fec2362c6a680ab02a2b&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        var temperature = response.main.temp
        var fTemp = (temperature - 273.15) * 9 / 5 + 32
        var cityName = response.name
        
        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function (responseUV) {
            var UV = responseUV[0].value
            $(".current-city").empty();
            $(".current-city").append(`
                <h2>${cityName} <img src=http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png> </h2>
                <h3>Temperature: ${Math.round(fTemp)}°F</h2>
                <h3>Humidity: ${response.main.humidity}%</h3>
                <h3>Wind Speed: ${response.wind.speed}mph</h3>
                <h4>UV Index: <mark>${UV}</mark></h4>
                `)
            if(UV < 5.9) {
                $("mark").addClass("moderate")
            }
            if(UV > 5.9 && UV < 7.9){
                $("mark").addClass("high")
            }
            if(UV > 7.9){
                $("mark").addClass("very-high")
            }
            
        })
                
    })
    // .catch(function(error) {
    //         console.log('ERROR--->', error);
    //         $(".current-city").empty();
    //         $(".current-city").append(`
    //         <h2>${error.responseJSON.message}
    //         `)
    //       })

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function (responseForecast) {
        var temperature1 = responseForecast.list[6].main.temp
        var temperature2 = responseForecast.list[14].main.temp
        var temperature3 = responseForecast.list[22].main.temp
        var temperature4 = responseForecast.list[30].main.temp
        var temperature5 = responseForecast.list[38].main.temp
        var fTemp1 = (temperature1 - 273.15) * 9 / 5 + 32
        var fTemp2 = (temperature2 - 273.15) * 9 / 5 + 32
        var fTemp3 = (temperature3 - 273.15) * 9 / 5 + 32
        var fTemp4 = (temperature4 - 273.15) * 9 / 5 + 32
        var fTemp5 = (temperature5 - 273.15) * 9 / 5 + 32
        var date1 = responseForecast.list[6].dt_txt;
        var date2 = responseForecast.list[14].dt_txt;
        var date3 = responseForecast.list[22].dt_txt;
        var date4 = responseForecast.list[30].dt_txt;
        var date5 = responseForecast.list[38].dt_txt;
        var displayDate1 = date1.slice(5, 10);
        var displayDate2 = date2.slice(5, 10);
        var displayDate3 = date3.slice(5, 10);
        var displayDate4 = date4.slice(5, 10);
        var displayDate5 = date5.slice(5, 10);

        $(".five-day1").empty();
        $(".five-day1").append(`
            <img src=http://openweathermap.org/img/wn/${responseForecast.list[6].weather[0].icon}@2x.png>
            <h2>${displayDate1}</h2>
            <h3>Temp: ${Math.round(fTemp1)}°F</h3>
            <h3> Humidity: ${responseForecast.list[6].main.humidity}%</h3>
        `)
        $(".five-day2").empty();
        $(".five-day2").append(`
            <img src=http://openweathermap.org/img/wn/${responseForecast.list[14].weather[0].icon}@2x.png>
            <h2>${displayDate2}<h2>
            <h3>Temp: ${Math.round(fTemp2)}°F</h3>
            <h3> Humidity: ${responseForecast.list[14].main.humidity}%</h3>
        `)
        $(".five-day3").empty();
        $(".five-day3").append(`
            <img src=http://openweathermap.org/img/wn/${responseForecast.list[22].weather[0].icon}@2x.png>
            <h2>${displayDate3}</h2>
            <h3>Temp: ${Math.round(fTemp3)}°F</h3>
            <h3> Humidity: ${responseForecast.list[22].main.humidity}%</h3>
        `)
        $(".five-day4").empty();
        $(".five-day4").append(`
            <img src=http://openweathermap.org/img/wn/${responseForecast.list[30].weather[0].icon}@2x.png>
            <h2>${displayDate4}</h2>
            <h3>Temp: ${Math.round(fTemp4)}°F</h3>
            <h3> Humidity: ${responseForecast.list[30].main.humidity}%</h3>
        `)
        $(".five-day5").empty();
        $(".five-day5").append(`
        <img src=http://openweathermap.org/img/wn/${responseForecast.list[38].weather[0].icon}@2x.png>
            <h2>${displayDate5}</h2>
            <h3>Temp: ${Math.round(fTemp5)}°F</h3>
            <h3> Humidity: ${responseForecast.list[38].main.humidity}%</h3>
        `)

    })

}

function renderCityButtons() {
    var cityButtons = JSON.parse( window.localStorage.getItem("cities") );
    console.log(cityButtons)
    $("#buttons").empty();
    for (var i = 0; i < 6 && i < cities.length; i++) {
        var a = $("<button>");
        a.addClass("cityClass");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#buttons").append(a);
    }

}


$("#submit-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#input").val().trim();
    $("#input").val("");
    var savedCities = JSON.parse( window.localStorage.getItem('cities')) || []
        savedCities.push(city)
        window.localStorage.setItem("cities", JSON.stringify(savedCities))
    cities.push(city)
    renderCityButtons();
    displayWeatherInfo(city);
})

renderCityButtons();

$("#buttons").on("click", "button", function () {

    displayWeatherInfo($(this).text());
})

