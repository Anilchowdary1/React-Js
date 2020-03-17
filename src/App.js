import React from "react";
import './App.css';
import TodoList from './components/todoList';
import CountryList from './components/CountryList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}
from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div >
        <nav>
          <ul className="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todoslist">Todos List</Link>
            </li>
            <li>
              <Link to="/countrylist">Country List</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/todoslist">
            <Todoslist />
          </Route>
          <Route path="/countrylist">
            <CountryList />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Todoslist() {
  return <TodoList />;
}

function CountryList() {
  return <CountryList />;
}
