import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../index/index';

import Mobx from '../mobx/index';

class App extends React.Component{
	render(){
		return (
			<Router>
				<ul className="menu-box">
					<li className="menu">
						<Link to="/">Index</Link>
					</li>
					<li className="menu">
						<Link to="/new">New Todo</Link>
					</li>
					<li className="menu">
						<Link to="/mobx">mobx</Link>
					</li>
				</ul>
						
				<Route path="/" exact component={ Home } />
				{/* <Route path="/new" component={New} /> */}
				<Route path="/mobx" component={Mobx} />
			</Router>
		);
	}
}

export default App;
