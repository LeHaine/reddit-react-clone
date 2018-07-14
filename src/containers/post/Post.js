import React, { Component } from "react";
import PropTypes from "prop-types";
import { determinePostLink } from "../../utils/LinkUtils";
import VoteButton from "../../components/VoteButton";
import "./css/Post.css";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteFlag: this.props.post.voteFlag,
            votes: this.props.post.grossVotes
        };
    }

    handleVote = dir => {
        if (!this.props.isAuthed) {
            console.log("need to be loged in");
            return;
        }
        let flag = dir;
        let diff = flag;
        if (flag === this.state.voteFlag) {
            flag = 0;
            diff = flag - dir;
        }
        this.setState({ voteFlag: flag, votes: this.state.votes + diff });
        this.props.onPostVote({ postId: this.props.post.id, voteFlag: flag });
    };

    render() {
        const post = this.props.post;
        return (
            <div className="Post">
                <div className="vote">
                    <VoteButton
                        arrow="up"
                        onVote={() => this.handleVote(1)}
                        selected={this.state.voteFlag > 0 ? true : false}
                    />
                    <span className="karma">{this.state.votes}</span>
                    <VoteButton
                        arrow="down"
                        onVote={() => this.handleVote(-1)}
                        selected={this.state.voteFlag < 0 ? true : false}
                    />
                </div>
                <div className="thumb">
                    <i className="fas fa-list" />
                </div>
                <div className="body">
                    <div className="title">
                        <a href={determinePostLink(post)}>{post.title}</a>
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
                        <a href={determinePostLink(post)}>
                            <i className="fas fa-comment" />
                            {post.totalComments} comments
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
Post.propTypes = {
    post: PropTypes.object.isRequired,
    onPostVote: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired
};

export default Post;
