import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import PokemondCard from '../components/PokemondCard';
import { usePagination } from '../hooks/usePagination';

const getAllPokemons = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=2000');

    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  const pokemonsPagination = usePagination(pokemons, 50);

  const loadAllPokemons = async () => {
    const allPokemons = await getAllPokemons();

    setPokemons(allPokemons);
  };

  useEffect(() => {
    loadAllPokemons();
  }, []);

  return (
    <div>
      <p>
        <span className="text-red-500 font-semibold"> Welcome {user}! </span>
        Here you will find your favorite pokemon!!!
      </p>

      <div className="flex flex-row gap-2">
        {pokemonsPagination.pages.map((page) => (
          <button
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-500' : ''}
          >
            {page}
          </button>
        ))}
      </div>

      <section>
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemondCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
