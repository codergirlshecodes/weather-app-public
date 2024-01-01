document.addEventListener("DOMContentLoaded", function () {
    let weather = {
        apiKey: "dab3f3bc2e8a1affe72ab19342aa4868",
        fetchWeather: function (city) {
            fetch(
                "https://api.openweathermap.org/data/2.5/forecast?q=" +
                city +
                "&units=metric&cnt=5&appid=" +
                this.apiKey
            )
                .then((response) => response.json())
                .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {
            const cityName = data.city.name;
            const currentWeather = data.list[0];

            
            let timeElement = document.querySelector(".local-time");
            
            
            if (!timeElement) {
                timeElement = document.createElement("div");
                timeElement.classList.add("local-time");
                document.querySelector(".weather").appendChild(timeElement);
            }

            const currentTime = new Date();
            const localTime = currentTime.toLocaleTimeString();
            timeElement.textContent = "Local Time: " + localTime;

            document.querySelector(".city").innerText = cityName;
            document.querySelector(".temp").innerText = currentWeather.main.temp + "°C";
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + ".png";
            document.querySelector(".description").innerText = currentWeather.weather[0].description;
            document.querySelector(".humidity").innerText = "Humidity: " + currentWeather.main.humidity + "%";
            document.querySelector(".wind").innerText = "Wind: " + currentWeather.wind.speed + " km/h";

            const forecastContainer = document.querySelector(".forecast-container");
            forecastContainer.innerHTML = ""; 
            document.querySelector(".weather").classList.remove("loading");
        },
        search: function () {
            document.querySelector(".weather").classList.add("loading");
            this.fetchWeather(document.querySelector(".search-bar").value);
        },
    };

    document.querySelector(".search button").addEventListener("click", function () {
        weather.search();
    });

    document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            weather.search();
        }
    });

    weather.fetchWeather("London");
});
