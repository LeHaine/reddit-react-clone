import React, { Component } from "react";
import PropTypes from "prop-types";
import VoteButton from "../VoteButton";
import "./css/Comment.css";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteFlag: this.props.comment.voteFlag,
            votes: this.props.comment.grossVotes
        };
    }

    handleVote = dir => {
        if (!this.props.isAuthed) {
            console.log("need to be logged in");
            return;
        }
        let flag = dir;
        let diff = flag;
        if (flag === this.state.voteFlag) {
            flag = 0;
            diff = flag - dir;
        }
        this.setState({ voteFlag: flag, votes: this.state.votes + diff });
        this.props.onCommentVote({
            commentId: this.props.comment.id,
            voteFlag: flag
        });
    };
    render() {
        const { comment } = this.props;
        return (
            <div className="Comment">
                <div className="vote">
                    <VoteButton
                        arrow="up"
                        onVote={() => this.handleVote(1)}
                        selected={this.state.voteFlag > 0 ? true : false}
                    />
                    <VoteButton
                        arrow="down"
                        onVote={() => this.handleVote(-1)}
                        selected={this.state.voteFlag < 0 ? true : false}
                    />
                </div>
                <div className="body">
                    <div className="details">
                        <span>
                            <a href={"/u/" + comment.account.username}>
                                {comment.account.username}
                            </a>
                        </span>
                        {"  -  "}
                        <span className="karma">{this.state.votes}</span>
                        {"  -  "}
                        <span className="time">X hour ago</span>
                    </div>
                    <div className="content">
                        <p className="text">{comment.text}</p>
                    </div>
                    <div className="actions">
                        Reply - Share - Report - Save - Give Gold
                    </div>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onCommentVote: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired
};

export default Comment;
