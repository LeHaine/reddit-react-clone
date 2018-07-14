import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

const required = value => (value ? "" : "Required");
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : "";
const maxLength40000 = maxLength(40000);

const textAreaField = ({ label, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <textarea placeholder={label} rows="10" />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

class CommentForm extends Component {
    render() {
        return (
            <form
                className={this.props.className}
                onSubmit={this.props.onCommentSubmit}
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

export default reduxForm({
    form: "CommentForm"
})(CommentForm);
