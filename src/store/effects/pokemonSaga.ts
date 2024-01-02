import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,

} from '../actions/pokemonActions';

import  pokemonModel  from '../../models/pokemonModel';
import { getPokemonDetail } from '../../services/PokemonService';
import { AxiosResponse } from 'axios';



export function* fetchPokemonDetails(id: number): Generator<any, pokemonModel, AxiosResponse<any>> {
  try {
     
    const response: AxiosResponse<any> = yield call(getPokemonDetail,id);
    
    return {
      name:response.data.name,
    
      image:response.data.sprites.other.dream_world.front_default,
      type:response.data.types[0].type.name,
      height:response.data.height,
      weight:response.data.weight,
      states:response.data.stats,
      abilities:response.data.abilities
    
    } 
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function* fetchPokemons(action: any): Generator<any, void, any> {
  try {
   
    const offset = action.offset || 10;
   
    const numbersToFetch = Array.from({ length: 10 }, (_, index) => offset - 9 + index);
   
    const pokemonDetails: pokemonModel[] = yield all(
      numbersToFetch.map((num) => call(fetchPokemonDetails, num))
    );
      
 

    yield put({ type: FETCH_POKEMON_SUCCESS, payload: pokemonDetails });
   
  } catch (error: any) {
    yield put({ type: FETCH_POKEMON_FAILURE, error: error.message });
  }
}

export default function* pokemonSaga() {
  yield takeLatest(FETCH_POKEMON_REQUEST, fetchPokemons);
}
