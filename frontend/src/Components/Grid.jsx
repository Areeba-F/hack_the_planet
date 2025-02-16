import React from "react";
import { Grid2, Box } from "@mui/material";
import { styled } from "@mui/system";

const Cell = styled(Box)(({ theme }) => ({
  width: "50px",
  height: "50px",
  border: "1px solid black",
  cursor: "pointer",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  "&:hover": {
    opacity: 0.8,
    transform: "scale(1.05)",
  },
}));

const Grid = ({ data, onCellClick }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Grid2
        container
        spacing={0.9}
        // no longer weirdly tranposes grid
        direction="column"
        justifyContent="center"
        sx={{
          width: "fit-content",
        }}
      >
        
        {data.map((row, rowIndex) => (
          // for each row
          <Grid2
            item
            key={rowIndex}
            container
            spacing={0.9} 
            justifyContent="center"
            sx={{
              width: "fit-content", 
            }}
          >
            {row.map((rgb, colIndex) => {

              // convert from 1 to 255 to display colour
              const r = rgb[0] * 255;
              const g = rgb[1] * 255;
              const b = rgb[2] * 255;
              return (

                //for each cell
                <Grid2 item key={`${rowIndex}-${colIndex}`}>
                  <Cell
                    onClick={() => onCellClick(rowIndex, colIndex)}
                    style={{

                      // get colour from [rbg[0], rbg[1], rbg[2]]
                      backgroundColor: `rgb(${r}, ${g}, ${b})`,
                    }}
                  />
                </Grid2>
              );
            })}
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Grid;
