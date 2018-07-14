import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Post from "../../components/post/Post";
import { vote } from "../../state/actions";
import "./css/PostList.css";

class PostList extends Component {
    handleVote = data => {
        if (!this.props.isAuthed) {
            console.log("need to be logged in");
            return;
        }
        this.props.vote(data.postId, data.voteFlag);
    };

    render() {
        const { posts } = this.props;
        return (
            <div className="PostList">
                <div className="posts">
                    {posts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onPostVote={this.handleVote}
                            isAuthed={this.props.isAuthed}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        vote: (postId, dir) => dispatch(vote(postId, dir))
    };
};

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    vote: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
