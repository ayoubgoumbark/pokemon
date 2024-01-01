
import React from 'react';
import pokemonModel from '../../models/pokemonModel';
import "./Pokemon.css"
const Pokemon: React.FC<{pokemon:pokemonModel,handlePokemonClick:any}> = ({pokemon,handlePokemonClick}) => {
  const handleClick = () => {
   
    handlePokemonClick(pokemon)
  };
  

  return (
    <div onClick={handleClick} className='pokemon'>
      <img src={pokemon.image}/>
      
      <h4>{pokemon.name}</h4>
    </div>
   );
 };

export default Pokemon;