import React, { Component } from "react";
import PostList from "../containers/PostList";

class FrontPage extends Component {
    render() {
        return (
            <div className="FrontPage">
                <PostList />
            </div>
        );
    }
}

export default FrontPage;
