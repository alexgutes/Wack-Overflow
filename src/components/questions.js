import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/question';
import { Link } from 'react-router-dom';
import './questions.css';
import moment from 'moment';

export class Questions extends Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  render() {
    return (
      <div className="container">
        <ul className="flex-header">
          <li className="heading">
            <h5 id="questions-header">Top Questions</h5>
          </li>
          <li>
            <Link className="u-pull-right" id="ask-button" to="/ask">
              <button className="button-primary" id="ask">
                Ask
              </button>
            </Link>
          </li>
        </ul>

        <div className="question-list">
          <ul>{this.props.questions.reverse()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const questionList = state.questions.questions.map((question, index) => {
    return (
      <li key={index} className="question">
        <div className="row">
          <h5>{question.title}</h5>
        </div>
        <p>{question.content}</p>
        <div className="row asked-by">
          <p>
            <span id="asked">asked {moment(question.createdAt).fromNow()}</span>
            <span className="link-color"> {question.userId.username}</span>
          </p>
        </div>
      </li>
    );
  });
  return {
    questions: questionList
  };
};

export default connect(mapStateToProps)(Questions);
