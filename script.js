
async function getWeather() {
    const city = document.getElementById('city').value;
    const days = document.getElementById('days').value;
    const apiKey = '5b17e181b2af4d438ab61638242608'; 
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    const sortBy = document.getElementById('sort').value;
    let forecasts = data.forecast.forecastday;

    // Sorting based on user selection
    if (sortBy === 'temp') {
        forecasts.sort((a, b) => a.day.avgtemp_c - b.day.avgtemp_c);
    } else {
        forecasts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Display current weather
    weatherResult.innerHTML = `
        <div class="weather-item"><strong>City:</strong> ${data.location.name}</div>
        <div class="weather-item"><strong>Current Temperature:</strong> ${data.current.temp_c}°C</div>
        <div class="weather-item"><strong>Condition:</strong> ${data.current.condition.text}</div>
        <div class="weather-item"><img src="${data.current.condition.icon}" alt="Weather icon"></div>
    `;

    // Display forecast
    weatherResult.innerHTML += `<h3>Forecast:</h3>`;
    forecasts.forEach(forecast => {
        weatherResult.innerHTML += `
            <div class="weather-item"><strong>Date:</strong> ${forecast.date}</div>
            <div class="weather-item"><strong>Average Temperature:</strong> ${forecast.day.avgtemp_c}°C</div>
            <div class="weather-item"><strong>Condition:</strong> ${forecast.day.condition.text}</div>
            <div class="weather-item"><img src="${forecast.day.condition.icon}" alt="Weather icon"></div>
            <hr>
        `;
    });
}
