import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import './App.css';

import Main from "./components/Main";
import Start from "./components/Start";
import CreateNewGame from "./components/CreateNewGame";
import JoinGame from "./components/JoinGame";
import JoinTeam from "./components/JoinTeam";
import GameCounter from "./components/GameCounter";
import GameWord from "./components/GameWord";
import GameNames from "./components/GameNames";
import GameWait from "./components/GameWait";

function App() {
  return (
      <div className="App global-page">
        <Router history={browserHistory}>
          <Route path="/" component={Main}/>
          <Route path="/start" component={Start}/>
          <Route path="/new-game" component={CreateNewGame}/>
          <Route path="/join-game" component={JoinGame}/>
          <Route path="/join-team" component={JoinTeam}/>
          <Route path="/game-counter" component={GameCounter}/>
          <Route path="/game-word" component={GameWord}/>
          <Route path="/game-names" component={GameNames}/>
          <Route path="/game-wait" component={GameWait}/>
        </Router>
      </div>
  );
}

export default App;
