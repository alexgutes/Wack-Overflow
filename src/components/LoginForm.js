import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import emoji from 'emoji-dictionary';
import Input from './Input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';
import './styles/login-form.css';

class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }
    return (
      <div className="outer-div">
        <div className=" login-form-container">
          <h1>Login </h1>
          <span className="emoji u-pull-right">{emoji.getUnicode('lock')}</span>
          <form
            className="login-form"
            onSubmit={this.props.handleSubmit(
              values => this.onSubmit(values)
              // window.location = '/';
            )}
          >
            {error}
            <label htmlFor="username">Username</label>
            <Field
              component={Input}
              type="text"
              name="username"
              id="username"
              validate={[required, nonEmpty]}
            />
            <label htmlFor="password">Password</label>
            <Field
              component={Input}
              type="password"
              name="password"
              id="password"
              validate={[required, nonEmpty]}
            />
            <button
              className="button-primary"
              disabled={this.props.pristine || this.props.submitting}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const LoginFormConnected = connect(state => ({
  currentUser: state.auth.currentUser,
}))(LoginForm);

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginFormConnected);
