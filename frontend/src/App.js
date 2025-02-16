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
        savedGrids: [], 
    }

    componentDidMount() {

        axios.get('http://localhost:8000/wel/')
        .then((res) => {
            this.setState({ savedGrids: res.data });
        })
        .catch((err) => {
            console.error("Error fetching saved grids:", err);
        });
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
        return `[${grid
            .map(layer => 
                `[${layer
                    .map(row => `[${row.join(',')}]`)
                    .join(',')}]`
            )
            .join(',')}]`;
    };

    stringToList = (savedGrids) => {
        return savedGrids
            .slice(3, -3) 
            .split(']],[[')  
            .map((layer) => 
                layer
                .split('],[')         
                .map((row) => 
                    row
                    .split(',')       
                    .map(Number)      
                )
            )
            ;
      };
    

    // save the grid
    saveGrid = () => {
        console.log("Save button clicked!"); 
        const gridString = this.listToString(this.state.gridData);
        axios.post('http://localhost:8000/wel/', { grid: gridString })
            .then(() => alert("Grid saved successfully!"))
            .catch(err => console.error("Error saving grid:", err));
    };

    // get old grids
    loadGrid = (gridData) => {
        //console.log("grid before", gridData); 
        const loadedGrid = this.stringToList(gridData);
        //console.log("grid after", loadedGrid);
        this.setState({ gridData: loadedGrid });
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

    <h4>Saved Grids</h4>
        <ul>
        {this.state.savedGrids.map((grid, index) => (
            <li key={index} onClick={() => this.loadGrid(grid.grid)}
            style={{
                transition: "border 0.3s ease, transform 0.2s ease",
                cursor: "pointer",                      
            }}
            onMouseEnter={(e) => (e.target.style.color = "rgb(199, 87, 199)")}
            onMouseLeave={(e) => (e.target.style.color = "rgb(0,0,0")}
            >
            {`Grid ${index + 1}`}
            </li>
        ))}
        </ul>

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

      {/* Testing for correct grid layour
      
      <div>
      {this.state.gridData.map((layer, layerIndex) => (
        <div key={layerIndex}>
          <h3>Layer {layerIndex + 1}</h3>
          {layer.map((row, rowIndex) => (
            <div key={rowIndex}>
              Row {rowIndex + 1}: {row.join(', ')}
            </div>
          ))}
        </div>
      ))}
    </div> */}

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
