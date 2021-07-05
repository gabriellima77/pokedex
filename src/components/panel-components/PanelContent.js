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
    const { stats } = this.props.pokemon;
    const hasTotal = stats.find((stat)=> (stat.stat.name === 'total'));
    if(!hasTotal){
      let obj = {
        stat: {
          name: 'total'
        },
        base_stat: 0
      }
      stats.forEach((stat)=> {
        obj.base_stat += stat.base_stat;
      });
      stats.push(obj);
    }
    this.setState({
      active: [false, true, false],
      about: '',
      moves: '',
      base: stats,
    });
  }
  
  movesHandler = ()=> {
    const { moves } = this.props.pokemon;
    this.setState({
      active: [false, false, true],
      about: '',
      moves,
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
          <p className="title">Abilities:</p>
          <p className="text">[ {about.abilities.map((ability)=> ability.ability.name).join(', ')} ]</p>
        </div>
      </div>
    );
  }

  getPercent = (value)=> {
    let percent = (value/255)* 100;
    if(percent > 100) percent = 100;
    return percent;
  }

  getBaseStats = ()=> {
    const { base } = this.state;
    return (
      <div className="content">
        {base.map((stats, i)=> (
          <div key={i} className="content-box">
            <p className="title">{stats.stat.name}:</p>
            <div className="text">
              <p>{stats.base_stat}</p>
              <div className="meter">
                <span style={{width: `${this.getPercent(stats.base_stat)}%`}} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  getMoves = ()=> {
    const { moves } = this.state;
    return (
      <div className="content">
        {moves.map((move, i)=> (
          <div key={i} className="content-box">
          <p className="title">{move.move.name}:</p>
          <div className="text">
            <p className="space">[ Level: {move.version_group_details[0].level_learned_at},</p>
            <p>Method: {move.version_group_details[0].move_learn_method.name} ]</p>
          </div>
          </div>
          )
        )}
      </div>
    );
  }

  putContent = ()=> {
    const { about, base, moves } = this.state;

    if(about) return this.getAbout();
    else if(base) return this.getBaseStats();
    else if(moves) return this.getMoves();
    return null;
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
