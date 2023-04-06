import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemondCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate()

  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);

    setPokemon(pokemonInfo);
  };

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`)
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article onClick={handleClickNavigate} className='hover:cursor-pointer'>
          <header>
            <div></div>
            <div style={{ width: 150 }}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
          </header>

          <section>
            <section>
              <h2 className="text-2xl font-semibold">{pokemon.name}</h2>
              <p>{pokemon.types[0].type.name}</p>
              <p>Tipo</p>
            </section>

            <section>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3>{stat.stat.name.toUpperCase()}</h3>
                  <p>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemondCard;
