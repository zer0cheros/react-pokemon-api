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
  

  useEffect(()=>{
    setLoadning(true)
    let cancel
    axios.get(currentPage, {
      cancelToken: new axios.CancelToken(stop => cancel = stop)
    }).then(res =>{
    setLoadning(false)
    setNextPage(res.data.next)
    setPrevPage(res.data.previous)
    setPokemon(res.data.results.map(p=> p.name))
  })
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
    <PokemonList pokemon={pokemon}/>
    <PageNavigation
      gotonext={nextPage ? gotonext : null}
      gotoprev={prevPage ? gotoprev : null}
    />
    </>
  );
}

export default App;
