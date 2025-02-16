import React from 'react';
import { MapContext } from './MapContext';
import PromptForm from './Pages/PromptForm';
import MapEditor from './Pages/MapEditor';
import {Routes, Route} from 'react-router-dom'

class App extends React.Component {

    // default values for context
    state = {
        grid: [
            [[0, 0, 0], [0, 0, 0], [0, 0, 0], [1, 1, 1]], 
            [[1, 1, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]], 
            [[1, 1, 1], [0, 0, 0], [1, 1, 1], [1, 1, 1]], 
            [[1, 1, 1], [0, 0, 0], [1, 1, 1], [1, 1, 1]],
        ],
        setGrid: (new_grid) => {
            this.setState({ grid: new_grid })
        },
        mapEditorUpdated: false, // want to update editor once when new map loaded
    };

    setGrid = (new_grid) => {
        this.setState({ grid: new_grid });
    };    

  render() {
    return(
        <>
        <MapContext.Provider value={this.state}>
            <Routes>
                <Route path= "" element ={<PromptForm/>}/>
                <Route path= "/editor" element ={<MapEditor/>}/>
            </Routes>
        </MapContext.Provider>  
    </>
      );
    }
}

export default App;
