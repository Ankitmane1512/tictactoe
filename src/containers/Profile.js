import React, { Component } from "react";
import {
  Container,
  Name,
  GameListHeader,
  GameList,
  GameRecord,
  ColumnLabels,
  Column
} from "../styled/Profile";

class Profile extends Component {
  static defaultProps = {
    user: {
      email: "testemail",
      games: [
        { winner: true, createdAt: "12/25/2018", id: "1" },
        { winner: true, createdAt: "12/26/2018", id: "2" },
        { winner: true, createdAt: "12/27/2018", id: "3" }
      ]
    }
  };

  get records() {
    return this.props.user.games.map((game, index) => {
      return (
        <GameRecord key={index} index={index}>
          <Column>{game.winner ? "WON" : "LOST"} </Column>
          <Column>"ROBOT"</Column>
          <Column>"NO"</Column>
          <Column>{game.createdAt}</Column>
        </GameRecord>
      );
    });
  }
  render() {
    let { email } = this.props.user;
    return (
      <Container>
        <Name>{email}</Name>
        <GameList>
          <GameListHeader>My Game</GameListHeader>
          <ColumnLabels>
            <Column>Outcome</Column>
            <Column>Guess</Column>
            <Column>Guessed Outcome</Column>
            <Column>Date</Column>
          </ColumnLabels>
          {this.records}
        </GameList>
      </Container>
    );
  }
}

export default Profile;
