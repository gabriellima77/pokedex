import React, { Component } from 'react';

export default class PanelContente extends Component {

  constructor(props) {
    super(props);

    const { species, weight, height, abilities } = this.props.pokemon;
    const about = {
      species,
      weight,
      height,
      abilities
    };

    this.state = {
      about,
      base: '',
      moves: '',
      active: [true, false, false]
    }
  }

  aboutHandler = ()=> {
    const { species, weight, height, abilities } = this.props.pokemon;
    const about = {
      species,
      weight,
      height,
      abilities
    };
    this.setState({
      active: [true, false, false],
      about,
      moves: '',
      base: '',
    });
  }

  baseHandler = ()=> {
    this.setState({
      active: [false, true, false],
      about: '',
      moves: '',
      base: '',
    });
  }
  
  movesHandler = ()=> {
    this.setState({
      active: [false, false, true],
      about: '',
      moves: '',
      base: '',
    });
  }

  getAbout = ()=> {
    const { about } = this.state;
    return (
      <div className="content">
        <div className="content-box">
          <p className="title">Species:</p>
          <p className="text">{about.species.name}</p>
        </div>
        <div className="content-box">
          <p className="title">Height:</p>
          <p className="text">{about.height/10} m</p>
        </div>
        <div className="content-box">
          <p className="title">Weight:</p>
          <p className="text">{about.weight/10} Kg</p>
        </div>
        <div className="content-box">
          <p className="title">Weight:</p>
          <p className="text">{about.abilities.map((ability)=> ability.ability.name).join(', ')}</p>
        </div>
      </div>
    );
  }

  putContent = ()=> {
    const { about, base, moves } = this.state;

    if(about) return this.getAbout();
    else if(base) return this.getBase();
    else if(moves) return this.getMoves();
    return null;
  }

  componentDidMount() {
    console.log(this.props.pokemon);
  }

  render() {
    const { active } = this.state;
    return (
      <div className="panel-content">
        <div className="labels">
          <button
            className={`about-btn ${(active[0])? 'active': ''}`}
            onClick={this.aboutHandler}
          >
            About
          </button>
          <button
            className={`base-btn ${(active[1]? 'active': '')}`}
            onClick={this.baseHandler}
          >
            Base Stats
          </button>
          <button
            className={`moves-btn ${(active[2])? 'active': ''}`}
            onClick={this.movesHandler}
          >
            Moves
          </button>
        </div>
        {this.putContent()}
      </div>
    );
  }

}
