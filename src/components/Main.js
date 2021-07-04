import React, { Component } from 'react';
import Card from './Card';
import '../styles/mainStyles.css';
import Panel from './Panel';

export default class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: [],
      isLoading: true,
      pokemon: ''
    }
  }

  returnHandler = ()=> {
    this.setState({
      pokemon: '',
    });
  }

  putInfoPokemon = (promise)=> {
    this.setState({
      pokemon: promise,
    });
  }

  getPokemons = async (data)=> {
    const pokemons = await data.results.map(async (obj)=>{
      const response = await fetch(obj.url, {mode: 'cors'});
      const pokemon = await response.json();
      return pokemon;
    });
    return pokemons;
  }

  getData = async (page)=> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${151}&offset=${page}`, {mode: 'cors'});
    const data = await response.json();
    const pokemons = await this.getPokemons(data);
    this.setState({
      list: [...pokemons],
      isLoading: !this.state.isLoading
    });
  }

  componentDidMount(){
    if(this.state.list.length <= 0) this.getData();
  }

  render() {
    const { list, isLoading, pokemon } = this.state;
    return(
      <main className={`main ${(pokemon)? 'not-grid': ''}`}>
        <div className="loading" style={(isLoading)?{display: 'block'}:{display: 'none'}}></div>
        {(!pokemon)
          ? list.map((promise, i)=> <Card
              putInfoPokemon={this.putInfoPokemon}
              key={i}
              promise={promise}
            />)
          : <Panel pokePromise={pokemon} returnHandler={this.returnHandler}/>
        }
      </main>
    );
  }
}