import React, { Component } from 'react';
import info from '../assets/colors.json';
import Type from './Type';

export default class Card extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      data: '',
      types: '',
      color: '',
      imgUrl: '',
      id: '',
    }
  }

  getColor = (type)=> {
    const colors = info.colors;
    const color = colors.find((color)=> (color[type]));
    return color;
  }

  setData = async (pokemon)=> {
    this.setState({
      data: pokemon,
      types: pokemon.types,
      id: pokemon.id,
      name: pokemon.name,
    });
    const type = pokemon.types[0].type.name;
    const color = this.getColor(type)[type];
    const sprite = pokemon.sprites.other.dream_world.front_default;

    this.setState({
      color,
      imgUrl: sprite
    });
  }

  componentDidMount(){
    const { pokemon } = this.props; 
    if(!this.state.data) this.setData(pokemon);
  }

  render(){
    const { color, id, imgUrl, types, name } = this.state;
    const { putInfoPokemon, pokemon } = this.props;
    return (
      <div
        onClick={()=>{putInfoPokemon(pokemon)}}
        className="card"
        style={{backgroundColor: color}}
      >
        <h2 className="name">{name}</h2>
        <h3 className="id">#{(id < 10)?'00':(id < 100)?'0':''}{id}</h3>
        <Type types={types} />
        <img className="sprite" alt={name} src={imgUrl}></img>
      </div>
    );
  }

}
