import React, { Component } from "react";
import PostList from "../containers/PostList";

class FrontPageContainer extends Component {
    render() {
        return (
            <div className="FrontPageContainer">
                <PostList />
            </div>
        );
    }
}

export default FrontPageContainer;
