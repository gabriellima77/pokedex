import React from 'react';

const Type = ({ types })=> {
  return(
    <div className="types">
      {(types)
        ? types.map((obj, i)=> <span key={i} className="type">{obj.type.name}</span>)
        : null
      }
    </div>
  );
}

export default Type;