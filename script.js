const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const weatherIcon = document.querySelector("#weatherIcon");
const weather = document.querySelector("#weather");
const desc = document.querySelector(".desc");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const windSpeed = document.querySelector(".windSpeed");
const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

const setWeatherDetails = (data) => {
  console.log(data);
  desc.textContent = data.weather[0].description;
  weather.textContent = Math.round(data.main.temp - 273.15) + "°C";
  humidity.textContent = data.main.humidity + "%";
  pressure.textContent = data.main.pressure + "hPa";
  windSpeed.textContent = data.wind.speed + "km/h";
  switch (data.weather[0].main) {
    case "Clouds":
      weatherIcon.src = "cloud.svg";
      break;
    case "Clear":
      weatherIcon.src = "sun.svg";
      break;
    case "Rain":
      weatherIcon.src = "rain.svg";
      break;
    case "Mist":
      weatherIcon.src = "mist.svg";
      break;
    case "Snow":
      weatherIcon.src = "snow.svg";
      break;
    case "Haze":
      weatherIcon.src = "haze.svg";
      break;
  }
};

const callAPI = (id) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setWeatherDetails(data);
    })
    .catch((error) => {
      console.log(error);
      alert("Error occurred. Please try again.");
    });
};

searchButton.addEventListener("click", () => {
  if (searchInput.value.trim() === "") {
    alert("Please enter a city name.");
  } else {
    callAPI(API_KEY);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});

searchButton.click();
