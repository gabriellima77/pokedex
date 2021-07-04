import React, { useState } from 'react';
import '../styles/headerStyles.css';
import info from '../assets/colors.json';

const Header = (props)=> {
  const [ text, setText ] = useState('');
  const [ color, setColor ] = useState('');

  const textHandler = (e)=> {
    setText(e.target.value);
    props.filterHandler(e.target.value);
  }
  
  const getTypes = ()=> {
    const keys = [];
    info.colors.forEach((type)=> {
      keys.push(Object.keys(type))
    });
    return keys;
  }

  const selectTypeHandler = (e)=> {
    const value = e.target.value;
    let color = '';
    if(value){
      color = info.colors.find((type)=> (type[value]))[value];
    }
    setColor(color);
    props.typeFilterHandler(value);
  }

  return(
    <header className="header">
      <h1 className="logo">Pokedex</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={textHandler}
        />
        <select style={{background: color}} onChange={selectTypeHandler} className="select">
          <option value="">-- Type --</option>
            {getTypes().map((type, i)=> 
              (<option
                value={type}
                style={{background:info.colors[i][type]}}
                key={i}
              >
                {type}
              </option>))}
        </select>
      </div>
    </header>
  );
}

export default Header;