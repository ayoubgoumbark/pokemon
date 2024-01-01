import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PokemonState } from '../../store/reducers/pokemonReducer';
import pokemonModel from '../../models/pokemonModel';
import Pokemon from '../pokemon/Pokemon';
import { FETCH_POKEMON_REQUEST } from '../../store/actions/pokemonActions';
import "./PokemonList.css"
import PokemonDetails from '../pokemonDetails/PokemonDetails';

const PokemonList: React.FC = () => {


  const dispatch = useDispatch();
  const { error, loading, pokemons } = useSelector((state: PokemonState) => state);
  const [offset, setOffset] = useState(10);
  const [selectedPokemon, setSelectedPokemon] =useState<pokemonModel | null>(null);

  const fetchPokemonsHandler = (offset: number) => {
   
    dispatch({type:FETCH_POKEMON_REQUEST,offset:offset});
    setOffset(offset + 10);
    
    
    
  };

  useEffect(() => {

    fetchPokemonsHandler(offset);
    
  }, []);

 
  const fetchMorePokemons = () => {
    fetchPokemonsHandler(offset);
  };


  const handlePokemonClick = (pokemon:pokemonModel) => {
   
    setSelectedPokemon(pokemon); 
   
    
  };

  const closeModal = () => {
    
    setSelectedPokemon(null);
    
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <InfiniteScroll
        dataLength={pokemons.length}
        next={fetchMorePokemons}
        hasMore={!loading && !error} 
        loader={<b></b>}
        endMessage={<b>loading Pokemons...</b>}
      >
        <div className='container'>
          <div className='pokemonList'> 
            {pokemons.map((pokemon: pokemonModel,index) => (
              
              <Pokemon  key={index}  handlePokemonClick={handlePokemonClick}  pokemon={pokemon} />
             
            ))}
          </div>
        </div>
      </InfiniteScroll>
      {selectedPokemon && (<PokemonDetails onClose={closeModal} pokemon={selectedPokemon} />) }
     
      {error && <div>Error: {error}</div>}
      
     
    </div>
  );
};

export default PokemonList;
