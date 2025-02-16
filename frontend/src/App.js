// Filename - src/App.js

import React from 'react';
import axios from 'axios';

import Grid from "./Components/Grid";

class App extends React.Component {

    state = {
        details : [],
        gridData : [
          // tester map
          [[1, 0, 0], [0, 1, 0], [0, 0, 1]], 
          [[1, 1, 0], [0, 1, 1], [1, 0, 1]], 
          [[1, 1, 1], [0, 0, 0], [1, 1, 1]], 
        ],
        selectedColor: [1, 1, 1],
    }

    componentDidMount() {

        let data ;

        axios.get('http://localhost:8000/wel/')
        .then(res => {
            data = res.data;
            this.setState({
                details : data    
            });
        })
        .catch(err => {})

      }
    
    // create a new grid with the changed colour at the index that was clicked on 
    handleCellClick = (rowIndex, colIndex) => {
        const newGrid = this.state.gridData.map((row, rIdx) =>
            row.map((cell, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex ? this.state.selectedColor : cell
            )
        );
        this.setState({ gridData: newGrid });
    };

    // save the colour that is picked
    handleColorSelect = (color) => {
        this.setState({ selectedColor: color });
    };

  render() {
    const colorOptions = [
      {color: [0, 0, 0], name: "Off" },
      {color: [1, 0, 0], name: "Red" },
      {color: [0, 1, 0], name: "Green" },
      {color: [0, 0, 1], name: "Blue" },
      {color: [1, 1, 0], name: "Yellow" },
      {color: [0, 1, 1], name: "Cyan" },
      {color: [1, 0, 1], name: "Magenta" },
      {color: [1, 1, 1], name: "White" },
  ];
    return(
      <div>
          aaaa
            {this.state.details.map((detail, id) =>  (
            <div key={id}>
            <div >
                <div >
                    <h1>{detail.detail} </h1>
                    <footer >--- by
                    <cite title="Source Title">
                    {detail.name}</cite>
                    </footer>
                </div>
            </div>
            </div>
            )
        )}

      <h3>Select colour to edit map</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          {colorOptions.map(({ color, name }) => (
              <button
                  key={name}
                  onClick={() => this.handleColorSelect(color)}
                  style={{
                      width: "20px",
                      height: "15px",
                      backgroundColor: `rgb(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`,
                      border: this.state.selectedColor === color ? "3px solid black" : "1px solid gray",
                      cursor: "pointer",
                  }}
              ></button>
          ))}
          </div>
      <h3>Map</h3>
      <Grid data={this.state.gridData} onCellClick={this.handleCellClick} />
      </div>
      
      );
  }
}

export default App;
