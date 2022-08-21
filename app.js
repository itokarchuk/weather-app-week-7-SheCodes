let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let date = now.getDate();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = now.getHours();
let minute = now.getMinutes();

let dateFull = document.querySelector("#date");
dateFull.innerHTML = `Updated on ${day}, ${date} ${month} ${hour}:${minute}`;

function displayWeatherCondition(response) {
  document.querySelector("#show-city").innerHTML = response.data.name;
  document.querySelector("#temp-main").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  CelsiusTemp = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let FahrenheitTemp = (CelsiusTemp * 9) / 5 + 32;
  let TempElement = document.querySelector("#temp-main");
  TempElement.innerHTML = Math.round(FahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let TempElement = document.querySelector("#temp-main");
  TempElement.innerHTML = Math.round(CelsiusTemp);
}

let CelsiusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let FahrenheitLink = document.querySelector("#fahr");
FahrenheitLink.addEventListener("click", convertToFahrenheit);

let CelsiusLink = document.querySelector("#cels");
CelsiusLink.addEventListener("click", convertToCelsius);

searchCity();
