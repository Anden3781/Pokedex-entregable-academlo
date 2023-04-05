import React from 'react';
import { Outlet } from 'react-router-dom';

const PokedexLayout = () => {
  return (
    <div>
      <h1>Pokedex Layout</h1>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;
