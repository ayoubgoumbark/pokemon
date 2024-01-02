import axios from 'axios';
import pokemonModel from '../models/pokemonModel';



const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

export const getPokemonDetail = async (id:number) => {
  
    
    const response = await axios.get<pokemonModel>(
      `${API_BASE_URL}/${id}`);
    return response;
  };