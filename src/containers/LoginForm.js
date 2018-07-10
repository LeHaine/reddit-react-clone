import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../state/actions";

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        if (username.length === 0 || password.length === 0) {
            this.setState({ error: "You must enter a username and password" });
        } else {
            this.setState({ error: "" });
            this.props.login(username, password);
        }
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        let loggedIn;
        let errorMessage;
        if (this.props.isAuthed) {
            loggedIn = <Redirect to="/" />;
        }

        if (this.state.error.length !== 0) {
            errorMessage = <span className="error">{this.state.error}</span>;
        }
        if (this.props.authError) {
            errorMessage = (
                <span className="error">Invalid username or password</span>
            );
        }
        return (
            <div className="LoginForm">
                {loggedIn}
                {errorMessage}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="username">Username: </label>
                    <br />
                    <input
                        id="username"
                        type="text"
                        value={this.state.username}
                        onChange={e => this.onChange(e)}
                    />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <br />
                    <input
                        id="password"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.onChange(e)}
                    />
                    <br />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        authError: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
