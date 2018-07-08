import React, { Component } from "react";
import "../css/Thread.css";

const UserAction = {
    none: "none",
    upvoted: "upvoted",
    downvoted: "downvoted"
};

const Arrow = {
    up: "up",
    down: "down"
};

class Thread extends Component {
    constructor() {
        super();
        this.state = {
            userAction: UserAction.none
        };
        this.handleVote = this.handleVote.bind(this);
    }

    handleVote = arrow => {
        if (arrow === Arrow.up) {
            if (
                this.state.userAction === UserAction.none ||
                this.state.userAction === UserAction.downvoted
            ) {
                this.setState({ userAction: UserAction.upvoted });
            } else {
                this.setState({ userAction: UserAction.none });
            }
        } else if (arrow === Arrow.down) {
            if (
                this.state.userAction === UserAction.none ||
                this.state.userAction === UserAction.upvoted
            ) {
                this.setState({ userAction: UserAction.downvoted });
            } else {
                this.setState({ userAction: UserAction.none });
            }
        }
    };
    render() {
        const thread = this.props.thread;

        let upvote = "upvote";
        let downvote = "downvote";
        if (this.state.userAction === UserAction.upvoted) {
            upvote = "upvote-selected";
        } else if (this.state.userAction === UserAction.downvoted) {
            downvote = "downvote-selected";
        }
        return (
            <div className="Thread">
                <div className="vote">
                    <button onClick={() => this.handleVote(Arrow.up)}>
                        <i className={upvote + " fas fa-arrow-up"} />
                    </button>
                    <span className="karma">
                        {thread.upvotes - thread.downvotes}
                    </span>
                    <button onClick={() => this.handleVote(Arrow.down)}>
                        <i className={downvote + " fas fa-arrow-down"} />
                    </button>
                </div>
                <div className="thumb">
                    <i className="fas fa-list" />
                </div>
                <div className="body">
                    <div className="title">
                        <a href="#">{thread.title}</a>
                    </div>
                    <div className="author">
                        <span>
                            <a href="#">r/{thread.sub}</a> - Posted by{" "}
                            <a href="#">u/{thread.user.username}</a>
                        </span>
                    </div>
                    <div className="comments">
                        <button>
                            <i className="fas fa-comment" />
                            <span className="description">## comments</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Thread;
