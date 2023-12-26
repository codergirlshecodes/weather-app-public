
function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityElement = document.querySelector("#current-city");
  
    // Replace with your OpenWeatherMap API key
    let apiKey = "dab3f3bc2e8a1affe72ab19342aa4868";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputElement.value}&appid=${apiKey}&units=metric`;
  
    // Make an AJAX request to OpenWeatherMap API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        // Update the UI with the new city name and temperature
        cityElement.innerHTML = data.name;
        updateWeatherUI(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        // You can add additional error handling or display a message to the user here
      });
  }
  
  function updateWeatherUI(data) {
    let temperatureValueElement = document.querySelector(
      "#current-temperature-value"
    );
    let temperatureUnitElement = document.querySelector(
      "#current-temperature-unit"
    );
  
    // Update temperature value and unit
    temperatureValueElement.innerHTML = `${Math.round(data.main.temp)}`;
    temperatureUnitElement.innerHTML = "°C";
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  