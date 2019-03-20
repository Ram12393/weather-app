var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            getWeatherInfo(position.coords.latitude, position.coords.longitude)
            displayLocation(position.coords.latitude, position.coords.longitude)
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function displayLocation(latitude, longitude) {
    var geocoder;
    var x = document.getElementById("location");

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({
            'latLng': latlng
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results);
                    var add = results[0].formatted_address;
                    var value = add.split(",");
                    console.log(value);
                    count = value.length;
                    country = value[count - 1];
                    state = value[count - 2];
                    city = value[count - 3];
                    console.log(city);
                    x.innerHTML =  city;

                } else {
                    x.innerHTML = "address not found";
                }
            } else {
                x.innerHTML = "Geocoder failed due to: " + status;
            }
        }
    );
}

function getWeatherInfo(lat, lang) {
    var x = document.getElementById("temp");
    const http = new XMLHttpRequest()
    http.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lang + "&units=metric&appid=4d798cc71b479bc0e901189ab9a3ffa1")
    http.send()
    http.onload = () => {
        let temp = http.responseText;
        let jsonParse = JSON.parse(temp)
        console.log(jsonParse)
        x.innerHTML = (jsonParse.main.temp).toFixed(0)+"  C"
        document.getElementById("icon").src = "http://openweathermap.org/img/w/" + jsonParse.weather[0].icon + ".png"
        // dfsf
    }
}