import React, { useState } from 'react';
import axios from 'axios';
import './WeatherDashboard.css'; // For styles

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = 'befd984de4d3c050671d4eb935e6c660';

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city.');
      return;
    }
    setError('');
    setLoading(true);
    setWeatherData(null);
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found or error fetching data.');
    }
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`weather-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Weather Dashboard</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
      <button className="toggle-button" onClick={toggleDarkMode}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default WeatherDashboard;
