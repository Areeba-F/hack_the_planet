import React from 'react';
import axios from 'axios';
import TerrainInput from './TerrainInput';

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
      <div>
          Prompt:
          <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="input-prompt"
            onChange={this.handleChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>

            <TerrainInput colour={'red'}/>
            <TerrainInput colour={'green'}/>
            <TerrainInput colour={'blue'}/>
            <TerrainInput colour={'yellow'}/>
            <TerrainInput colour={'cyan'}/>
            <TerrainInput colour={'magenta'}/>
            <TerrainInput colour={'white'}/>
            <TerrainInput colour={'none'}/>

          <button type="submit">Submit</button>
          </form>


      </div>
      );
    }
}

export default PromptForm;
