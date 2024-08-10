import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { Header } from "./Header.jsx";
import { Card } from "./Card.jsx";
import pokemon from "../public/pokedex.json";
import quotes from "../public/quotes.json";

function App() {
  const [weather, setWeather] = useState();
  const [name, setName] = useState("");
  const [quote, setQuote] = useState(quotes[parseInt(Math.random() * 101)]);

  useEffect(() => {
    const fetchWeather = () => {
      window.navigator.geolocation.getCurrentPosition(async (pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        let res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=26ba37b3454507d776f11f8f0745bd8b&units=metric`
        );
        let json = await res.json();
        setWeather(json);
      });
    };

    const timeInt = setInterval(() => {
      fetchWeather();
    }, 600000);
    fetchWeather();

    return () => clearInterval(timeInt);
  }, []);

  useEffect(() => {
    const qtInt = setInterval(() => {
      setQuote(quotes[parseInt(Math.random() * 101)]);
    }, 1000 * 60);
    return () => clearInterval(qtInt);
  }, []);

  return (
    <>
      <Header weather={weather} />
      <div className="quote-box">
        "{quote.quote}" ..... <b>{quote.author}</b>
      </div>
      <label className="fc">
        <input
          onChange={(e) => {
            setName(e.target.value.trim());
          }}
          value={name}
          type="text"
          name="poke-search"
          id="poke-search"
          placeholder="Search Best Pokemons Here"
        />
      </label>

      <div className="card-space">
        {name != ""
          ? pokemon
              .filter((el, i) => {
                name.toLowerCase()
                return el.name.toLowerCase().search(name.toLowerCase()) >= 0;
              })
              .map((el, i) => {
                return <Card key={i} data={el} />;
              })
          : pokemon.map((el, i) => {
              return <Card key={i} data={el} />;
            })}
      </div>

      <div className="footer">© by <a target="_blank" href="https://www.linkedin.com/in/prathamesh-thorat-56703730b/">Prathmesh Thorat</a> (<span>IIT Kanpur Y24</span>)</div>
    </>
  );
}

export default App;
