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
  };
  
  handleChangePromptDescription = (event) => {
    this.setState({ prompt: event.target.value });
  };

  handleChangeBoardSize = (value) => {
    this.setState({ size: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post('http://localhost:8000/maps/submit_prompt_form/', {
            prompt: this.state.prompt,
            size: this.state.size
          }
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

              <TerrainInput colour={'red'}/>
              <TerrainInput colour={'green'}/>
              <TerrainInput colour={'blue'}/>
              <TerrainInput colour={'yellow'}/>
              <TerrainInput colour={'cyan'}/>
              <TerrainInput colour={'magenta'}/>
              <TerrainInput colour={'white'}/>
              <TerrainInput colour={'colourless'}/>
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
