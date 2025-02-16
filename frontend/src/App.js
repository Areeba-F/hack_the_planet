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
    }

    componentDidMount() {

        let data ;

        axios.get('http://localhost:8000/wel/')
        .then(res => {
            data = res.data;
            this.setState({
                details : data    
            });
        })
        .catch(err => {})

      }

  render() {
    return(
      <div>
          aaaa
            {this.state.details.map((detail, id) =>  (
            <div key={id}>
            <div >
                  <div >
                        <h1>{detail.detail} </h1>
                        <footer >--- by
                        <cite title="Source Title">
                        {detail.name}</cite>
                        </footer>
                  </div>
            </div>
            </div>
            )
        )}

      <Grid data={this.state.gridData} />
      </div>
      
      );
  }
}

export default App;
