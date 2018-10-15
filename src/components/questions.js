import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/question';

export class Questions extends Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  render() {
    return <ul className='questions'>{this.props.questions}</ul>;
  }
}

const mapStateToProps = state => {
  const questionList = state.questions.map((question, index) => {
    return (
      <li key={index}>
        <h3>{question.title}</h3>
        <p>{question.body}</p>
        <hr />
      </li>
    );
  });
  return {
    questions: questionList
  };
};

export default connect(mapStateToProps)(Questions);
