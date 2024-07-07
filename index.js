let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let weatherForecast = document.querySelector(".weather_forecast");
let weatherIcons = document.querySelector(".weather_icon");
let weatherTemp = document.querySelector(".weather_temperatuer");
let weatherMinTerm = document.querySelector(".weather_min");
let weatherMaxTerm = document.querySelector(".weather_max");
let weather_wind = document.querySelector(".weather_wind");
let weather_pressure = document.querySelector(".weather_pressure");
let weather_feelsLike = document.querySelector(".weather_feelsLike");
let weather_humidity = document.querySelector(".weather_humidity");
let search = document.querySelector(".weather_search");

const getCountryName = (code) => {
  // MDN Link
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames

  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dateTime) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  const curDate = new Date(dateTime * 1000); // Convert seconds to milliseconds

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

let city = "biratnagar";

// Search Working
search.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = document.querySelector(".city_name");
  console.log(cityName.value);
  city = cityName.value;
  getWeatherData();
  cityName.value = "";
});

const getWeatherData = async () => {
  const API_DATA = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=750a171db132eb754abc2cca5a911d9b`;

  try {
    const response = await fetch(API_DATA);
    const data = await response.json();
    // console.log(data);
    const { main, name, sys, weather, wind, dt } = data;

    // Fetching the datas from the APIs
    cityName.innerHTML = `${name},${" "}${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    console.log(main.temp);
    weatherTemp.innerHTML = `${main.temp}&#176`;
    weatherForecast.innerHTML = `${weather[0].main}`;
    weatherIcons.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="${weather[0].description}" />`;
    weatherMaxTerm.innerText = `Max: ${main.temp_max.toFixed()}°`;
    weatherMinTerm.innerText = `Min: ${main.temp_min.toFixed()}°`;
    weather_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}°`;
    weather_humidity.innerHTML = `${main.humidity}%`;
    weather_wind.innerHTML = `${wind.speed} m/s`;
    weather_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
