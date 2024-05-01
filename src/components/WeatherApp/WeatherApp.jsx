import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assests/search.png";
import cloud_icon from "../Assests/cloud.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";
import clear_icon from "../Assests/clear.png";
import drizzle_icon from "../Assests/drizzle.png";
import snow_icon from "../Assests/snow.png";
import rain_icon from "../Assests/rain.png";

const apiKey = "06cd4ec1bf21b3e0c985fb8784b54034";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: "71 %",
    wind: "1km/h",
    temperature: "18 °c",
    location: "London",
  });

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const inputValue = document.getElementById("inputId").value.trim();
    if (!inputValue) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&APPID=${apiKey}`;
      const response = await fetch(api);
      const data = await response.json();

      setWeatherData({
        humidity: data.main.humidity + "%",
        wind: Math.floor(data.wind.speed) + " km/h",
        temperature: Math.floor(data.main.temp) + "°c",
        location: data.name,
      });

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n" ||
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n" ||
        data.weather[0].icon === "04d" || // Cloudy conditions
        data.weather[0].icon === "04n" // Cloudy conditions
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n" ||
        data.weather[0].icon === "10d" || // Rainy conditions
        data.weather[0].icon === "10n" // Rainy conditions
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else if (
        data.weather[0].icon === "50d" ||
        data.weather[0].icon === "50n"
      ) {
        setWicon(drizzle_icon);
      }
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          id="inputId"
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="Cloud" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="Wind Speed" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
