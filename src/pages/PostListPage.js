import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PageContainer from "../containers/PageContainer";
import FrontPageContainer from "../containers/FrontPageContainer";
import DetailedPostView from "../containers/post/DetailedPostView";

class PostListPage extends Component {
    render() {
        return (
            <PageContainer className="PostListPage">
                <Switch>
                    <Route exact path="/" component={FrontPageContainer} />
                    <Route
                        path="/r/:sub/comments/:id"
                        component={DetailedPostView}
                    />
                </Switch>
            </PageContainer>
        );
    }
}

export default PostListPage;
