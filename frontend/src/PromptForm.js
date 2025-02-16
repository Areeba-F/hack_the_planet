import React from 'react';
import axios from 'axios';
import TerrainInput from './TerrainInput';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class PromptForm extends React.Component {
  state = {
    prompt: "",
  };
  
  handleChange = (event) => {
    this.setState({ prompt: event.target.value });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post('http://localhost:8000/maps/submit_prompt_form/', {
            prompt: this.state.prompt
          }
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
        });
  };

  render() {
    return(
      <div id='prompt-form'>
        <form onSubmit={this.handleSubmit}>
          <br/>
          <br/>

          <div>
            <Grid container spacing={2}>
              <TextField fullWidth
                label="Room Description" id="prompt-input"
                onchange={this.handleChange}
                multiline={true}
              />

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
        
          <Button variant="contained"
            type='submit'>
              Generate Map
          </Button>
        </form>


      </div>
      );
    }
}

export default PromptForm;
