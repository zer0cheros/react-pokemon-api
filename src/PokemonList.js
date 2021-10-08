import React from 'react'


export default function PokemonList({pokemon}) {
    return (
        <div className="card-container">
            {pokemon.map(p => (
                <>
                <div className="card">
                <p key={p}>{p}</p>
                <img className="img" src={`https://img.pokemondb.net/artwork/large/${p}.jpg`}></img>
                </div>
                </>
            ))}
        </div>
    )
}
