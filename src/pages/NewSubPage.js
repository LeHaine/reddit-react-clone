import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PageContainer from "../containers/PageContainer";
import NewSubForm from "../containers/forms/NewSubForm";
import { createSub } from "../state/actions";

class NewSubPage extends Component {
    constructor() {
        super();
        this.state = {
            newSub: true
        };
    }
    handleSubmit = values => {
        this.setState({ newSub: false });
        this.props.createSub(values);
    };

    render() {
        let redirect;
        if (!this.props.isAuthed) {
            redirect = <Redirect to="/" />;
        }
        if (!this.state.newSub && this.props.isSuccessful) {
            redirect = <Redirect to={"/r/" + this.props.sub.name} />;
        }
        return (
            <PageContainer className="NewSubPage">
                {redirect}
                <NewSubForm onSubmit={this.handleSubmit} />
            </PageContainer>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSub: data => dispatch(createSub(data))
    };
};

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        sub: state.post.sub.data,
        loading: state.post.sub.loading,
        isSuccessful: state.post.sub.success,
        error: state.post.sub.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewSubPage);
