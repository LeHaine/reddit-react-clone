import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PostListPage from "./pages/PostListPage";
import SignupPage from "./pages/SignupPage";
import NewPostPage from "./pages/NewPostPage";
import NewSubPage from "./pages/NewSubPage";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/logout" component={LogoutPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/submit" component={NewPostPage} />
                    <Route path="/community/create" component={NewSubPage} />
                    <Route exact path="/" component={PostListPage} />
                    <Route path="/r/:sub" component={PostListPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
