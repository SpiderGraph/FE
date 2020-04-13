import React, { FunctionComponent } from 'react';
// styles
import './App.scss';
// components
import { Route, Switch, Router } from 'react-router-dom';
import GraphsPage from './components/pages/GraphsPage';
import CreateGraphPage from './components/pages/CreateGraphPage';
import NavBar from './components/navbar/NavBar';
import Auth from './components/auth/Auth';
import PrivateRoute from './utils/PrivatRoute';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      {/* <Graph /> */}
      <NavBar/>
      <div className="container">
        <Switch>
          <PrivateRoute exact path="/">
            <GraphsPage />
          </PrivateRoute>
          <PrivateRoute path="/create-graph">
            <CreateGraphPage />
          </PrivateRoute>
          <PrivateRoute path="/edit-graph:id">
            <CreateGraphPage />
          </PrivateRoute>
          <Route path="/login"  render={props => <Auth {...props} formState={true} />}/>
          <Route path="/register" render={props => <Auth {...props} formState={false} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
