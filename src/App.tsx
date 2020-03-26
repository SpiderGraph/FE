import React, { FunctionComponent } from 'react';
// styles
import './App.css';
// components
import Graph from './components/graph/Graph';
import { Route, Switch, Router } from 'react-router-dom';
import GraphsPage from './components/pages/GraphsPage';
import CreateGraphPage from './components/pages/CreateGraphPage';
import NavBar from './components/navbar/NavBar';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      {/* <Graph /> */}
      <NavBar/>
      <Switch>
        <Route exact path="/" component={GraphsPage} />
        <Route path="/create-graph" component={CreateGraphPage} />
      </Switch>
    </div>
  );
}

export default App;
