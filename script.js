const weather = {
    apiKey: "5277366efc22ee53ec239b2d6153696b",
    fetchWeather: function (city) {
        fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey})
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name, weather, main, wind } = data;
        const { icon, description } = weather[0];
        const { temp, humidity } = main;
        const { speed } = wind;

        document.querySelector(".city").innerText = Weather in ${name};
        document.querySelector(".icon").src = http://openweathermap.org/img/wn/${icon}.png;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = ${temp}°C;
        document.querySelector(".humidity").innerText = Humidity: ${humidity}%;
        document.querySelector(".wind").innerText = Wind Speed: ${speed} km/hr;

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = url('http://source.unsplash.com/1600x900/?${name}');
    },
    search: function () {
        const city = document.querySelector(".search-bar").value;
        if (city) {
            this.fetchWeather(city);
        }
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

weather.fetchWeather("Bridgend");

function updateTime() {
    const currentDateTime = new Date();

    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const timeString = ${formatTimeComponent(hours)}:${formatTimeComponent(minutes)};
    const currentTimeElement = document.querySelector('.current-time');
    if (currentTimeElement) {
        currentTimeElement.textContent = timeString;
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = currentDateTime.toLocaleDateString(undefined, options);
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        dateElement.textContent = dateString;
    }
}

function formatTimeComponent(timeComponent) {
    return timeComponent.toString().padStart(2, '0');
}

updateTime();
setInterval(updateTime, 1000);