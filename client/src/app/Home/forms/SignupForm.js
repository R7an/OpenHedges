import React from "react";
import { reduxForm, Field } from "redux-form";
import PasswordValidator from "password-validator";
import emailValidator from "email-validator";

const passwordSchema = new PasswordValidator();

passwordSchema.is().min(6);

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = "Please enter your email.";
    } else if (!emailValidator.validate(values.email)) {
        errors.email = "Please enter a correct email address.";
    }
    if (!values.firstName) {
        errors.firstName = 'Please enter your full name.';
    }
    if (!values.lastName) {
        errors.lastName = 'Please enter your full name.';
    }
    if (!values.password) {
        errors.password = "Please enter a password.";
    } else if (!passwordSchema.validate(values.password)) {
        errors.password = "Password is too short, minimum is 6 characters.";
    }
    return errors;
};

const createRenderer = render => ({ input, meta, label, type, ...rest }) => (
    <label className={meta.error && meta.touched ? "error" : ""}>
        <div className="popover-label">
            {label}
            {render(input, label, type, rest)}
        </div>{" "}

        {meta.error &&
            meta.touched && <span className="meta-error">{meta.error}</span>}
    </label>
);

const RenderInput = createRenderer((input, label, type) =>
    <input {...input} placeholder={label} type={type} className="pt-input" />
)
const RenderRadio = createRenderer((input, label) =>
    <input {...input} placeholder={label} type='radio' className="pt-input" />
)
const RenderSelect = createRenderer((input, label, type, { children }) =>
    <select {...input} >
        {children}
    </select>
)


let SignupForm = ({ handleSubmit, submitting }) => (
    <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <div className="pt-label-container">
            <Field name="email" label="Email" component={RenderInput} />
            <Field name="firstName" label="First Name" component={RenderInput} />
            <Field name="lastName" label="Last Name" component={RenderInput} />
            <Field name="username" label="Username" component={RenderInput} />
            <Field name="password" type="password" label="Password" component={RenderInput} />
            <Field name="stateOfResidence" label="State of Residence" component={RenderSelect} >
                <option />
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </Field>
            <Field name="userAgreement" label="I agree to the User Agreement and Privacy Policy." component={RenderRadio} />
            <button type="submit" disabled={submitting} className="button button-primary">Continue Application</button>
        </div>
        <button
            type="submit"
            disabled={submitting}
            className="button button-primary"
        >
            Submit
        </button>
    </form>
);

SignupForm = reduxForm({
    form: 'signupForm',
    destroyOnUnmount: false,
    validate,
})(SignupForm);

export default SignupForm;