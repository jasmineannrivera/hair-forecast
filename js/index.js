"use strict";

var hairArr = [
    //dry dew (15-30)
    {
        summary: "Limp Curls",
        hairForecast: "Your curls will be less perky than usual. Be sure to moisturize your hair by using products with emollients. Continue to limit or cut out humectants and products containing glycerin which will dehydrate your curls in this range.",
        humectant: "Avoid humectants.",
        emollient: "Use ample emollients."
    },
    //mid-range (30-40)
    {
        summary: "Tricky Curls",
        hairForecast: "This range can be difficult. Some people can tolerate more humectants, others cannot. You will definitely go through trial and error in this range. You can try to loosen your curls and add definition and hold with a gel or a cream gel, and then finish off the style with a pomade.",
        humectant: "Use humectants sparingly (depending on porosity).",
        emollient: "Use emollients."
    },
    //optimal dew (40-60)
    {
        summary: "Fierce Curls!",
        hairForecast: "This is your prime curly range! You should get nice curl definition without frizz. It is important to find a balance between moisture and humectant that works well for you and your curls.",
        humectant: "Use humectants.",
        emollient: "Use emollients."
    },
    //high dew (60+)
    {
        summary: "Frizzy Curls",
        hairForecast: "You will start to see humectant-induced frizz in this range, especially if you have very porous hair and the dew point has hit 70. You will want to use an anti-humectant to keep that muggy weather out of your hair. You will definitely need to find a moisture-humectant tolerance that works for your curls.",
        humectant: "Avoid humectants.",
        emollient: "Use emollients."
    }
];


function getHairAdvice(input) {
    if (input > 0 && input <= 30) {
        return hairArr[0];
    } else if (input > 31 && input <= 40) {
        return hairArr[1];
    } else if (input > 41 && input <= 60) {
        return hairArr[2];
    } else {
        return hairArr[3];
    }
}

var mapboxToken = "pk.eyJ1IjoiamFzbWluZWFubnJpdmVyYSIsImEiOiJjazZ0dHhheWowMndlM21tdGl3anJqYW81In0.tKJmouaLKN8yxyceD5rIUw";
mapboxgl.accessToken = mapboxToken;
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'country,region,place,postcode,locality,neighborhood',

});

geocoder.on('result', e => {
    let lon = e.result.center[0];
    let lat = e.result.center[1];
    $.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=f3846b0c841256675a19a50e484ca5ff&units=imperial").done(function(data) {
        console.log(data);
        var dayArray = ["Today", "Tomorrow", "Next Day"];
        let openWeatherToken = "f3846b0c841256675a19a50e484ca5ff";
        var weatherHTML = "";
        for(var i = 0; i <= 2; i++) {
            var forecast = data.daily[i];
            var hair = getHairAdvice(forecast.dew_point);
            weatherHTML += '<div class="col-md-3 col-sm-12 card shadow m-4 text-center">';
            weatherHTML += '<h1>' + dayArray[i] + '</h1>';
            weatherHTML += '<h2>' + (forecast.temp.max).toFixed(0) + '&deg;|' +
                (forecast.temp.min).toFixed(0) + '&deg;F</h2>';
            weatherHTML += '<p><strong>' + forecast.weather[0].description + ' </strong>' + '</p>';
            weatherHTML += '<p><strong> UV Index: ' + (forecast.uvi).toFixed(0) + ' </strong>' + '</p>';
            weatherHTML += '<p><strong>Humidity: </strong>' +(forecast.humidity).toFixed(0) + "%" + '</p>';
            weatherHTML += '<p><strong>Dew Point: </strong>' + (forecast.dew_point).toFixed(0) + '&deg;F</p>';
            weatherHTML += '<p><strong>' + hair.summary + '</strong></p>';
            weatherHTML += '<p><strong>' + hair.hairForecast + '</strong></p>';

            weatherHTML += '</div>';
        }

        $("#insertData").html(weatherHTML);

    });

});



geocoder.addTo('#geocoder');





// if I figure out how to target tomorrow and third day's timestamp, this is how to find date
// function getDate(ts) {
//     var date = new Date(ts * 1000);
//     var year = date.getFullYear();
//
//     var month = (1 + date.getMonth()).toString();
//     month = month.length > 1 ? month : '0' + month;
//
//     var day = date.getDate().toString();
//     day = day.length > 1 ? day : '0' + day;
//
//     return month + '/' + day + '/' + year;
// }