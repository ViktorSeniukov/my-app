import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


let today = new Date();
let now = today.toLocaleDateString('ru-RU');
let upData = document.getElementById("up_Data");

function changeData() {
  upData.innerHTML = now;
}

changeData();


let searchBtn = document.getElementById('search_btn');

searchBtn.onclick = function() {
  let search = document.getElementById('search');
  // console.log(String(search));

  const apiKey = "aa5c179fb22f3ce6953bfc714741872c";
  let city = `${search.value}`;
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  let mainCel = document.getElementById('main_cel');
  let mainHumidity = document.getElementById('humidity');
  let mainHumidityMain = document.getElementById('humidity_main');
  let mainFeels = document.getElementById('feels');
  let mainSunset = document.getElementById('sunset');
  let mainSunrise = document.getElementById('sunrise');

  axios.get(url).then(res => {
    console.log(res.data);

    let resCel = Math.round(res.data.main.temp);
    let resHumidity = Math.round(res.data.main.humidity);
    let resHumidityMain = Math.round(res.data.main.humidity);
    let resFeels = Math.round(res.data.main.feels_like);
    let resSunrise = res.data.sys.sunrise;
    let resSunset = res.data.sys.sunset;

    let millisecondsSunrise = resSunrise * 1000;
    let dateObject = new Date(millisecondsSunrise);
    let humanDateFormatSunriseHour = dateObject.toLocaleString("ru-RU", {hour: "numeric"});
    let humanDateFormatSunriseMinute = dateObject.toLocaleString("ru-RU", {minute: "numeric"});

    let millisecondsSunset = resSunset * 1000;
    let dateObjectSet = new Date(millisecondsSunset);
    let humanDateFormatSunsetHour = dateObjectSet.toLocaleString("ru-RU", {hour: "numeric"});
    let humanDateFormatSunsetMinute = dateObjectSet.toLocaleString("ru-RU", {minute: "numeric"});

    let humanDateFormatSunrise = `${humanDateFormatSunriseHour}:${humanDateFormatSunriseMinute}`;
    let humanDateFormatSunset = `${humanDateFormatSunsetHour}:${humanDateFormatSunsetMinute}`;


    mainCel.innerHTML = resCel+"&deg;C";
    mainHumidity.innerHTML = resHumidity;
    mainHumidityMain.innerHTML = resHumidityMain;
    mainFeels.innerHTML = resFeels;
    mainSunrise.innerHTML = humanDateFormatSunrise;
    mainSunset.innerHTML = humanDateFormatSunset;
  })
}