import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PageContainer from "../containers/PageContainer";
import SignupForm from "../containers/SignupForm";
import { signup } from "../state/actions";

class SignupPage extends Component {
    handleSubmit = values => {
        this.props.signup(values);
        this.props.history.push("/");
    };
    render() {
        let redirect;
        if (this.props.isAuthed) {
            redirect = <Redirect to="/" />;
        }
        return (
            <PageContainer className="SignupPage">
                {redirect}
                <SignupForm onSubmit={this.handleSubmit} />
            </PageContainer>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: creds => dispatch(signup(creds))
    };
};

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        loading: state.signup.loading,
        error: state.signup.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupPage);
