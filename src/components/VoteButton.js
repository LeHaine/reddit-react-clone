import React, { Component } from "react";
import PropTypes from "prop-types";
import "./css/VoteButton.css";

const Arrow = {
    up: "up",
    down: "down"
};

class VoteButton extends Component {
    render() {
        let arrowIcon;
        let selected;
        if (this.props.arrow === Arrow.up) {
            arrowIcon = "fa-arrow-up";
            if (this.props.selected) {
                selected = "upvote-selected";
            }
        } else if (this.props.arrow === Arrow.down) {
            arrowIcon = "fa-arrow-down";
            if (this.props.selected) {
                selected = "downvote-selected";
            }
        }
        return (
            <button className="VoteButton" onClick={() => this.props.onVote()}>
                <i className={selected + " fas " + arrowIcon} />
            </button>
        );
    }
}

VoteButton.propTypes = {
    arrow: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
};

export default VoteButton;
