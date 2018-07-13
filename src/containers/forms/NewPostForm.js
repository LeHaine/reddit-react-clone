import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

const required = value => (value ? "" : "Required");
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : "";
const maxLength15 = maxLength(15);
const maxLength40000 = maxLength(40000);

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

const textAreaField = ({ input, label, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea {...input} placeholder={label} rows="10" />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

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

export default reduxForm({
    form: "NewPostForm"
})(NewPostForm);
