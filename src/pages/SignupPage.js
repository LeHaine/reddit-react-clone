import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PageContainer from "../containers/PageContainer";
import SignupForm from "../containers/forms/SignupForm";
import { signup } from "../state/actions";

class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            newSignup: true
        };
    }
    handleSubmit = values => {
        this.setState({ newSignup: false });
        this.props.signup(values);
    };

    render() {
        let redirect;
        if (this.props.isAuthed) {
            redirect = <Redirect to="/" />;
        }
        if (!this.state.newSignup && this.props.isSuccessful) {
            redirect = <Redirect to="/login" />;
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
        loading: state.post.signup.loading,
        isSuccessful: state.post.signup.success,
        error: state.post.signup.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupPage);
