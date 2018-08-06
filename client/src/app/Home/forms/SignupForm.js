import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form'
import PasswordValidator from 'password-validator';
import emailValidator from 'email-validator';

const passwordSchema = new PasswordValidator();

passwordSchema
    .is().min(6);

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter your email.';
    } else if (!emailValidator.validate(values.email)) {
        errors.email = 'Please enter a correct email address.';
    }
    if (!values.fullName) {
        errors.fullName = 'Please enter your full name.';
    }
    if (!values.username) {
        errors.username = 'Please enter a username.';
    }
    if (!values.password) {
        errors.password = 'Please enter a password.';
    } else if (!passwordSchema.validate(values.password)) {
        errors.password = 'Password is too short, minimum is 6 characters.';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password by retyping it.';
    } else if (!(values.confirmPassword === values.password)) {
        errors.confirmPassword = 'The password you have entered does not match the one above.'
    }
    return errors;
};

const createRenderer = render => ({ input, meta, label, type, ...rest }) =>
    <label className={meta.error && meta.touched ? 'error' : ''}>
        <div style={{ "display": "flex" }}>
            <label style={{ "textAlign": "left" }}>{label}</label>
            {' '}
            {render(input, label, type, rest)}
        </div>
        {meta.error &&
            meta.touched &&
            <span style={{ "color": "red", "fontSize": "12px" }}>
                {meta.error}
            </span>}
    </label>

const RenderInput = createRenderer((input, label, type) =>
    <input {...input} placeholder={label} type={type} className="pt-input" />
)

let SignUpForm = ({ handleSubmit, submitting  }) =>
    <form style={{ textAlign: "center" }} onSubmit={handleSubmit(() =>console.log('dsdsdsd'))}>
        <div className="pt-label-container">
            <Field name="email" label="Email" component={RenderInput} />
            <Field name="fullName" label="Full Name" component={RenderInput} />
            <Field name="username" label="Username" component={RenderInput} />
            <Field name="password" type="password" label="Password" component={RenderInput} />
            <Field name="confirmPassword" type="password" label="Confirm Password" component={RenderInput} />
            <button type="submit" disabled={submitting} className="button button-primary">Submit</button>
        </div>
    </form>

SignUpForm = reduxForm({
    form: 'signUpForm',
    destroyOnUnmount: false,
    validate,
})(SignUpForm);

export default SignUpForm;