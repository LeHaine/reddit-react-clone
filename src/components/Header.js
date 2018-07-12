import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        let loginLink = <Link to="/login">Login</Link>;
        let signupLink = <Link to="/signup">Sign up</Link>;
        let authHeather;
        if (this.props.isAuthed) {
            loginLink = <Link to="/logout">Logout</Link>;
            signupLink = null;
            authHeather = (
                <div>
                    <Link to="/submit">New Post</Link>
                    {" - "}
                    <Link to={"/u/" + this.props.username}>
                        {this.props.username}
                    </Link>
                </div>
            );
        }

        return (
            <div>
                <Link to="/">Front page</Link>
                {" - "}
                {loginLink}
                {" - "}
                {signupLink}
                {authHeather}
            </div>
        );
    }
}

export default Header;
