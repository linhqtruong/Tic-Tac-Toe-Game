import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "./GameBoard";
import xImage from "../images/x.png";
import oImage from "../images/o.png";
import { resetGameState, createNewGame } from "../redux/actionCreators";
import PieceChooser from "./PieceChooser";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
  }

  resetGame() {
    if (!this.props.isGameEnd) {
      this.props.resetGame();
    } else {
      clearTimeout(this.timeout);
      this.props.createNewGame();
    }
  }

  handleGameEnd() {
    this.timeout = setTimeout(this.props.createNewGame, 1500);
  }

  openSettings() {
  }

  render() {
    return (

      <div className="game-wrap">
      <div className = "center-display">
        <h1>TIC TAC TOE</h1>
      </div>
        <PieceChooser />
        <div className="status">
          <div className="status-o">
            <span className="win-counter">{this.props.oWinCounter} {this.props.oWinCounter < 2 ? 'win' : 'wins'}</span>
          </div>
          <div className="status-x">
            <span className="win-counter">{this.props.xWinCounter} {this.props.xWinCounter < 2 ? 'win' : 'wins'}</span>
          </div>
          <div className="status-d">
            <span className="win-counter">{this.props.drawCounter} {this.props.drawCounter < 2 ? 'draw' : 'draws'}</span>
          </div>
        </div>
        <Board onGameEnd={() => this.handleGameEnd()} />

        <div className="move-status-wrap">
          <div className="move-status">
            <span className={'x-move' + (this.props.isTurnX && !this.props.isGameEnd ? ' active' : '')}>
              <img src={xImage} alt="x" />
            </span>
            <span className={'o-move' + (!this.props.isTurnX && !this.props.isGameEnd ? ' active' : '')}>
              <img src={oImage} alt="o" />
            </span>
          </div>
        </div>

        <div className = "center-display">
          <button className="reset-button" onClick={() => this.resetGame()}>RESET</button>
        </div>
        <div className = "center-display">
          <a href={'https://linhtruong.com/'}>www.LinhTruong.com</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    xWinCounter: state.xWinCounter,
    oWinCounter: state.oWinCounter,
    drawCounter: state.drawCounter,
    isTurnX: state.isTurnX,
    isGameEnd: state.isGameEnd,
    isPvP: state.isPvP,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    resetGame: () => dispatch(resetGameState()),
    createNewGame: () => {
      dispatch(createNewGame());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);