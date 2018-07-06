import React, { Component } from "react";
import "../css/Thread.css";

export const NONE = "NONE";
export const UPVOTED = "UPVOTED";
export const DOWNVOTED = "DOWNVOTED";

class Thread extends Component {
    constructor() {
        super();
        this.state = {
            userAction: NONE
        };
    }
    render() {
        let upvote = "upvote";
        let downvote = "downvote";
        if (this.state.userAction === UPVOTED) {
            upvote = "upvote-selected";
        } else if (this.state.userAction === DOWNVOTED) {
            downvote = "downvote-selected";
        }
        return (
            <div className="Thread">
                <div className="vote">
                    <button>
                        <i className={upvote + " fas fa-arrow-up"} />
                    </button>
                    <span className="karma">100</span>
                    <button>
                        <i className={downvote + " fas fa-arrow-down"} />
                    </button>
                </div>
                <div className="thumb">
                    <i className="fas fa-list" />
                </div>
                <div className="body">
                    <div className="title">
                        <a href="#">Thread title</a>
                    </div>
                    <div className="author">
                        <span>
                            <a href="#">r/sub</a> - Posted by{" "}
                            <a href="#">u/user</a>
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
