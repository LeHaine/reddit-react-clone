import React, { Component } from "react";
import PropTypes from "prop-types";
import { allowNull } from "../../utils/PropTypesUtils";
import { connect } from "react-redux";
import DetailedPost from "../../components/post/DetailedPost";
import CommentForm from "../forms/CommentForm";
import CommentListContainer from "../comment/CommentListContainer";
import { postVote, fetchPost, comment } from "../../state/actions";

class DetailedPostView extends Component {
    handleVote = data => {
        if (!this.props.isAuthed) {
            console.log("need to be logged in");
            return;
        }
        this.props.postVote(data.postId, data.voteFlag);
    };

    handleCommentSubmit = values => {
        this.props.replyPost(this.props.post.id, values.comment.text);
        window.location.reload();
    };

    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPost(postId);
    }

    render() {
        if (this.props.loading) {
            return <div>Loading...</div>;
        }
        const { post } = this.props;
        if (!this.props.loading && !post) {
            return <div>404</div>;
        }
        let commentForm;
        if (this.props.isAuthed) {
            commentForm = <CommentForm onSubmit={this.handleCommentSubmit} />;
        }
        return (
            <div className="DetailedPostView">
                <DetailedPost
                    post={post}
                    onPostVote={this.handleVote}
                    isAuthed={this.props.isAuthed}
                />
                {commentForm}
                <CommentListContainer postId={post.id} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        loading: state.fetch.post.loading,
        post: state.fetch.post.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postVote: (postId, dir) => dispatch(postVote(postId, dir)),
        fetchPost: postId => dispatch(fetchPost(postId)),
        replyPost: (postId, text) => dispatch(comment(postId, text, "post"))
    };
};

DetailedPostView.propTypes = {
    match: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    post: allowNull(PropTypes.object.isRequired),
    postVote: PropTypes.func.isRequired,
    replyPost: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedPostView);
