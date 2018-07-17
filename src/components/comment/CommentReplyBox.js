import React, { Component } from "react";
import PropTypes from "prop-types";
import "./css/CommentReplyBox.css";

class CommentReplyBox extends Component {
    constructor() {
        super();
        this.state = { content: "", valid: false };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.onReplyComment(this.state.content);
    };

    handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        if (value.length === 0) {
            this.setState({ valid: false });
        } else {
            this.setState({ valid: true });
        }
    };
    render() {
        return (
            <div className="CommentReplyBox">
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        name="content"
                        onChange={this.handleInput}
                        cols="50"
                        rows="5"
                    />
                    <br />
                    <button disabled={!this.state.valid} type="submit">
                        Submit
                    </button>
                    <button onClick={this.props.onCancelComment}>Cancel</button>
                </form>
            </div>
        );
    }
}

CommentReplyBox.propTypes = {
    onCancelComment: PropTypes.func.isRequired,
    onReplyComment: PropTypes.func.isRequired
};

export default CommentReplyBox;
