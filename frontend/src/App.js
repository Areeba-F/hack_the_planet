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

        let data;

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

    listToString = (grid) => {
        return grid.map(layer => layer.map(row => `[${row.join(',')}]`).join(',')).join(',');
    };

    // save the grid
    saveGrid = () => {
        console.log("Save button clicked!"); 
        const gridString = this.listToString(this.state.gridData);
        axios.post('http://localhost:8000/wel/', { grid: gridString })
            .then(() => alert("Grid saved successfully!"))
            .catch(err => console.error("Error saving grid:", err));
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

      <h3 style={{ textAlign: "center" }}>Select colour to edit map</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px", justifyContent: "center",}}>
          {colorOptions.map(({ color, name }) => (
              <button
                  key={name}
                  onClick={() => this.handleColorSelect(color)}
                  style={{
                      width: "40px",
                      height: "25px",
                      border: "1px solid #333",
                      backgroundColor: `rgb(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`,
                      transition: "border 0.3s ease, transform 0.2s ease",
                      cursor: "pointer",                      
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              ></button>
          ))}
          </div>
      <h3 style={{ textAlign: "center" }}>Map</h3>
      <Grid data={this.state.gridData} onCellClick={this.handleCellClick} />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
                onClick={this.saveGrid}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "rgb(0,0,0)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    transition: "border 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} 
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
                Save Grid
            </button>
        </div>
      </div>
      
      );
  }
}

export default App;
