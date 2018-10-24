import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';

import './App.css';
import './css/skeleton.css';
import Header from './components/header';
import AskQuestion from './components/ask-question';
import Questions from './components/questions';
import LoginForm from './components/login-form';
import RegistrationForm from './components/registration-form';
import { refreshAuthToken } from './actions/auth';
import Home from './components/home';
import { Route, withRouter } from 'react-router-dom';
import LoginPage from './components/login-page';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/ask" component={AskQuestion} />
          <Route exact path="/questions" component={Questions} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationForm} />
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
