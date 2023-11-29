import { useState } from "react";

export default function PokemonList({pokemonList, onPokemonClick}) {
    
    let currentPokemon = pokemonList[0]
    const [currentMon, setCurrentPokemon] = useState(currentPokemon);
    function updateNameAndPokemon(pokemon)
    {
        setCurrentPokemon(pokemon);
        onPokemonClick(pokemon)
    }
    
    return (    
        <div>
            <p>the current pokemon is {currentMon.name}</p>
            <ul>
                {pokemonList.map((pokemon) => (
                    <li key={pokemon.dexNumber} onClick={()=>onPokemonClick(pokemon)}>
                        {pokemon.dexNumber} - {pokemon.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
