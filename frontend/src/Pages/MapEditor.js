// Filename - src/App.js

import React, { useContext } from 'react';
import axios from 'axios';

import Grid from "../Components/Grid";
import { MapContext } from '../MapContext';

import { Navigate } from 'react-router-dom';
import styles from "./MapEditor.css"



class MapEditor extends React.Component {

    static contextType = MapContext;

    state = {
        details : [],
        gridData : [],
        selectedColor: [1, 1, 1],
        savedGrids: [], 
        showDataBox: false,
        navigateToCreation: false
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
        const newGrid = this.context.grid.map((row, rIdx) =>
            row.map((cell, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex ? this.state.selectedColor : cell
            )
        );
        // this.setState({ gridData: newGrid });
        this.context.setGrid(newGrid);
    };

    // save the colour that is picked
    handleColorSelect = (color) => {
        this.setState({ selectedColor: color });
    };

    // convert the array to a string to save to database
    listToString = (grid) => {
        return `[${grid
            .map(layer => 
                `[${layer
                    .map(row => `[${row.join(',')}]`)
                    .join(',')}]`
            )
            .join(',')}]`;
    };

    // convert the string from the database back into an array for display
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
        //console.log("Save button clicked!"); 
        const gridString = this.listToString(this.context.grid);
        axios.post('http://localhost:8000/wel/', { grid: gridString })
            .then(() => {this.fetchSavedGrids();})
            .catch(err => console.error("Error saving grid:", err));
    };

    // refresh the map grid list automatically anytime a new one is saved
    fetchSavedGrids = () => {
        axios.get('http://localhost:8000/wel/')
            .then((res) => {
                this.setState({ savedGrids: res.data });
            })
            .catch((err) => {
                console.error("Error fetching saved grids:", err);
            });
    };

    // get old grids
    loadGrid = (gridData) => {
        console.log("grid before", gridData); 
        const loadedGrid = this.stringToList(gridData);
        console.log("grid after", loadedGrid);
        //this.setState({ gridData: loadedGrid });
        this.context.setGrid(loadedGrid);
    };

    // display or hide the arduino box from button
    outputArduino = (gridData) => {
        this.setState(prevState => ({
            showDataBox: !prevState.showDataBox
        }));
    }

    displayString = () => {
        const paddedGrid = this.padGrid(this.context.grid);
        const listGrid = this.listToString(paddedGrid);
        const stringGrid = listGrid.replace(/\[|\]|\,/g, "");
        console.log("string", stringGrid);
        return stringGrid;
    }

    // send back to map navigation page
    NavToCreationPage = () => {
        this.setState({ navigateToCreation: true });
    }

    listToCSV = (paddedGrid) => {
        const rows = paddedGrid;
        const csvContent = rows.map(row => row.join(',')).join('\n');
        return csvContent;
    };

    downloadCSV = (gridData) => {
        const paddedGrid = this.padGrid(this.context.grid);
        const csvData = this.listToCSV(paddedGrid);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'output.csv';
        link.click();
    };

    padGrid = (grid) => {
        let newGrid = [];

        // Create a new 21x21x3 grid full of zeros
        for (let i = 0; i < 21; i++) {
            newGrid[i] = [];
            for (let j = 0; j < 21; j++) {
                newGrid[i][j] = [0, 0, 0]; 
            }
        }

        let startX = Math.floor((21 - grid.length) / 2); 
        let startY = Math.floor((21 - grid.length) / 2); 

        // populate it with the old grid IN THE MIDDLE
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                newGrid[startX + i][startY + j] = grid[i][j];
            }
        }
        return newGrid;
    };

  render() {
    console.log('MapEditor rerendered with context:',  this.context);

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
    // navigate to editor page
    if (this.state.navigateToCreation) {
        return <Navigate to="/" />;
        }
    return(
    <div className='main'>
        
        {/* load the previous grid elements*/}
        <div className="saved-grids">
            <h4>Saved Grids</h4>
            <ul>
                {this.state.savedGrids.map((grid, index) => (
                    <li key={index} onClick={() => this.loadGrid(grid.grid)}
                        style={{
                            transition: "border 0.3s ease, transform 0.2s ease",
                            cursor: "pointer",                      
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "rgb(199, 87, 199)")}
                        onMouseLeave={(e) => (e.target.style.color = "rgb(225, 179, 137)")}
                        >
                        {`Grid ${index + 1}`}
                    </li>
                ))}
            </ul>
        </div>
        
        <div className="editor">
            
                {/* buttons for saving the grid and showing arduino code */}
                <div className= 'button-div' style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={this.saveGrid}
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
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
                    
                    <button
                        onClick={this.downloadCSV}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            margin: "10px",
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
                        Download CSV For Arduino
                    </button>

                    <button
                        onClick={this.outputArduino}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            margin: "10px",
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
                        Display Binary Array
                    </button>

                    <button
                        onClick={this.NavToCreationPage}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            margin: "10px",
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
                        Back to Map Creation Page
                    </button>
                    
                </div>
                <div className="subeditor" style={{ background: "rgb(0,0,0, 0.7)", paddingBottom:"5px", paddingTop:"2px",marginTop: "5px",}}>
                {/* select the colour for editing the map */}
                <h3 style={{ textAlign: "center" }}>Select colour to edit map</h3>
                <div className= 'colour-selector' style={{borderBottom: "1px solid rgb(225, 179, 137)", display: "flex", gap: "10px", marginBottom: "10px", justifyContent: "center",}}>
                    {colorOptions.map(({ color, name }) => (
                        <button
                            key={name}
                            onClick={() => this.handleColorSelect(color)}
                            style={{
                                
                                marginBottom: "20px",
                                width: "0.5vw",
                                height: "0.5vh",
                                border: "1px solid #333",
                                backgroundColor: `rgb(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255}, 0.8)`,
                                transition: "border 0.3s ease, transform 0.2s ease",
                                cursor: "pointer",               
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                        ></button>
                    ))}
                    </div>
                </div>

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
            <h3 style={{ textAlign: "center" }}>Map</h3>

            {/* main grid element */}
            <Grid className= "display-grid" data={this.context.grid} onCellClick={this.handleCellClick} />

            {this.state.showDataBox && (
                        <div
                            style={{
                                marginTop: "20px",
                                padding: "20px",
                                color: "rgb(37, 22, 9)",
                                backgroundColor: "rgb(225, 179, 137)",
                                borderRadius: "5px",     
                                wordWrap: "break-word",

                            }}
                        >
                            <h4>Output array</h4>
                            <p>{this.displayString()}</p>
                        </div>
                    )}
        </div>
    </div>
      
      );
  }
}

export default MapEditor;
