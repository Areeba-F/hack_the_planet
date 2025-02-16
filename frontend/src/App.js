import React from 'react';
import { MapContext } from './MapContext';
import PromptForm from './PromptForm';
import MapEditor from './MapEditor';

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
            <PromptForm />
            <MapEditor />
        </MapContext.Provider>  
    </>
      );
    }
}

export default App;
