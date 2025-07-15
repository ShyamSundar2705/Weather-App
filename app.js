const apiKey = '8b5324972846490a89f145516251507';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = '⚠️ Please enter a city name.';
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    const { location, current } = data;
    const weatherHTML = `
      <h2>Weather in ${location.name}, ${location.country}</h2>
      <p>🌡 Temperature: ${current.temp_c} °C</p>
      <p>💧 Humidity: ${current.humidity}%</p>
      <p>🌤 Condition: ${current.condition.text}</p>
    `;
    resultDiv.innerHTML = weatherHTML;
  } catch (error) {
    resultDiv.innerHTML = `❌ Error: ${error.message}`;
  }
}
