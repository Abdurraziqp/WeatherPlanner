// Select the form and result div
const form = document.getElementById('weather-form');
const resultDiv = document.getElementById('weather-result');

// OpenWeatherMap API details
const apiKey = 'dbdac14c266d5a1c31895516efbf3feb'; // New API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Event listener for form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const city = document.getElementById('city').value.trim(); // Get city from input
    if (!city) {
        resultDiv.innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
        return;
    }

    try {
        // Fetch weather data from API
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Could not find weather for "${city}". Please try another city.`);
        }

        const data = await response.json();
        displayWeather(data); // Display weather data
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});

// Function to display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    resultDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}


