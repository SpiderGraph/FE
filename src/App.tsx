import React, { FunctionComponent } from 'react';
// styles
import './App.scss';
// components
import { Route, Switch, Router } from 'react-router-dom';
import GraphsPage from './components/pages/GraphsPage';
import CreateGraphPage from './components/pages/CreateGraphPage';
import NavBar from './components/navbar/NavBar';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      {/* <Graph /> */}
      <NavBar/>
      <div className="container">
        <Switch>
          <Route exact path="/" component={GraphsPage} />
          <Route path="/create-graph" component={CreateGraphPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
