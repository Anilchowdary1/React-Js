// import React from "react";

// import Home from "./components/Home";

// export default function App() {
  
//     return(<Home/>);
// }

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
}
from "react-router-dom";
import './App.css';

import TodoList from './components/todoList';
import Home from './components/Home';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

function App() {
  return (
  <Router>
  <Switch>
    <Route path="/todoslist">
      <TodoList />
    </Route>
    <Route exact path="/countrylist/details/:id">
      <CountryDetails />
    </Route>
    <Route path="/countrylist">
      <CountryList />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
  </Router>
  );
}

export default App;