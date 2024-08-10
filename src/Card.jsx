import React from "react";
import "./Card.css";

export function Card(prop) {
  let data = prop.data;

  return (
    <>
      <div className="card">
        <p className="hp">
          <span>HP</span> {data.HP}
        </p>
        <img src={data.image} />
        <h1 className="poke-name">{data.name}</h1>
        <h5 className="poke-desc">{data.desc}</h5>
        <div className="types">
          {data.type.map((el, i) => {
            let clr = "#fff";
            let tclr = "#000"
            if(el == "Grass") {clr = "green"; tclr = "#fff"}
            if(el == "Poison") {clr = "purple"; tclr = "#fff"}
            if(el == "Fire") {clr = "red"; tclr = "#fff"}
            if(el == "Water") {clr = "#5f5feb"; tclr = "#fff"}
            if(el == "Flying") {clr = "skyblue"; tclr = "#000"}
            if(el == "Bug") {clr = "#e18847"; tclr = "#000"}
            if(el == "Electric") {clr = "yellow"; tclr = "#000"}
            if(el == "Ground") {clr = "#3f1d05"; tclr = "#fff"}
            if(el == "Fairy") {clr = "rgb(220 144 231)"; tclr = "#fff"}
            if(el == "Fighting") {clr = "rgb(171 0 85)"; tclr = "#fff"}
            if(el == "Psychic") {clr = "rgb(60 213 193)"; tclr = "#000"}
            if(el == "Rock") {clr = "grey"; tclr = "#fff"}
            if(el == "Ice") {clr = "lightblue"; tclr = "#000"}
            if(el == "Ghost") {clr = "rgb(17 0 49)"; tclr = "#fff"}
            if(el == "Dark") {clr = "black"; tclr = "#fff"}
            if(el == "Steel") {clr = "rgb(113 113 113)"; tclr = "#fff"}
            if(el == "Dragon") {clr = "rgb(133 10 54)"; tclr = "#fff"}
            return <span key={i} style={{background: clr, color: tclr}}>{el}</span>;
          })}
        </div>
        <div className="stats">
          <div>
            <h3>{data.attack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>{data.defense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>{data.speed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
    </>
  );
}
