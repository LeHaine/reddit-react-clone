import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Page from "../components/Page";

class PageContainer extends Component {
    render() {
        return (
            <Page
                className={this.props.className}
                isAuthed={this.props.isAuthed}
                username={this.props.username}
            >
                {this.props.children}
            </Page>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        username: state.auth.username
    };
};

PageContainer.propTypes = {
    className: PropTypes.string,
    isAuthed: PropTypes.bool.isRequired,
    username: PropTypes.string,
    children: PropTypes.node
};

export default connect(mapStateToProps)(PageContainer);
