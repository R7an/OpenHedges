import React from 'react';
import { reduxForm, Field } from 'redux-form'

const validate = (values) => {
    const errors = {};
    if (!values.country) {
        errors.country = 'Please enter a country.';
    } 
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Please enter a phone number.'
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

let SignUpForm2 = ({handleSubmit, submitting }) =>
    // <form style={{ textAlign: "center" }} onSubmit={handleSubmit()}>
    <form style={{ textAlign: "center" }}>
        <div className="pt-label-container">
            <Field name="country" label="Country" component={RenderInput} />
            <Field name="phoneNumber" label="Phone Number" component={RenderInput} />
            <button type="submit" disabled={submitting} className="button button-primary">Submit Application</button>
        </div>
    </form>

SignUpForm2 = reduxForm({
    form: 'signUpForm2',
    destroyOnUnmount: false,
    validate,
})(SignUpForm2);

export default SignUpForm2;