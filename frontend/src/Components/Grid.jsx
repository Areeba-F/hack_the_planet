import React from "react";

const Grid = ({ data, onCellClick }) => {
  return (

    // for each row
    <div
      style={{
        display: "grid",
        // get length for the number of columns 
        gridTemplateColumns: `repeat(${data[0].length}, 50px)`,
        gap: "2px",
      }}>
      
        {data.map((row, rowIndex) => (
        <div 
            key={rowIndex}>
              {row.map((rgb, colIndex) => {
                // convert from 1 to 255 to display colour
                const r = rgb[0] * 255;
                const g = rgb[1] * 255;
                const b = rgb[2] * 255;
                
                // for each cell in a row
                return (
                  <div
                  // TODO: weirdly tranposes the grid 
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => onCellClick(rowIndex, colIndex)}
                    style={{
                      width: "50px",
                      height: "50px",
                      // get colour from [rbg[0], rbg[1], rbg[2]]
                      backgroundColor: `rgb(${r}, ${g}, ${b})`,
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                  ></div>
                );
              })}
        </div>
      ))}
    </div>
  );
};
export default Grid;
