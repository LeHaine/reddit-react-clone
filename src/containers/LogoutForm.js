import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../state/actions";

class LogoutForm extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        let redirect;

        if (!this.props.isAuthed) {
            redirect = <Redirect to="/" />;
        }
        return (
            <div className="LogoutForm">
                {redirect}
                Logging out
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutForm);
