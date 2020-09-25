import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";

const Router = () => (

	<BrowserRouter>
		<Switch>
			<Route exact path="" component={Dashboard}/>
		</Switch>
	</BrowserRouter>

);
export default Router;