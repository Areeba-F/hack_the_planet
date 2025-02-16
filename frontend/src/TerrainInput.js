import React from 'react';
import axios from 'axios';

class TerrainInput extends React.Component {
  render() {

    const { colour } = this.props;
    var name = 'terrain-'.concat(colour);

    return(
      <div>
          <label for={name}>{colour}</label>
          <input id={name} name={name} type='text'></input>
      </div>
      );
    }
}

export default TerrainInput;
