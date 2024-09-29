import axios from 'axios';
import { useEffect, useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css';

function PokemonList() {

    const [isLoading, setIsLoading] = useState(true);
    const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [pokemonList, setPokemonList] = useState([]);
    const [prevUrl, setPrevUrl]= useState("");
    const [nextUrl, setNextUrl] = useState("");

    async function downloadPokemon() {
        // setIsLoading(true);
        const response = await axios.get(pokedexUrl);
        const pokemonResults = response.data.results;
        console.log(response.data);
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);

        const pokemonResultPromise = pokemonResults.map((pokemons) => axios.get(pokemons.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);


        const res= pokemonData.map((pokedata) => {
            const pokemon = pokedata.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                type: pokemon.types
            }
        })

        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }


    useEffect(() => {
        downloadPokemon();
    }, [pokedexUrl]);


    return (
        <div className="pokemon-list-wrapper">
            <div className="list">Pokemon List</div>
            <div className="data">{(isLoading) ? "Data Loading...." : 
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>

            <div className="controls">
                <button disabled = {prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled = {nextUrl == null} onClick={ () => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;