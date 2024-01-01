
import pokemonModel from '../../models/pokemonModel';
import { FETCH_POKEMON_FAILURE, FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCESS, pokemonActions } from '../actions/pokemonActions';

  
 export interface PokemonState {
    pokemons: pokemonModel[];
    loading: boolean;
    error: string | null;
  }

  
  
  const initialState: PokemonState = {
    pokemons: [],
    loading: false,
    error: null
  };
  
   const pokemonReducer = (state = initialState, action: pokemonActions): PokemonState => {
    switch (action.type) {
      case FETCH_POKEMON_REQUEST:
       
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_POKEMON_SUCCESS:
        console.log("------------------")
              return {
          ...state,
          pokemons: [...state.pokemons,...action.payload],
          loading: false
        };
      case FETCH_POKEMON_FAILURE:
        return {
          ...state,
          error: action.error,
          loading: false
        };
     
      default:
        return state;
    }
  };



   
  
  export default pokemonReducer;