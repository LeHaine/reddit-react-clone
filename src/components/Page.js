import React, { Component } from "react";
import Header from "./Header";

class Page extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <Header
                    isAuthed={this.props.isAuthed}
                    username={this.props.username}
                />
                {this.props.children}
            </div>
        );
    }
}

export default Page;
