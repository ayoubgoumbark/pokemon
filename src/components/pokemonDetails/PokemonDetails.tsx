import React from 'react';
import './PokemonDetails.css';
import pokemonModel from '../../models/pokemonModel';

const PokemonDetails : React.FC<{pokemon:pokemonModel | null,onClose:any}> = ({pokemon, onClose }) => {
 

  return (
   
    <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div> <button onClick={onClose}>Close</button><h3>Pokemon Details</h3> </div>
        <div>
        <h2>Name  : {pokemon?.name}</h2>
        <div className='details'> 
          <img src={pokemon?.image} alt={pokemon?.name}  />
            <ul>
              <li ><b>Height</b> <label>{pokemon?.height} m</label></li>
              <li><b>Weight</b> <label>{pokemon?.weight} kg</label></li>
                <li> 
               
                  <ul className='powersList'>
                  <b>STATES</b>
                  {pokemon?.states.map((item:any,index) => (
              
              <li key={index}> <label>{item.stat.name} </label></li>
             
            ))}
                  </ul>
                </li>

                <li> 
               
               <ul className='powersList'>
               <b>ABILITYS</b>
               {pokemon?.abilities.map((item:any,index) => (
           
           <li key={index}> <label>{item.ability.name} </label></li>
          
         ))}
               </ul>
             </li>
              

            </ul>
            
        </div>
       
        </div>
        
       
       
      </div>
    </div>
  );
};

export default PokemonDetails;