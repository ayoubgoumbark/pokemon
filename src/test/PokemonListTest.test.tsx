
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux'; 
import configureStore from 'redux-mock-store'; 

import PokemonList from '../components/pokemonList/PokemonList';

describe('PokemonList component', () => {
  const mockStore = configureStore();
  let store:any

  beforeEach(() => {
    store = mockStore({
      // Your mocked initial Redux state here
      error: null,
      loading: false,
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
    });
  });

  it('renders PokemonList component correctly', () => {
  
    render(
      <Provider store={store}>
        < PokemonList />
      </Provider>
    );




    

    expect(screen.getByText('Pokémon List')).toBeInTheDocument();
  });

  it('handles selecting and closing a Pokemon',async () => {
  
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );


    const pokemonName = 'bulbasaur';
    const pokemonElement = screen.getByText(pokemonName);
    fireEvent.click(pokemonElement);



 

    // Use waitFor to wait for the modal content to appear
    await waitFor(() => {
      const nameElement = document.body.querySelector(`h2`);
      expect(nameElement).toBeInTheDocument();
      expect(nameElement?.textContent).toContain(pokemonName); // Check if the name is present
    });


    // Simulate closing the modal
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Check if the Pokemon details modal closes
    expect(screen.queryByText(`Name  : ${pokemonName}`)).not.toBeInTheDocument();
  });

});
