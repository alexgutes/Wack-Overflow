import { reduxForm, Field } from 'redux-form';
import { API_BASE_URL } from '../config';
import { postQuestion, fetchQuestions } from '../actions/question';

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
    // const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Ask A Question</h1>
        <form
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <Field
            name="title"
            id="title"
            type="text"
            component="input"
            label="title"
          />
          <Field
            name="body"
            id="body"
            type="text"
            component="textarea"
            label="body"
          />
          <button type="submit">Ask Question</button>
        </form>
        <hr />
      </div>
    );
  }
}

export default reduxForm({
  form: 'askQuestion'
})(AskQuestion);
