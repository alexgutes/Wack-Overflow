import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/question';
import { Link } from 'react-router-dom';
import './questions.css';

export class Questions extends Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="two-thirds column">
            <h1 id="questions-header">Top Questions</h1>
          </div>
          <div className="one-third-column">
            <Link to="/ask">
              <button className="button-primary" id="ask">
                Ask
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="two-thirds column">
            <ul>{this.props.questions.reverse()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const questionList = state.questions.questions.map((question, index) => {
    return (
      <li key={index}>
        <h3>{question.title}</h3>
        <p>{question.content}</p>
        <p>
          Asked by...
          {question.userId.username}
        </p>
      </li>
    );
  });
  return {
    questions: questionList
  };
};

export default connect(mapStateToProps)(Questions);
