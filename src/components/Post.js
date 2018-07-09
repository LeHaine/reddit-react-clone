import React, { Component } from "react";
import "../css/Post.css";

const UserAction = {
    none: "none",
    upvoted: "upvoted",
    downvoted: "downvoted"
};

const Arrow = {
    up: "up",
    down: "down"
};

class Post extends Component {
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
        const post = this.props.post;

        let upvote = "upvote";
        let downvote = "downvote";
        if (this.state.userAction === UserAction.upvoted) {
            upvote = "upvote-selected";
        } else if (this.state.userAction === UserAction.downvoted) {
            downvote = "downvote-selected";
        }
        return (
            <div className="Post">
                <div className="vote">
                    <button onClick={() => this.handleVote(Arrow.up)}>
                        <i className={upvote + " fas fa-arrow-up"} />
                    </button>
                    <span className="karma">
                        {post.upvotes - post.downvotes}
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
                        <a href={post.id + "/" + post.title}>{post.title}</a>
                    </div>
                    <div className="author">
                        <span>
                            <a href={"/r/" + post.sub}>r/{post.sub}</a> - Posted
                            by{" "}
                            <a href={"/u/" + post.user.username}>
                                u/{post.user.username}
                            </a>
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

export default Post;
