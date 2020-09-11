var cities = ["New York", "Chicago", "Los Angeles"];


function displayWeatherInfo() {

    var city = $(this).attr("data-name");
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=34d64e7f0ea3fec2362c6a680ab02a2b"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)
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

    cities.push(city)

    renderCityButtons();
    displayWeatherInfo();
})

renderCityButtons();







