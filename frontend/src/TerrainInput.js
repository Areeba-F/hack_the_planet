import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';


class TerrainInput extends React.Component {
  render() {

    const { colour } = this.props;
    var name = 'terrain-'.concat(colour);

    return(
        <>
        <Grid item xs={2}>
            <label for={name}>{colour}</label>
        </Grid>
        <Grid item xs={4}>
            <TextField
                id={name}
                name={name}
                label={colour.concat(' terrain')}
                multiline={false}
                fullWidth={true}
            />
        </Grid>
        </>
      );
    }
}

export default TerrainInput;
