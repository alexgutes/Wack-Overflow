import React from 'react';
import { connect } from 'react-redux';

import './css/skeleton.css';
import { Route, withRouter } from 'react-router-dom';
import Header from './components/Header';
import AskQuestion from './components/AskQuestion';
import Questions from './components/Questions';
import RegistrationForm from './components/RegistrationForm';
import ShowQuestion from './components/ShowQuestion';
import { refreshAuthToken } from './actions/auth';
import Home from './components/Home';
import LoginPage from './components/LoginPage';

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
          <Route exact path="/questions/:id" component={ShowQuestion} />

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationForm} />
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
});

export default withRouter(connect(mapStateToProps)(App));
