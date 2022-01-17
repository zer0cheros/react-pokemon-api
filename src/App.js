import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import axios from 'axios'
import PageNavigation from './PageNavigation'
import './App.css'


function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [loading, setLoadning] = useState(true)
  const [search, setSearch] = useState('')
  let cancel;
  function handleSearch(){
    if(search == ''){
      fetchPokemon()
    }else {
      const result = pokemon.filter(data => data.startsWith(search))
      setPokemon(result)
    }
  }
  function fetchPokemon(){
    setLoadning(true)
    axios.get(currentPage, {
      cancelToken: new axios.CancelToken(stop => cancel = stop)
    }).then(res =>{
    setLoadning(false)
    setNextPage(res.data.next)
    setPrevPage(res.data.previous)
    setPokemon(res.data.results.map(p=> p.name))
  })
  }
  useEffect(()=>{
    fetchPokemon()
  return ()=> cancel()
  }, [currentPage])
  
  if(loading) {
    return '...Loading'
  }
  function gotonext(){
    setCurrentPage(nextPage)
  }
  function gotoprev(){
    setCurrentPage(prevPage)
  }
  return (
    <>
    <div>
            <input type='text' onChange={({target}) =>{
                setSearch(target.value)
            }}></input>
            <button onClick={handleSearch}>Search</button>
      </div>
    <PokemonList pokemon={pokemon}/>
    <PageNavigation
      gotonext={nextPage ? gotonext : null}
      gotoprev={prevPage ? gotoprev : null}
    />
    </>
  );
}

export default App;
