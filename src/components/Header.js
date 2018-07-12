import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        let loginLink = <Link to="/login">Login</Link>;
        let signupLink = <Link to="/signup">Sign up</Link>;
        if (this.props.isAuthed) {
            loginLink = <Link to="/logout">Logout</Link>;
            signupLink = null;
        }
        return (
            <div>
                <Link to="/">Front page</Link>
                {" - "}
                {loginLink}
                {" - "}
                {signupLink}
            </div>
        );
    }
}

export default Header;
