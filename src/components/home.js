import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from './RegistrationForm';
import Questions from './Questions';

class Home extends Component {
  render() {
    let show;
    if (!this.props.currentUser) {
      show = <RegistrationForm />;
    }
    return (
      <div>
        {show}
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(Home);
