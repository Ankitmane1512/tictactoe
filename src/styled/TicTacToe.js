import React from "react";
import { Layer, Line, Text } from "react-konva";

export const Board = ({ unit, size, rows }) => {
  let grid = [];
  let stroke = "black";
  let strokeWidth = 10;

  for (let i = 1; i < rows; i++) {
    let position = unit * i;
    //Vertical Line
    grid.push(
      <Line
        points={[position, 0, position, size]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        key={i + "v"}
      />
    );

    //Horizontal line
    grid.push(
      <Line
        points={[0, position, size, position]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        key={i + "h"}
      />
    );
  }

  return <Layer>{grid}</Layer>;
};

export const Squares = ({
  unit,
  coordinates,
  gameState,
  win,
  gameOver,
  yourTurn,
  ownMark,
  move
}) => {
  let squares = coordinates.map((position, index) => {
    let makeMove = move;
    let mark = gameState[index];
    let fill = "black";
    //if you win , then squares turn red
    if (win && win.includes(index)) {
      fill = "red";
    }
    //player should not aloowed to select when game is over ,
    if (gameOver || !yourTurn || mark) {
      makeMove = () => console.log("Game Over");
    }
    return (
      <Text
        key={index}
        index={index}
        x={position[0]}
        y={position[1]}
        fontSize={unit}
        width={unit}
        text={mark}
        fill={fill}
        fontFamily={"Helvetica"}
        align={"center"}
        onClick={event => {
          let index = event.target.index;
          makeMove(index, ownMark);
        }}
        onTap={event => {
          let index = event.target.index;
          makeMove(index, ownMark);
        }}
      />
    );
  });

  return <Layer>{squares}</Layer>;
};
