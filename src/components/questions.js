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
      <section className="container">
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
        <div className="question-list">
          <hr />
          <ul>{this.props.questions.reverse()}</ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const questionList = state.questions.questions.map((question, index) => {
    return (
      <li key={index}>
        <div className="row">
          <h3>{question.title}</h3>
        </div>
        <p>{question.content}</p>
        <div className="row asked-by">
          <p>
            <span id="asked">asked {moment(question.createdAt).fromNow()}</span>
            <a href="#"> {question.userId.username}</a>
          </p>
        </div>
        <hr />
      </li>
    );
  });
  return {
    questions: questionList
  };
};

export default connect(mapStateToProps)(Questions);
