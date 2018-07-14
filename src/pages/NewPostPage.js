import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { determinePostLink } from "../utils/LinkUtils";
import PageContainer from "../containers/PageContainer";
import NewPostForm from "../containers/forms/NewPostForm";
import { createPost } from "../state/actions";

class NewPostPage extends Component {
    constructor() {
        super();
        this.state = {
            newPost: true
        };
    }
    handleSubmit = values => {
        console.log(values);
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
            redirect = <Redirect to={determinePostLink(this.props.post)} />;
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
        loading: state.post.post.loading,
        isSuccessful: state.post.post.success,
        post: state.post.post.data,
        error: state.post.post.error
    };
};

NewPostPage.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired,
    isSuccessful: PropTypes.bool.isRequired,
    post: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPostPage);
