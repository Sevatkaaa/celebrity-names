import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import './App.css';

import Main from "./components/Main";
import Start from "./components/Start";
import CreateNewGame from "./components/CreateNewGame";
import JoinGame from "./components/JoinGame";
import JoinTeam from "./components/JoinTeam";

function App() {
  return (
      <div className="App global-page">
        <Router history={browserHistory}>
          <Route path="/" component={Main}/>
          <Route path="/start" component={Start}/>
          <Route path="/new-game" component={CreateNewGame}/>
          <Route path="/join-game" component={JoinGame}/>
          <Route path="/join-team" component={JoinTeam}/>
        </Router>
      </div>
  );
}

export default App;
