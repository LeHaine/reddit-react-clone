import React, { Component } from "react";
import { connect } from "react-redux";
import VoteButton from "../components/VoteButton";
import { vote } from "../state/actions";
import "./css/Post.css";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteFlag: this.props.post.voteFlag
        };
    }

    handleVote = dir => {
        if (!this.props.isAuthed) {
            console.log("You need to login");
            return;
        }
        let flag = dir;
        if (flag === this.state.voteFlag) {
            flag = 0;
        }
        this.setState({ voteFlag: flag });
        this.props.post.grossVotes += flag;
        this.props.vote(this.props.post.id, flag);
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
                    <span className="karma">{post.grossVotes}</span>
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
