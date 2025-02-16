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
        // get colour from [rbg[0], rbg[1], rbg[2]]
        const backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

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
