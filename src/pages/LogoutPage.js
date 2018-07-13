import React, { Component } from "react";
import PageContainer from "../containers/PageContainer";
import LogoutForm from "../containers/forms/LogoutForm";

class LogoutPage extends Component {
    render() {
        return (
            <PageContainer className="LogoutPage">
                <LogoutForm />
            </PageContainer>
        );
    }
}

export default LogoutPage;
