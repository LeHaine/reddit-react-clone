import React, { Component } from "react";
import VoteButton from "../components/VoteButton";
import "./css/Post.css";

class Post extends Component {
    constructor() {
        super();
        this.state = {
            upvoted: false,
            downvoted: false
        };
    }
    handleUpvote = () => {
        const upvoted = !this.state.upvoted;
        const downvoted = this.state.downvoted;
        let diff = 0;
        if (upvoted) {
            diff = 1;
            if (downvoted) {
                diff = 2;
            }
        } else {
            diff = -1;
        }
        this.props.post.grossVotes += diff;
        this.setState({ upvoted: !this.state.upvoted, downvoted: false });
    };

    handleDownvote = () => {
        const upvoted = this.state.upvoted;
        const downvoted = !this.state.downvoted;
        let diff = 0;
        if (downvoted) {
            diff = -1;
            if (upvoted) {
                diff = -2;
            }
        } else {
            diff = 1;
        }
        this.props.post.grossVotes += diff;
        this.setState({ upvoted: false, downvoted: !this.state.downvoted });
    };
    render() {
        const post = this.props.post;
        return (
            <div className="Post">
                <div className="vote">
                    <VoteButton
                        arrow="up"
                        onVote={this.handleUpvote}
                        selected={this.state.upvoted}
                    />
                    <span className="karma">{post.grossVotes}</span>
                    <VoteButton
                        arrow="down"
                        onVote={this.handleDownvote}
                        selected={this.state.downvoted}
                    />
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
                            <a href={"/r/" + post.sub.name}>
                                r/{post.sub.name}
                            </a>{" "}
                            - Posted by{" "}
                            <a href={"/u/" + post.account.username}>
                                u/{post.account.username}
                            </a>
                        </span>
                    </div>
                    <div className="comments">
                        <a href={"comments/" + post.id + "/" + post.title}>
                            <i className="fas fa-comment" />## comments
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
