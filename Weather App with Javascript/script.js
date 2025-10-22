document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const descriptionDisplay = document.getElementById("description");
  const temperatureDisplay = document.getElementById("temperature");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "ed60fcfbd110ee65c7150605ea8aceea";

  getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return;
    fetchWeatherData(city);
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const respones = await fetch(url);
      if (!respones.ok) {
        throw new Error("City not found");
      }
      const data = await respones.json();
      displayWeatherData(data);
    } catch (error) {
      displayError("Failed to fetch weather data. Please try again later.");
    }
  }

  function displayWeatherData(data) {
    errorMessage.textContent = "";
    cityNameDisplay.textContent = data.name;
    descriptionDisplay.textContent = data.weather[0].description;
    temperatureDisplay.textContent = `${data.main.temp} °C`;
    weatherInfo.style.display = "block";
  }

  function displayError(message) {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
