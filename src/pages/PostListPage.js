import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PageContainer from "../containers/PageContainer";
import FrontPageContainer from "../containers/FrontPageContainer";
import PostView from "../containers/PostView";

class PostListPage extends Component {
    render() {
        return (
            <PageContainer className="PostListPage">
                <Switch>
                    <Route exact path="/" component={FrontPageContainer} />
                    <Route path="/r/:sub/comments/:id" component={PostView} />
                </Switch>
            </PageContainer>
        );
    }
}

export default PostListPage;
