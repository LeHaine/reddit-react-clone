import React, { Component } from "react";
import ThreadList from "./containers/ThreadList";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <ThreadList />
            </div>
        );
    }
}

export default App;
