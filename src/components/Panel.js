import React, { Component } from 'react';
import json from '../assets/colors.json';
import '../styles/statusStyles.css';
import PanelHeader from './panel-components/PanelHeader';

export default class Panel extends Component {

  constructor(props){
    super(props);

    this.state = {
      pokemon: '',
      color: '',
    }
  }

  getColor = (type)=> {
    const data = json.colors.find((color)=> (color[type]));
    return data[type];
  }

  setPokemon = async ()=> {
    const { pokePromise } = this.props;
    pokePromise.then((pokemon)=> {
      const type = pokemon.types[0].type.name;
      const color = this.getColor(type);
      this.setState({
        pokemon,
        color: color,
      })
    });
  }

  getPanel = ()=> {
    const { pokemon } = this.state;
    const { returnHandler } = this.props;
    return (
      <div className="container">
        <PanelHeader pokemon={pokemon} returnHandler={returnHandler}/>
        <img
          alt={pokemon.name}
          className="large-sprite" 
          src={pokemon.sprites.front_default} 
        />
      </div>
    );
  }

  componentDidMount() {
    if(!this.state.pokemon) this.setPokemon();
  }

  render() {
    
    return (
      <section className="panel" style={{backgroundColor: true && (this.state.color)}}>
        {(this.state.pokemon) && this.getPanel()}
      </section>
    );
  }
}
