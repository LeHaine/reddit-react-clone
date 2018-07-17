import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Comment from "../../components/comment/Comment";
import { commentVote, comment as replyComment } from "../../state/actions";
import "./css/CommentList.css";

class CommentList extends Component {
    handleVote = data => {
        if (!this.props.isAuthed) {
            console.log("need to be logged in");
            return;
        }
        this.props.commentVote(data.commentId, data.voteFlag);
    };

    handleReply = (id, content) => {
        this.props.replyComment(id, content);
        window.location.reload();
    };

    render() {
        const { comments } = this.props;
        if (comments.length === 0) {
            return <div />;
        }

        return (
            <div className={"CommentList " + this.props.className}>
                <div className="comments">
                    {comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <Comment
                                    comment={comment}
                                    onCommentVote={this.handleVote}
                                    onReplyComment={this.handleReply}
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
        commentVote: (commentId, dir) => dispatch(commentVote(commentId, dir)),
        replyComment: (parentId, text) =>
            dispatch(replyComment(parentId, text, "comment"))
    };
};

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    commentVote: PropTypes.func.isRequired,
    replyComment: PropTypes.func.isRequired,
    className: PropTypes.string
};

const ConnectedCommentList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);

export default ConnectedCommentList;
