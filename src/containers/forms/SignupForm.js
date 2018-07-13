import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

const required = value => (value ? "" : "Required");
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : "";
const maxLength15 = maxLength(15);

const passwordMatches = (value, allValues) =>
    value !== allValues.password ? "Passwords don't match" : "";

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

class SignupForm extends Component {
    render() {
        return (
            <form
                className={this.props.className}
                onSubmit={this.props.handleSubmit}
            >
                <Field
                    name="username"
                    type="text"
                    component={renderField}
                    label="Username"
                    validate={[required, maxLength15]}
                />
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Password"
                    validate={[required, maxLength15]}
                />
                <Field
                    name="verify-password"
                    type="password"
                    component={renderField}
                    label="Reenter password"
                    validate={[required, passwordMatches, maxLength15]}
                />
                <div>
                    <button type="submit" disabled={this.props.submitting}>
                        Submit
                    </button>
                    <button
                        type="button"
                        disabled={this.props.pristine || this.props.submitting}
                        onClick={this.props.reset}
                    >
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: "SignUpForm"
})(SignupForm);
