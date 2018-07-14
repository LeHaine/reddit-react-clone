import React, { Component } from "react";
import PropTypes from "prop-types";
import VoteButton from "../../components/VoteButton";
import "./css/DetailedPost.css";

class DetailedPost extends Component {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.post !== null) {
            this.setState({
                voteFlag: nextProps.post.voteFlag,
                votes: nextProps.post.grossVotes
            });
        }
    }

    render() {
        const { post } = this.props;
        return (
            <div className="DetailedPost">
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
                        <span>{post.title}</span>
                    </div>
                    <div className="content">
                        <p className="text">{post.content}</p>
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
                        <i className="fas fa-comment" />
                        <span>{post.totalComments} comments</span>
                    </div>
                </div>
            </div>
        );
    }
}

DetailedPost.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
    onPostVote: PropTypes.func.isRequired
};

export default DetailedPost;
