import React, { Component } from 'react';
import Card from './Card';
import '../styles/mainStyles.css';
import Panel from './Panel';

export default class Main extends Component {
  constructor(props){
    super(props);
    this.putInfoPokemon = this.putInfoPokemon.bind(this);
  }

  putInfoPokemon(promise){
    this.props.setPokemon(promise);
  }

  getPokemons = async (data)=> {
    const pokemons = await data.results.map(async (obj)=>{
      const response = await fetch(obj.url, {mode: 'cors'});
      const pokemon = await response.json();
      return pokemon;
    });
    return Promise.all([...pokemons]);
  }

  getData = async (page)=> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${151}&offset=${page}`, {mode: 'cors'});
    const data = await response.json();
    const pokemons = await this.getPokemons(data);
    this.props.setData([...pokemons]);
  }

  componentDidMount(){
    if(this.props.list.length <= 0) this.getData();
  }

  render() {
    const { list, isLoading, pokemon } = this.props;
    return(
      <main className={`main ${(pokemon)? 'not-grid': ''}`}>
        <div className="loading" style={(isLoading)?{display: 'block'}:{display: 'none'}}></div>
        {(!pokemon)
          ? list.map((pokemon)=> <Card
              putInfoPokemon={this.putInfoPokemon}
              key={pokemon.id}
              pokemon={pokemon}
            />)
          : <Panel pokemon={pokemon} returnHandler={this.props.returnHandler}/>
        }
      </main>
    );
  }
}