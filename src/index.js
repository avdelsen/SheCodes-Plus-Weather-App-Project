function formattedDate(date) {
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let number = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let timetime = now.getTime();

  let formattedDate = `${day} ${number} ${month} ${year}, ${hour}:${minute}`;
  return formattedDate;
}
let now = new Date();
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = formattedDate(now);

function displayWeatherConditions(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#currentweathertemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currenthigh").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#currentlow").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".currentweatherdescription").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "4f1853ac0055376da21ff5f859be6d80";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function retrieveValues(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbar-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "4f1853ac0055376da21ff5f859be6d80";
  let units = "metric";
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
}

function giveCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", retrieveValues);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", giveCurrentLocation);

searchCity("New York");

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#currentweathertemp");
//   temp.innerHTML = "70°";
// }

// let celciusUnit = document.querySelector("#celcius");
// celciusUnit.addEventListener("click", changeToFahrenheit);

// function changeToCelcius(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#currentweathertemp");
//   temp.innerHTML = "21°";
// }

// let fahrenheitUnit = document.querySelector("#fahrenheit");
// fahrenheitUnit.addEventListener("click", changeToCelcius);
