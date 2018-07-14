import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, propTypes } from "redux-form";

const required = value => (value ? "" : "Required");
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : "";
const maxLength40000 = maxLength(40000);

const textAreaField = ({ input, label, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <textarea {...input} placeholder={label} rows="10" />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

textAreaField.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object
};

class CommentForm extends Component {
    render() {
        return (
            <form
                className={this.props.className}
                onSubmit={this.props.handleSubmit}
            >
                <Field
                    name="comment.text"
                    type="text"
                    component={textAreaField}
                    label="Type a comment here."
                    validate={[required, maxLength40000]}
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

CommentForm.propTypes = {
    ...propTypes,
    className: PropTypes.string
};

export default reduxForm({
    form: "CommentForm"
})(CommentForm);
