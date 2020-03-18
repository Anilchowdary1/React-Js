import React from "react";
import TodoList from './../todoList';
import CountryList from './../CountryList';
import CovidGraph from './../CovidGraphs';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}
from "react-router-dom";

class Home extends React.Component{
    render(){
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
                <li>
                    <Link to="/covidgraph">Covid Graph</Link>
                </li>
                </ul>
            </nav>
    
            <Switch>
                <Route exact path={`/todoslist`}>
                <Todoslist />
                </Route>
                <Route exact path={`/countrylist`}>
                <CountrysList />
                </Route>
                <Route exact path={`/covidgraph`}>
                <CovidGraphs/>
                </Route>
                <Route path="/">
                <Heading/>
                </Route>
            </Switch>
            </div>
        </Router>
        
        );
    }
}

function Heading(){
    return <h1>Home</h1>;
}
    function CountrysList(){
        return <CountryList />;
    }
      
      function Todoslist() {
        return <TodoList />;
        //return <h1>TodoList</h1>
      }
      
    function CovidGraphs() {
          return <CovidGraphs />;
    }
export default Home;