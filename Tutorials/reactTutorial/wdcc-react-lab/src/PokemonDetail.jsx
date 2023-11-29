export default function PokemonDetail({pokemon}) {
    return (
        <div>
            <p> <b>Dex number:</b>  {pokemon.dexNumber}</p>
            <p> <b>Name:</b>  {pokemon.name}</p>
            <img src={pokemon.imageUrl}/>
            <p>{pokemon.dexEntry}</p>
        </div>
    );
}