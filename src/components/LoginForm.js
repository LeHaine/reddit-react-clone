import React, { Component } from "react";

class LoginForm extends Component {
    render() {
        return (
            <div className="LoginForm">
                <form>
                    <label htmlFor="username">Username: </label>
                    <br />
                    <input id="username" type="text" />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <br />
                    <input id="password" type="password" />
                    <br />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default LoginForm;
