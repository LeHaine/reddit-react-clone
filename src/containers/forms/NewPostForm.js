import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, propTypes } from "redux-form";

const required = value => (value ? "" : "Required");
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : "";
const maxLength15 = maxLength(15);
const maxLength40000 = maxLength(40000);

const inputField = ({ label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input placeholder={label} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

inputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object
};

const textAreaField = ({ label, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea placeholder={label} rows="10" />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

textAreaField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object
};

class NewPostForm extends Component {
    render() {
        return (
            <form
                className={this.props.className}
                onSubmit={this.props.handleSubmit}
            >
                <Field
                    name="title"
                    type="text"
                    component={inputField}
                    label="Title"
                    validate={[required]}
                />
                <label>Type</label> <br />
                <Field name="type" component="select">
                    <option value="self">Self</option>
                </Field>
                <Field
                    name="content"
                    type="text"
                    component={textAreaField}
                    label="Content"
                    validate={[maxLength40000]}
                />
                <Field
                    name="sub.name"
                    component={inputField}
                    label="Sub"
                    validate={[required, maxLength15]}
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

NewPostForm.propTypes = {
    ...propTypes,
    className: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: "NewPostForm"
})(NewPostForm);
