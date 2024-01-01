import pokemonModel from '../../models/pokemonModel';

export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';



 export interface FetchPokemonRequest  {
  type: typeof FETCH_POKEMON_REQUEST;
  offset:Number
}



interface FetchPokemonSuccess {
  type: typeof FETCH_POKEMON_SUCCESS;
  payload: pokemonModel[];
}

interface FetchPokemonFailure {
  type: typeof FETCH_POKEMON_FAILURE;
  error: string;
}



export type pokemonActions =
  | FetchPokemonRequest
  | FetchPokemonSuccess
  | FetchPokemonFailure
  ;





