import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Comment from "../../components/comment/Comment";
import { commentVote } from "../../state/actions";
import "./css/CommentList.css";

class CommentList extends Component {
    handleVote = data => {
        if (!this.props.isAuthed) {
            console.log("need to be logged in");
            return;
        }
        this.props.commentVote(data.commentId, data.voteFlag);
    };

    render() {
        const { comments } = this.props;
        if (comments.length === 0) {
            return <div />;
        }

        return (
            <div className={"CommentList " + this.props.className}>
                <div className="comments">
                    {comments.map((comment, i) => {
                        return (
                            <div key={comment.id}>
                                <Comment
                                    comment={comment}
                                    onCommentVote={this.handleVote}
                                    isAuthed={this.props.isAuthed}
                                />
                                <ConnectedCommentList
                                    comments={comment.children}
                                    className="reply"
                                />
                            </div>
                        );
                    })}
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
        commentVote: (commentId, dir) => dispatch(commentVote(commentId, dir))
    };
};

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    commentVote: PropTypes.func.isRequired,
    className: PropTypes.string
};

const ConnectedCommentList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);

export default ConnectedCommentList;
