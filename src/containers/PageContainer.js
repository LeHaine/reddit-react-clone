import React, { Component } from "react";
import { connect } from "react-redux";
import Page from "../components/Page";

class PageContainer extends Component {
    render() {
        return (
            <Page
                className={this.props.className}
                isAuthed={this.props.isAuthed}
            >
                {this.props.children}
            </Page>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed
    };
};

export default connect(mapStateToProps)(PageContainer);
