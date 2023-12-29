function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  let apiKey = "dab3f3bc2e8a1affe72ab19342aa4868";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputElement.value}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      cityElement.innerHTML = data.name;
      updateWeatherUI(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function updateWeatherUI(data) {
  let temperatureValueElement = document.querySelector("#current-temperature-value");
  let temperatureUnitElement = document.querySelector("#current-temperature-unit");
  let weatherIconElement = document.querySelector("#weather-icon-i");

  if (!weatherIconElement) {
    console.error("Weather icon element not found");
    return;
  }

  const weatherIconClass = getWeatherIconClass(data.weather[0].icon);
  weatherIconElement.className = `fas ${weatherIconClass}`;

  let windSpeedElement = document.querySelector(".wind-speed");
  let weatherDescriptionElement = document.querySelector(".weather-description");

  if (data.weather && data.weather.length > 0) {
    weatherDescriptionElement.innerHTML = data.weather[0].description;
  } else {
    weatherDescriptionElement.innerHTML = "Weather information not available";
  }

  if (!temperatureValueElement) {
    console.error("Element with id 'current-temperature-value' not found");
    return;
  }

  let humidityValueElement = document.querySelector(".humidity-value");

  if (humidityValueElement) {
    humidityValueElement.innerHTML = `Humidity: <strong>${data.main.humidity}%</strong>`;
  } else {
    console.error("Element with class 'humidity-value' not found");
  }

  temperatureValueElement.innerHTML = `${Math.round(data.main.temp)}`;
  temperatureUnitElement.innerHTML = "°C";

  windSpeedElement.innerHTML = `Wind: <strong>${data.wind.speed.toFixed(1)} m/s</strong>`;
  weatherDescriptionElement.innerHTML = data.weather[0].description;

  updateLocalTime();
}

function displayCurrentDateTime() {
  const currentDate = new Date();
  const options = { weekday: "long", hour: "numeric", minute: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(currentDate);

  let currentDateElement = document.querySelector("#current-date");
  currentDateElement.innerHTML = formattedDate;
}

function updateLocalTime() {
  
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function getWeatherIconClass(iconCode) {
  const iconMap = {
    "01": "wi-day-sunny",
    "02": "wi-day-cloudy",
    "03": "wi-cloud",
    "04": "wi-cloudy",
    "09": "wi-showers",
    "10": "wi-rain",
    "11": "wi-thunderstorm",
    "13": "wi-snow",
    "50": "wi-fog",
  };

  const category = iconCode.slice(0, 2);
  return iconMap[category] || "wi-day-sunny";
}

document.addEventListener("DOMContentLoaded", function () {
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

  setInterval(displayCurrentDateTime, 1000);
  setInterval(updateLocalTime, 1000);
  displayCurrentDateTime();
  updateLocalTime();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
