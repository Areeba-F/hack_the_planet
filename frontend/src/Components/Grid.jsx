import React from "react";

const Grid = ({ data }) => {
  return (

    // for each row
    <div
      style={{
        display: "grid",
        // get length for the number of columns 
        gridTemplateColumns: `repeat(${data[0].length}, 50px)`,
        gap: "2px",
      }}>
      
      {data.flat().map((rgb, index) => {
        // convert from 1 to 255 to display colour
        const r = rgb[0] * 255;
        const g = rgb[1] * 255;
        const b = rgb[2] * 255;

        // get colour from [rbg[0], rbg[1], rbg[2]]
        const backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // for each cell in a row
        return (
          <div
            key={index}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Grid;
