import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
import './registration-form.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const passwordLength = length({ min: 4, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="landing">
        <div className="container">
          <div className="one-half column center">
            <span id="center">
              <h1>Welcome</h1>
              <p>Please create an account.</p>
              <p>
                After registering you will be able to ask a question to be
                answered by our knowledgeable programming community.
              </p>
              <p>
                You may also view questions that others have already asked, have
                a look!
              </p>
            </span>
          </div>
          <div className="one-half column ">
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
              )}
            >
              <label htmlFor="firstName">First name</label>
              <Field
                className="u-full-width"
                component={Input}
                type="text"
                name="firstName"
              />
              <label htmlFor="lastName">Last name</label>
              <Field component={Input} type="text" name="lastName" />
              <label htmlFor="username">Username</label>
              <Field
                component={Input}
                type="text"
                name="username"
                validate={[required, nonEmpty, isTrimmed]}
              />
              <label htmlFor="password">Password</label>
              <Field
                component={Input}
                type="password"
                name="password"
                validate={[required, passwordLength, isTrimmed]}
              />
              <label htmlFor="passwordConfirm">Confirm password</label>
              <Field
                component={Input}
                type="password"
                name="passwordConfirm"
                validate={[required, nonEmpty, matchesPassword]}
              />
              <button
                className="button-primary"
                id="border"
                type="submit"
                disabled={this.props.pristine || this.props.submitting}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const RegistrationFormConnected = connect(state => {
  return {
    currentUser: state.auth.currentUser
  };
})(RegistrationForm);

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationFormConnected);
