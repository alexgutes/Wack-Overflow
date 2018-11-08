import { reduxForm, Field } from 'redux-form';
import { postQuestion } from '../actions/question';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './ask-question.css';

import React from 'react';

//TODO: Convert to redux with action/reducer
export class AskQuestion extends React.Component {
  onSubmit(values) {
    // pass values and token?
    return this.props
      .dispatch(postQuestion(values.title, values.body))
      .then(() => (window.location = '/'));
  }
  render() {
    // const currentUser = this.props.currentUser.username;
    // const { handleSubmit } = this.props;
    if (!this.props.currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="two-thirds column">
          <h5>Ask A Question</h5>
          <form
            onSubmit={this.props.handleSubmit(values => {
              this.onSubmit(values);
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
        <div className="one-third column">
          <div className="u-full-width border">
            <h5>How To Ask</h5>
            <p>
              <b>Is your question about programming?</b>
            </p>
            <p>We prefer questions that can be answered, not just discussed.</p>
            <p>Provide details. Share your research.</p>
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
