import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";
import pokemons from "./pokemon.json"
import { useState } from "react";

export default function App() {

let currentPokemon = pokemons[0];
const [currentMon, setCurrentMon] = useState(currentPokemon);

function updatePokemon(pokemon){
  setCurrentMon(pokemon);
}

  return (
    <div>
      <PokemonList pokemonList = {pokemons} onPokemonClick={(pokemon)=>updatePokemon(pokemon)}/>
      <PokemonDetail pokemon={currentMon}/>
    </div>  
  );
}
