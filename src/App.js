import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TVShowsList from './TVShowsList';
import TVShowDetails from './TVShowDetails';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <TVShowsList />
          </Route>
          <Route path="/shows/:id">
            <TVShowDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
