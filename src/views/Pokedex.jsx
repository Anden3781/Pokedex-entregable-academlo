import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import PokemondCard from '../components/PokemondCard';
import { usePagination } from '../hooks/usePagination';
import { useLoaderData } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types } = useLoaderData();
  const pokemonsPagination = usePagination(pokemons, 50);

  return (
    <div>
      <p>
        <span className="text-red-500 font-semibold"> Welcome {user}! </span>
        Here you will find your favorite pokemon!!!
      </p>

      <div className="flex flex-row gap-2">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-500' : ''}
          >
            {page}
          </button>
        ))}
      </div>

      <div>
        <form>
          <select name="pokemon_type">
            {types.map((type) => (
              <option key={type.url} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
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
