import React, { useEffect, useState } from "react";
import { getPokemon } from "./pokeapi";
import "./Home.css";

const Home = () => {
  const [pokeName, setPokeName] = useState();
  const [pokeImg, setPokeImg] = useState();

  const fetchPokemons = async () => {
    try {
      const random = Math.floor(Math.random() * 500 + 1).toString();
      console.log(random);
      const data = await getPokemon(random);
      setPokeName(data.name);
      setPokeImg(data.sprites.front_default);
    } catch (err) {}
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <>
      <h1>
        Hello, <span>{pokeName}</span> is happy to welcome you.
      </h1>
      <div className="pokemon-img">
        <img src={pokeImg} alt={pokeName} title={pokeName}></img>
      </div>
    </>
  );
};

export default Home;
