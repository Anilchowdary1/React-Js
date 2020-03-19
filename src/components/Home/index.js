import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/todoslist">Todos App</Link>
                        </li>
                        <li>
                            <Link to="/countrylist">Country List</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Home;