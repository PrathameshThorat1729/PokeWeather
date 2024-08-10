import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchTime = ( ) => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString().split("/").join("-"));
    }
    const timeInt = setInterval(fetchTime, 1000);
    fetchTime();
  }, [time]);

  // fetchWeather(setWeather);
  useEffect(() => {
    const fetchWeather = () => {
      window.navigator.geolocation.getCurrentPosition(async (pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        console.log(lat);

        let res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=26ba37b3454507d776f11f8f0745bd8b`
        );
        let json = await res.json();
        setWeather(json);
        console.log(json);
      });
    };

    const timeInt = setInterval(() => {
      fetchWeather();
    }, 600000);
    fetchWeather();

    return () => clearInterval(timeInt);
  }, []);

  return (
    <>
      <div className="header">
        <div className="weather">
          <img
            src={
              weather
                ? "https://openweathermap.org/img/wn/" +
                  weather.weather[0].icon +
                  ".png"
                : 1
            }
            alt="weather-icon"
          />&nbsp;&nbsp;&nbsp;
          {weather ? weather.weather[0].main : 1}
        </div>
        <div className="name">PokéWeather</div>
        <div className="date-time">
          <span className="date">
            <i className="bi bi-calendar3"></i> &nbsp;&nbsp;&nbsp;{date}
          </span>
          <span className="time">
            <i className="bi bi-clock"></i> &nbsp;&nbsp;&nbsp;{time}
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
