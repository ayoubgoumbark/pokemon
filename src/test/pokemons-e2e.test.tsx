

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import PokemonList from '../components/pokemonList/PokemonList';

import {  fetchPokemons } from '../store/effects/pokemonSaga';

import {runSaga} from "redux-saga"

import { screen } from '@testing-library/react';



const mockResponse:any = {
    data: {
      pokemons: [{
          abilities: [
            {
              ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
              is_hidden: false,
              slot: 1,
            },
            {
              ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' },
              is_hidden: true,
              slot: 3,
            },
          ],
         
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
          name: 'bulbasaur',
          states: [
            { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
            { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
            
          ],
          type: 'grass',
          weight: 69,
          height: 7,
        }
        
       
        ]
    }
  };




test('fetchPokemons saga', async() => {
  
 

    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchPokemons as any,
      { offset: 10 },
    ).toPromise();
     

    expect(dispatched[0].type).toEqual("FETCH_POKEMON_SUCCESS");
    expect(dispatched[0].payload[0].name).toEqual(mockResponse.data.pokemons[0].name);
    

    
    const mockStore = configureStore();
    let store:any
    store = mockStore({
      // Your mocked initial Redux state here
      error: null,
      loading: false,
      pokemons: dispatched[0].payload
    });
    render(
      <Provider store={store}>
        < PokemonList />
      </Provider>
    );


    const pokemonName = 'bulbasaur';
    expect(screen.getByText(pokemonName)).toBeInTheDocument();
   

  
})