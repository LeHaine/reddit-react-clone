import React, { Component } from "react";
import Thread from "./components/Thread";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Thread />
                <Thread />
                <Thread />
                <Thread />
            </div>
        );
    }
}

export default App;
