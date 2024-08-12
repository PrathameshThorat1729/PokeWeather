import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { Header } from "./Header.jsx";
import { Card } from "./Card.jsx";
import pokemon from "./pokedex.json";
import quotes from "./quotes.json";

function App() {
  const [weather, setWeather] = useState();
  const [name, setName] = useState("");
  const [pokeFilter, setFilter] = useState("All");
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

  let filteredPoke = pokemon.filter((el) => {
    console.log(pokeFilter);
    if (pokeFilter != "All") return el.type.indexOf(pokeFilter) >= 0;
    else return true;
  });

  return (
    <>
      <Header weather={weather} />
      <div className="quote-box">
        "{quote.quote}" ..... <b>{quote.author}</b>
      </div>
      <div className="poke-search-box fc">
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
        <select
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          name="poke-filter"
          id="poke-filter"
          value={pokeFilter}
        >
          <option value="All" defaultChecked>
            All
          </option>
          <option value="Bug">Bug</option>
          <option value="Dark">Dark</option>
          <option value="Dragon">Dragon</option>
          <option value="Electric">Electric</option>
          <option value="Fairy">Fairy</option>
          <option value="Fighting">Fighting</option>
          <option value="Fire">Fire</option>
          <option value="Flying">Flying</option>
          <option value="Ghost">Ghost</option>
          <option value="Grass">Grass</option>
          <option value="Ground">Ground</option>
          <option value="Ice">Ice</option>
          <option value="Normal">Normal</option>
          <option value="Poison">Poison</option>
          <option value="Psychic">Psychic</option>
          <option value="Rock">Rock</option>
          <option value="Steel">Steel</option>
          <option value="Water">Water</option>
        </select>
      </div>

      <div className="card-space">
        {name != ""
          ? filteredPoke
              .filter((el, i) => {
                return el.name.toLowerCase().search(name.toLowerCase()) >= 0;
              })
              .map((el, i) => {
                return <Card key={i} data={el} />;
              })
          : filteredPoke.map((el, i) => {
              return <Card key={i} data={el} />;
            })}
      </div>

      <div className="footer">
        © by{" "}
        <a
          target="_blank"
          href="https://www.instagram.com/prathameshthorat1729"
        >
          Prathmesh Thorat
        </a>{" "}
        (<span>IIT Kanpur Y24</span>)
      </div>
    </>
  );
}

export default App;
