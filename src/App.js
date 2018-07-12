import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import FrontPage from "./pages/FrontPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={FrontPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage} />
                <Route path="/signup" component={SignupPage} />
            </div>
        );
    }
}

export default App;
