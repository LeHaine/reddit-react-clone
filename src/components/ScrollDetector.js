import React, { Component } from "react";
import PropTypes from "prop-types";

class ScrollDetector extends Component {
    handleScroll = () => {
        const windowHeight =
            "innerHeight" in window
                ? window.innerHeight
                : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.props.onPageScroll(true);
        } else {
            this.props.onPageScroll(false);
        }
    };
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        return <div className={this.className}>{this.props.children}</div>;
    }
}

ScrollDetector.propTypes = {
    onPageScroll: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node
};

export default ScrollDetector;
