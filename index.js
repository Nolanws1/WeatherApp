var cities = [];


function displayWeatherInfo(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=34d64e7f0ea3fec2362c6a680ab02a2b"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var temperature = response.main.temp
        var fTemp = (temperature - 273.15) * 9 / 5 + 32
        var cityName = response.name
        localStorage.setItem(cities ,cityName)

        $(".current-city").empty();
        $(".current-city").append(`
            <h2>${cityName}</h2>
            <h3>Temperature: ${Math.round(fTemp)}°F</h2>
            <h3>Humidity: ${response.main.humidity}%</h3>
            <h3>Wind Speed: ${response.wind.speed}mph</h3>
            <h3>UV Index:</h3> `)
    })
}

function renderCityButtons() {
    $("#buttons").empty();
    for (var i = 0; i < cities.length; i++) {
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
    cities.push(city)
    renderCityButtons();
    displayWeatherInfo(city);
})

renderCityButtons();

$("#buttons").on("click", "button", function () {

    displayWeatherInfo($(this).text());
})

localStorage.getItem(cities)