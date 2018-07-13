import React, { Component } from "react";
import { connect } from "react-redux";
import VoteButton from "../components/VoteButton";
import { vote, fetchPost } from "../state/actions";
import "./css/PostView.css";

class PostView extends Component {
    constructor() {
        super();
        this.state = {
            voteFlag: 0,
            votes: 0
        };
    }
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPost(postId);
    }

    handleVote = dir => {
        if (!this.props.isAuthed) {
            console.log("You need to login");
            return;
        }
        let flag = dir;
        let diff = dir;
        if (flag === this.state.voteFlag) {
            flag = 0;
            diff = flag - dir;
        }
        this.setState({ voteFlag: flag, votes: this.state.votes + diff });
        this.props.vote(this.props.post.id, flag);
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
        if (this.props.loading) {
            return <div>Loading...</div>;
        }
        const post = this.props.post;
        if (!this.props.loading && !post) {
            return <div>404</div>;
        }
        return (
            <div className="PostView">
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
                        <span>## comments</span>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        loading: state.fetch.post.loading,
        post: state.fetch.post.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        vote: (postId, dir) => dispatch(vote(postId, dir)),
        fetchPost: postId => dispatch(fetchPost(postId))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView);
