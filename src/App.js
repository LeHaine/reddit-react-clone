import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import PostList from "./containers/PostList";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Route exact path="/" component={PostList} />
                <Route path="/login" component={LoginForm} />
            </div>
        );
    }
}

export default App;
