import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        let loginLink = <Link to="/login">Login</Link>;
        if (this.props.isAuthed) {
            loginLink = <Link to="/logout">Logout</Link>;
        }
        return (
            <div>
                <Link to="/">Front page</Link>
                {" - "}
                {loginLink}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed
    };
};

export default connect(mapStateToProps)(Header);
