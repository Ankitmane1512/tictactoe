import React, { Component } from "react";
import { Stage } from "react-konva";
import { Board, Squares } from "../styled/TicTacToe";

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8]
    ];
  }

  state = {
    rows: 3,
    gameState: new Array(9).fill(false),
    ownMark: "X",
    otherMark: "O",
    gameOver: false,
    yourTurn: true,
    winner: false,
    win: false
  };

  //Method
  componentWillMount() {
    ///when component mounts
    let height = window.innerHeight;
    let width = window.innerWidth;
    let size = height < width ? height * 0.8 : width * 0.8;
    let rows = this.state.rows;
    let unit = size / rows;
    let coordinates = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < rows; x++) {
        coordinates.push([x * unit, y * unit]);
      }
    }

    this.setState({
      size,
      rows,
      unit,
      coordinates
    });
  }

  //Function
  move = (index, marker) => {
    this.setState((prevState, prop) => {
      let { gameOver, gameState, yourTurn, winner } = prevState;

      yourTurn = !yourTurn;

      // console.log(gameState);
      gameState.splice(index, 1, marker);

      //foundwin is an array of winning Combination for eg[1,4,7]
      let foundwin = this.winChecker(gameState);
      //console.log(foundwin);

      if (foundwin) {
        //winner conatins mark i.e X or O
        winner = gameState[foundwin[0]];
      }
      //if there is win or no more square left
      if (foundwin || !gameState.includes(false)) {
        gameOver = true;
      }

      //if not your turn and game is not over  then make Ai move
      if (!yourTurn && !gameOver) {
        this.makeAiMove(gameState);
      }

      return {
        yourTurn,
        gameState,
        gameOver,
        win: foundwin || false,
        winner
      };
    });
  };

  makeAiMove = gameState => {
    let otherMark = this.state.otherMark;
    let openSquares = [];
    gameState.forEach((square, index) => {
      if (!square) {
        openSquares.push(index);
      }
    });
    let aiMove = openSquares[this.random(0, openSquares.length)];

    setTimeout(() => {
      this.move(aiMove, otherMark);
    }, 2000);
  };

  random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  winChecker = gameState => {
    let combos = this.combos;
    return combos.find(combo => {
      let [a, b, c] = combo;

      //mark is checked for winning
      return (
        gameState[a] === gameState[b] &&
        gameState[b] === gameState[c] &&
        gameState[a]
      );
    });
  };

  render() {
    let {
      size,
      unit,
      rows,
      coordinates,
      gameState,
      win,
      gameOver,
      ownMark,
      yourTurn
    } = this.state;
    return (
      <div>
        <Stage width={size} height={size}>
          <Board unit={unit} rows={rows} size={size} />
          <Squares
            unit={unit}
            coordinates={coordinates}
            gameState={gameState}
            win={win}
            gameOver={gameOver}
            yourTurn={yourTurn}
            ownMark={ownMark}
            move={this.move}
          />
        </Stage>
      </div>
    );
  }
}

export default TicTacToe;
