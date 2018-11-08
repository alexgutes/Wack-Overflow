import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleQuestion, postAnswer } from '../actions/question';
import moment from 'moment';
import { reduxForm, Field } from 'redux-form';
import './show-question.css';

export class ShowQuestion extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleQuestion(this.props.match.params.id));
  }
  onSubmit(values) {
    // pass values and token?
    return this.props
      .dispatch(postAnswer(values.body, this.props.question._id))
      .then(() => this.componentDidMount());
  }

  render() {
    //TODO add if statement to handle answers undefined
    let answerList = <p>No answers yet</p>;
    if (this.props.question.answers && this.props.question.answers.length > 0) {
      answerList = this.props.question.answers.map((answer, index) => {
        return (
          <li key={index} className="answer">
            <div className="row">
              <p>{answer.content}</p>
            </div>
            <div className="row asked-by">
              <p>
                <span id="asked">
                  answered {moment(answer.createdAt).fromNow()}
                </span>
                <span className="link-color"> {answer.userId.username}</span>
              </p>
            </div>
          </li>
        );
      });
    }
    return (
      <div className="container content">
        <header>
          <h3 className="question-header">{this.props.question.title}</h3>
        </header>
        <p>{this.props.question.content}</p>
        <h5 className="answer-header">Answers</h5>
        <section>{answerList}</section>
        <form
          onSubmit={this.props.handleSubmit(values => {
            this.onSubmit(values);
          })}
        >
          <label>Your Answer</label>
          <Field
            className="u-full-width"
            name="body"
            id="body"
            type="text"
            component="textarea"
            label="body"
          />
          <button className="button-primary" type="submit">
            Post Your Answer
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.questions.question
  };
};
ShowQuestion = connect(mapStateToProps)(ShowQuestion);
export default reduxForm({
  form: 'answerQuestion'
})(ShowQuestion);
