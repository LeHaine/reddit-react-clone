import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

const required = value => (value ? "" : "Required");

const inputField = ({
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
                ((error && <span className="error">{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

class NewSubForm extends Component {
    render() {
        return (
            <form
                className={this.props.className}
                onSubmit={this.props.handleSubmit}
            >
                <Field
                    name="name"
                    type="text"
                    component={inputField}
                    label="Name"
                    validate={[required]}
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
    form: "NewSubForm"
})(NewSubForm);
