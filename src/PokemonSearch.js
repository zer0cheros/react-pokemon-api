import React, {useState} from 'react'

function PokemonSearch({pokemon}) {
    const [search, setSearch] = useState('')
    function handleSearch(){
        result = pokemon.filter(data => data.startsWith(search))
        return result
    }
    return (
        <div>
            <input type='text' onChange={({target}) =>{
                //let reg = new RegExp(target.value, 'i')
                setSearch(target.value)
            }}></input>
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}
export default PokemonSearch
