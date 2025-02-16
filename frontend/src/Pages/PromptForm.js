import React from 'react';
import axios from 'axios';
import TerrainInput from '../TerrainInput';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NumericInput from 'react-numeric-input';
import styles from "./PromptForm.css"
import { MapContext } from '../MapContext';

import { Navigate } from 'react-router-dom';

class PromptForm extends React.Component {
  static contextType = MapContext;

  state = {
    prompt: "",
    prompt_size: 7,
    prompt_terrains: {
      'red': '',
      'green': '',
      'blue':  '',
      'yellow': '',
      'cyan' : '',
      'magenta' : '',
      'white': '',
      'colourless': ''
    },
    navigateToEditor: false
  };
  
  handleChangePromptDescription = (event) => {
    this.setState({ prompt: event.target.value });
    
  };

  handleChangeBoardSize = (value) => {
    this.setState({ prompt_size: value });
  };

  handleChangeTerrain = (colour, event) => {
    if (this.state.prompt_terrains[colour] !== undefined) {
      // update state for colour that was changed
      this.state.prompt_terrains[colour] = event.target.value;
    } else {
      console.log("colour", colour, "not present in terrains dict");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post('http://localhost:8000/maps/submit_prompt_form/', {
          prompt: this.state.prompt,
          size: this.state.prompt_size,
          terrains: this.state.prompt_terrains
        }
        )
        .then((res) => {
            console.log(res.data);

            if (res.data.success) {
              this.context.setGrid(res.data.grid); // set grid to be used by editor
              console.log('Set new grid in app context.')
              this.setState({ navigateToEditor: true }); // When clicked, change to editor page
            } else {
              alert('Map generation failed :( Try revising your description and terrain types.')
            }
            
        });
  };

  numericFormat = (stringValue) => {
    return stringValue.replace(/\D/, "");
  };

  render() {
    // navigate to editor page
    if (this.state.navigateToEditor) {
      return <Navigate to="/editor" />;
    }
    return(
      <div id='prompt-form'>
        <form onSubmit={this.handleSubmit}>

          <div style={{marginBottom: 20, marginTop: 50}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth
                  label="Room Description" id="prompt-input"
                  onChange={this.handleChangePromptDescription}
                  multiline={true}
                />
              </Grid>

              <Grid item xs={2}>
                <label for='size-input'>Map Size</label>
              </Grid>
              <Grid item xs={10}>
                <NumericInput
                  name='size-input'
                  min={7} max={21}
                  defaultValue={7}
                  onChange={this.handleChangeBoardSize}
                  format={this.numericFormat}
                  className={'size-input'}
                />
              </Grid>  

              <TerrainInput colour={'red'} onChange={this.handleChangeTerrain}/>
              <TerrainInput colour={'green'} onChange={this.handleChangeTerrain}/>
              <TerrainInput colour={'blue'} onChange={this.handleChangeTerrain}/>
              <TerrainInput colour={'yellow'} onChange={this.handleChangeTerrain}/>
              <TerrainInput colour={'cyan'} onChange={this.handleChangeTerrain}/>
              <TerrainInput colour={'magenta'} onChange={this.handleChangeTerrain}/>
              <TerrainInput colour={'white'} onChange={this.handleChangeTerrain}/>
              <TerrainInput colour={'colourless'} onChange={this.handleChangeTerrain}/>
            </Grid>
          </div>

          <Grid item xs={12}>
            <Button variant="contained"
              type='submit'>
                Generate Map
            </Button>
          </Grid>

        </form>


      </div>
      );
    }
}

export default PromptForm;
