import './App.css';

import { useEffect, useState } from 'react';

import GameBoard from './components/Board';
import Button from './components/button';
import { moveMapIn2048Rule } from './functions/2048rule';
import { assignRandomValue } from './functions/assignrandvalue';
import { check128, checkfail } from './functions/check';
import { resetboard } from './functions/resetboard';

function App() {
  const [state, setState] = useState<state>({
    map: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    isFail: false,
    isSuccess: false,
    isContinue: false,
    reset: true,
    keydirection: undefined,
    score: 0,
  });

  const initialize = () => {
    let map2048 = resetboard(state.map, state.reset).map2048;
    if (state.reset) {
      map2048 = assignRandomValue(assignRandomValue(map2048).map2048).map2048;
      setState({
        ...state,
        map: map2048,
        reset: resetboard(state.map, state.reset).reset,
        isFail: false,
        isSuccess: false,
        isContinue: false,
        keydirection: undefined,
        score: 0,
      });
    }
  };

  useEffect(() => {
    initialize();
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (state.isFail || state.isSuccess || state.reset) return;
    let map = state.map;
    let direction: Direction | undefined;
    let score = state.score;
    let m;
    switch (e.key) {
      case 'ArrowUp':
        direction = 'up';
        m = moveMapIn2048Rule(state.map, direction);
        map = m.result;
        score += m.score;
        if (m.isMoved) map = assignRandomValue(map).map2048;
        break;
      case 'ArrowLeft':
        direction = 'left';
        m = moveMapIn2048Rule(state.map, direction);
        map = m.result;
        score += m.score;
        if (m.isMoved) map = assignRandomValue(map).map2048;
        break;
      case 'ArrowRight':
        direction = 'right';
        m = moveMapIn2048Rule(state.map, direction);
        map = m.result;
        score += m.score;
        if (m.isMoved) map = assignRandomValue(map).map2048;
        break;
      case 'ArrowDown':
        direction = 'down';
        m = moveMapIn2048Rule(state.map, direction);
        map = m.result;
        score += m.score;
        if (m.isMoved) map = assignRandomValue(map).map2048;
        break;
      default:
        direction = undefined;
        return;
    }
    setState({ ...state, keydirection: direction, map: map, score: score });
  };

  const checkGameEnd = () => {
    if (!state.isContinue && !state.isSuccess && check128(state.map)) {
      setState({
        ...state,
        isSuccess: true,
      });
    }

    if (!state.isFail && checkfail(state.map)) {
      setState({
        ...state,
        isFail: true,
      });
    }
  };

  useEffect(() => {
    checkGameEnd();
  });

  return (
    <>
      <div className="game-title">2048 GAME</div>
      <br />
      <div className="container">
        <Button
          text="New Game"
          onClick={() => {
            setState({ ...state, reset: true });
          }}
        />
        <div className="score">
          <span className="style-text">score</span>
          <span className="style-num">{state.score}</span>
        </div>
      </div>
      <br />
      <GameBoard map2048={state.map} />
      {state.isFail && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="message">Game Over!</div>
            <button
              className="button2"
              onClick={() => {
                setState({ ...state, isFail: false, reset: true });
              }}
            >
              Try Again!
            </button>
          </div>
        </div>
      )}
      {state.isSuccess && !state.isContinue && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="message">Reached 128</div>
            <div className="button-container">
              <button
                className="button2"
                onClick={() => {
                  setState({
                    ...state,
                    isSuccess: false,
                    isContinue: true,
                    isFail: false,
                  });
                }}
              >
                Go on
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
type Cell = number | null;

type state = {
  map: Cell[][];
  isFail: boolean;
  isSuccess: boolean;
  isContinue: boolean;
  reset: boolean;
  keydirection: Direction | undefined;
  score: number;
};
type Direction = 'up' | 'left' | 'right' | 'down';
export default App;
