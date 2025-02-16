import { React, useState, createContext } from "react";

// Create a Context Provider
const defaultVal = {
    grid: [
        [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 1]], 
        [[1, 1, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]], 
        [[1, 1, 1], [0, 0, 0], [1, 1, 1], [1, 1, 1]], 
        [[1, 1, 1], [0, 0, 0], [1, 1, 1], [1, 1, 1]],
    ],
    size: 4,
    terrains: {
      'red': '',
      'green': '',
      'blue':  '',
      'yellow': '',
      'cyan' : '',
      'magenta' : '',
      'white': '',
      'colourless': ''
}}

export const MapContext = createContext(defaultVal);