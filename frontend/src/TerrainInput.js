import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { rgbToHex } from '@mui/material';


class TerrainInput extends React.Component {
  handleChange = (value) => {
    this.props.onChange(this.props.colour, value);
  };

  render() {

    const colour = this.props.colour;
    var name = 'terrain-'.concat(colour);

    return(
        <>
        <Grid item xs={2} 

          style = {{background: "url('https://www.freeiconspng.com/uploads/wood-sign-png-images--pictures-becuo-10.png') no-repeat center center", 
            backgroundSize: "contain",
            textAlign: "center", 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 

          }}>
            <label  
            style = {{fontSize: "1.2rem",
                      color: "rgb(84, 42, 15)",
                      textShadow: "6px solid rgb(0, 0, 0)"}}
                    for={name}>{colour}</label>
        </Grid>
        <Grid item xs={4}
          style= {{borderBottom: "1px solid rgb(217, 177, 147)",
                  borderRadius: "0px",}}>
            <TextField
                id={name}
                name={name}
                label={colour.concat(' terrain')}
                multiline={false}
                fullWidth={true}
                onChange={this.handleChange}
                InputProps={{
                  style: { color: "rgb(225, 179, 137)",
                   } 
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                      color: "rgb(225, 179, 137)",
                      fontFamily: "initial",
                      fontWeight: "bold",
                      "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(225, 179, 137)",
                          borderWidth: "1px",
                      },
                  },
                  
                  "& .MuiInputLabel-outlined": {
                      color: "rgb(225, 179, 137)",
                      fontFamily: "initial",
                      fontWeight: "bold",
                  },
                }}
            />
        </Grid>
        </>
      );
    }
}

export default TerrainInput;
