import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PageContainer from "../containers/PageContainer";
import NewPostForm from "../containers/NewPostForm";
import { createPost } from "../state/actions";

class NewPostPage extends Component {
    constructor() {
        super();
        this.state = {
            newPost: true
        };
    }
    handleSubmit = values => {
        this.setState({
            newPost: false
        });
        this.props.createPost(values);
    };
    render() {
        let redirect;
        if (!this.props.isAuthed) {
            redirect = <Redirect to="/" />;
        }
        if (!this.state.newPost && this.props.isSuccessful) {
            redirect = <Redirect to="/" />;
        }
        return (
            <PageContainer className="NewPostPage">
                {redirect}
                <NewPostForm onSubmit={this.handleSubmit} />
            </PageContainer>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createPost: data => dispatch(createPost(data))
    };
};

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        loading: state.post.loading,
        isSuccessful: state.post.success,
        postData: state.post.post,
        error: state.post.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPostPage);
