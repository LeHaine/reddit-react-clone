import React, { Component } from "react";
import PropTypes from "prop-types";
import { allowNull } from "../../utils/PropTypesUtils";
import { connect } from "react-redux";
import ScrollDetector from "../../components/ScrollDetector";
import DetailedPost from "../../components/post/DetailedPost";
import { vote, fetchPost } from "../../state/actions";

class DetailedPostView extends Component {
    handleScroll = bottomReached => {
        if (bottomReached) {
            console.log("need to load more comments");
        }
    };

    handleVote = data => {
        if (!this.props.isAuthed) {
            console.log("need to be logged in");
            return;
        }
        this.props.vote(data.postId, data.voteFlag);
    };

    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPost(postId);
    }

    render() {
        if (this.props.loading) {
            return <div>Loading...</div>;
        }
        const post = this.props.post;
        if (!this.props.loading && !post) {
            return <div>404</div>;
        }
        return (
            <ScrollDetector
                className="DetailedPostView"
                onPageScroll={this.handleScroll}
            >
                <DetailedPost
                    post={post}
                    onPostVote={this.handleVote}
                    isAuthed={this.props.isAuthed}
                />
            </ScrollDetector>
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
        vote: (postId, dir) => dispatch(vote(postId, dir)),
        fetchPost: postId => dispatch(fetchPost(postId))
    };
};

DetailedPostView.propTypes = {
    match: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    post: allowNull(PropTypes.object.isRequired),
    vote: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedPostView);
