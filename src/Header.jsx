import { useState, useEffect } from "react";

export function Header(prop) {
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchTime = () => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString().split("/").join("-"));
    };
    const timeInt = setInterval(fetchTime, 1000);
    fetchTime();
  }, [time]);

  let weather = prop.weather;
  return (
    <>
      <div className="header fc">
        <div className="weather fc">
          
              { weather
                ? <img
            src={"https://openweathermap.org/img/wn/" +
                  weather.weather[0].icon +
                  ".png"} alt="weather-icon"
                  />
                : ''
            }
            
          {weather ? weather.weather[0].main : "Weather"}
          <div className="weather-box fc">
            <div className="fc">
              <i className="bi bi-geo-alt-fill"></i> &nbsp;&nbsp;
              {weather ? weather.name : "Weather"}
            </div>
            <span className="fc">
              <div>Condition </div>{" "}
              <b>{weather ? weather.weather[0].description : "None"}</b>
            </span>
            <span className="fc">
              <div>Temparature</div> <b>{weather ? weather.main.temp : "NaN"}</b>
            </span>
            <span className="fc">
              <div>Humidity</div> <b>{weather ? weather.main.humidity : "Nan"}%</b>
            </span>
            <span className="fc">
              <div>Wind Speed</div>{" "}
              <b>{weather ? weather.wind.speed : "NaN"} m/s</b>
            </span>
          </div>
        </div>

        <div className="name">
          <span>Poké</span>Weather
        </div>

        <div className="date-time fc">
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
