const api = 'f14dec1b68dbdbf21c83f12d349fd6ed';
let cityInp = document.getElementById(`cityInp`);
let cityInput = document.querySelector(`#getWeatherBtn`);
let card = document.querySelector(`.card`);

let cityName = document.getElementById(`cityName`);
let timpNum = document.getElementById(`timpNum`);
let hum = document.getElementById(`hum`);
let desc = document.getElementById(`desc`);
let weatherImg = document.getElementById(`weatherImg`);

cityInput.addEventListener("click", async event => {

     event.preventDefault();

     const city = cityInp.value;

     card.style.display = `flex`;

     if (city) {
          try {
               const weatherData = await getWeatherCity(city);
               getWeatherInfo(weatherData);
               document.getElementById(`erorr`).style.display = `none`;
          } catch (erorr) {
               console.error(erorr)

          }

     } else {
          card.style.display = `none`;
          getWeatherErorrs(`enter a city please.`);
     }
})

async function getWeatherCity(city) {

     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

     const res = await fetch(apiUrl);

     if (!res.ok) {
          card.style.display = `none`;
          getWeatherErorrs(`city not found ):`);
          throw new Error(`could not fetch weather data`);
     }
     else {
          return await res.json();
     }

}

function getWeatherInfo(data) {
     const { name: city,
          main: { temp, humidity },
          weather: [{ description, id }] } = data;

     getWeatherImg(id);
     cityName.innerText = city;
     timpNum.innerText = `${(temp - 273.15).toFixed(1)}℃`;
     hum.innerText = `${humidity}%`;
     desc.innerText = `${description}`;

}

function getWeatherImg(weatherId) {

     if (weatherId >= 200 && weatherId < 300) {
          weatherImg.src = `weatherImgs/tornado.png`;
     }

     else if (weatherId >= 300 && weatherId < 500) {
          weatherImg.src = `weatherImgs/drop.png`;
     }

     else if (weatherId >= 500 && weatherId < 600) {
          weatherImg.src = `weatherImgs/rain.png`
     }

     else if (weatherId >= 600 && weatherId < 701) {
          weatherImg.src = `weatherImgs/snowflake.png`
     }

     else if (weatherId >= 701 && weatherId < 800) {
          weatherImg.src = `weatherImgs/windy.png`;
     }

     else if (weatherId === 800) {
          weatherImg.src = `weatherImgs/sun.png`;
     }

     else if (weatherId > 800) {
          weatherImg.src = `weatherImgs/cloudy.png`;
     }


}

function getWeatherErorrs(massege) {
     document.getElementById(`erorr`).style.display = `block`;
     document.getElementById(`erorr`).innerText = `Erorr: ${massege}`;
}