let api_Key = "FKQLL6TEB82Y887MUA668Y7PX";
const temp_H1 = document.querySelector(".temp");
const search = document.getElementById("search");
const time = document.querySelector(".time");
const condition = document.querySelector(".weatherCond");
const feels = document.querySelector(".feels");
const location_H1 = document.querySelector(".location");
const utilities = document.querySelector(".utilities");

function checkKeyPressed(event) {
  if (event.keyCode == "13") {
    fetchWeatherData(search.value);
  }
}

// Utility card creation function
function createUtilCard(heading, content) {
  // Create the utility card div
  let utilCard = document.createElement("div");
  utilCard.className = "utilCard";

  // Create the heading (h5) element
  let util_H5 = document.createElement("h5");
  util_H5.textContent = heading;

  // Create the paragraph (p) element for content
  let util_p = document.createElement("p");
  util_p.textContent = content;

  // Append the heading and content to the card
  utilCard.appendChild(util_H5);
  utilCard.appendChild(util_p);

  // Append the card to the parent container (utilities)
  utilities.appendChild(utilCard);
}

async function fetchWeatherData(location) {
  try {
    //retrieve the weather data for the given location
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_Key} `
    );

    //once we retrieve the weather data use json() to read it
    const weatherData = await response.json();

    //now we can isolate the current weather conditions for our chosen city
    const currentWeather = weatherData.currentConditions;

    //for debugging and understanding of response
    console.log(currentWeather);

    //update the DOM with our new weather data from the api
    temp_H1.textContent = currentWeather.temp + "F";
    time.textContent = currentWeather.datetime;
    condition.textContent = currentWeather.conditions;
    feels.textContent = "feels like " + currentWeather.feelslike;
    location_H1.textContent = weatherData.resolvedAddress;

    utilities.innerHTML = "";

    createUtilCard("Wind", currentWeather.windgust);
    createUtilCard("Humidity", currentWeather.humidity);
    createUtilCard("Visibility", currentWeather.visibility);
    createUtilCard("Rain", currentWeather.precip + "%");
  } catch {
    console.log("could not retrieve weather data");
  }
}

fetchWeatherData("london");
window.addEventListener("keydown", checkKeyPressed);
