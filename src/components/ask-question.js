import { reduxForm, Field } from 'redux-form';
import { API_BASE_URL } from '../config';
import { postQuestion, fetchQuestions } from '../actions/question';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import React from 'react';

//TODO: Convert to redux with action/reducer
export class AskQuestion extends React.Component {
  onSubmit(values) {
    // pass values and token?
    console.log(values);
    return this.props
      .dispatch(postQuestion(values.title, values.body))
      .then(() => this.props.dispatch(fetchQuestions()));
  }
  render() {
    // const currentUser = this.props.currentUser.username;
    // const { handleSubmit } = this.props;
    if (!this.props.currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div>
            <h1>Ask A Question</h1>
          </div>
          <div>
            <form
              onSubmit={this.props.handleSubmit(values => {
                this.onSubmit(values);
                window.location = '/';
              })}
            >
              <label>Title</label>
              <Field
                className="u-full-width"
                name="title"
                id="title"
                type="text"
                component="input"
                label="title"
              />
              <label>Content</label>
              <Field
                className="u-full-width"
                name="body"
                id="body"
                type="text"
                component="textarea"
                label="body"
              />
              <button className="button-primary" type="submit">
                Ask Question
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const AskQuestionConnected = connect(state => {
  return {
    currentUser: state.auth.currentUser
  };
})(AskQuestion);

export default reduxForm({
  form: 'askQuestion'
})(AskQuestionConnected);
