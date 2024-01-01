import React from 'react';

import './App.css';
import PokemonList from './components/pokemonList/PokemonList';
import { PokemonState } from './store/reducers/pokemonReducer';
import { useSelector } from 'react-redux';
import Loading from './components/loading/Loading';


function App() {
  const { loading } = useSelector((state: PokemonState) => state);
  return (
    <div className="App">
      <PokemonList/>
      {loading && <Loading/>}
    </div>
  );
}

export default App;
