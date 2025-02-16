import React from 'react';
import axios from 'axios';
import TerrainInput from './TerrainInput';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NumericInput from 'react-numeric-input';
import styles from "./PromptForm.css"

class PromptForm extends React.Component {
  state = {
    prompt: "",
    size: 7,
    terrains: {
      'red': '',
      'green': '',
      'blue':  '',
      'yellow': '',
      'cyan' : '',
      'magenta' : '',
      'white': '',
      'colourless': ''
    }
  };
  
  handleChangePromptDescription = (event) => {
    this.setState({ prompt: event.target.value });
  };

  handleChangeBoardSize = (value) => {
    this.setState({ size: value });
  };

  handleChangeTerrain = (colour, event) => {
    if (this.state.terrains[colour] !== undefined) {
      // update state for colour that was changed
      this.state.terrains[colour] = event.target.value;
    } else {
      console.log("colour", colour, "not present in terrains dict");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post('http://localhost:8000/maps/submit_prompt_form/', this.state
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
        });
  };

  numericFormat = (stringValue) => {
    return stringValue.replace(/\D/, "");
  };

  render() {
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
