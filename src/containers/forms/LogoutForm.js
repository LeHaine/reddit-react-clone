import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../state/actions";

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

LogoutForm.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutForm);
