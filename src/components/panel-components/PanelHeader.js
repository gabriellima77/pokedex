import React from 'react';
import Type from '../Type';

const PanelHeader = (props)=> {
  const { pokemon, returnHandler } = props;
  const id = pokemon.id;

  return (
    <div className="header-content">
      <button className="return" onClick={returnHandler}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className="box">
        <div className="small-box">
          <h2 className="large-name">{pokemon.name}</h2>
          <Type types={pokemon.types} />
        </div>
        <h3 className="id">#{(id < 10)?'00':(id < 100)?'0':''}{id}</h3>
      </div>
    </div>
  );
}

export default PanelHeader;