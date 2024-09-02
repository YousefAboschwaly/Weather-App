"use strict";

let countryName = document.getElementById("country");
let currentTemp = document.getElementById("temp");
let stateIcon = document.getElementById("state");
let currentWeather = document.getElementById("weatherState");

let forecast = [];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthNames = [
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

let returnedDate = {
  date: "",
  dayName: "",
  day: "",
  monthName: "",
};

function formatDate(dateString) {
  let date = new Date(dateString);
  let dayName = days[date.getUTCDay()];
  let day = date.getUTCDate();
  let monthName = monthNames[date.getUTCMonth()];
  returnedDate.date = date;
  returnedDate.dayName = dayName;
  returnedDate.day = day;
  returnedDate.monthName = monthName;
}

async function search(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=c1ca4ae1e9ab42afba275550240407&q=${country}&days=7`
  );

  let fullData = await response.json();
  forecast = fullData;
  console.log(forecast);
  display();
}

document.getElementById("search").addEventListener("keyup", function (e) {
  search(e.target.value);
});
document.getElementById("findBtn").addEventListener("click", function () {
  search(document.getElementById('search').value);
});

function display() {
  for (let i = 0; i < 3; i++) {
    formatDate(forecast.forecast.forecastday[i].date);
    console.log(returnedDate);

    if (i == 0) {
      // temp
      countryName.innerHTML = forecast.location["name"];
      currentTemp.innerHTML = forecast.current.temp_c + `<sup>o</sup>C`;
      stateIcon.setAttribute("src", forecast.current.condition.icon);
      currentWeather.innerHTML = forecast.current.condition.text;
      // date
      document.getElementById("dayName").innerHTML = returnedDate.dayName;
      document.getElementById("dayNumber").innerHTML =
        returnedDate.day + returnedDate.monthName;
    }
    if (i == 1) {
      //temp

      document
        .getElementById("nextState")
        .setAttribute(
          "src",
          forecast.forecast.forecastday[i].day.condition.icon
        );
      document.getElementById("maxTemp").innerHTML =
        forecast.forecast.forecastday[i].day.maxtemp_c + `<sup>o</sup>C`;
      document.getElementById("minTemp").innerHTML =
        forecast.forecast.forecastday[i].day.mintemp_c + `<sup>o</sup>`;
      document.getElementById("nextWeatherState").innerHTML =
        forecast.forecast.forecastday[i].day.condition.text;
      // day
      document.getElementById("nextDayName").innerHTML = returnedDate.dayName;
    }
    if (i == 2) {
      // temp

      document
        .querySelector(".nextState")
        .setAttribute(
          "src",
          forecast.forecast.forecastday[i].day.condition.icon
        );
      document.querySelector(".maxTemp").innerHTML =
        forecast.forecast.forecastday[i].day.maxtemp_c + `<sup>o</sup>C`;
      document.querySelector(".minTemp").innerHTML =
        forecast.forecast.forecastday[i].day.mintemp_c + `<sup>o</sup>`;
      document.querySelector(".nextWeatherState").innerHTML =
        forecast.forecast.forecastday[i].day.condition.text;

      // day
      document.querySelector(".nextDayName").innerHTML = returnedDate.dayName;
    }
  }
}

search('cairo')