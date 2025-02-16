import React from 'react';
import axios from 'axios';

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
          <button type="submit">Submit</button>
          </form>


      </div>
      );
    }
}

export default PromptForm;
