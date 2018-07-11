import React, { Component } from "react";
import PageContainer from "../containers/PageContainer";
import PostList from "../containers/PostList";

class FrontPage extends Component {
    render() {
        return (
            <PageContainer className="FrontPage">
                <PostList />
            </PageContainer>
        );
    }
}

export default FrontPage;
