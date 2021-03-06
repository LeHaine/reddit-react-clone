import React, { Component } from "react";
import PageContainer from "../containers/PageContainer";
import LoginForm from "../containers/forms/LoginForm";

class LoginPage extends Component {
    render() {
        return (
            <PageContainer className="LoginPage">
                <LoginForm />
            </PageContainer>
        );
    }
}

export default LoginPage;
