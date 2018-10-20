import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';

export function Header(props) {
  let show;
  if (props.currentUser) {
    show = (
      <React.Fragment>
        <button
          onClick={e => {
            props.dispatch(clearAuth());
            window.location = '/';
          }}
        >
          Logout
        </button>
        <Link to="/ask">Ask</Link>
      </React.Fragment>
    );
  } else {
    show = (
      //add listner to sign up
      <React.Fragment>
        <button>Sign Up</button>
      </React.Fragment>
    );
  }
  return (
    <header>
      <h1>Wack Overflow</h1>
      <input type="text" placeholder="...search" />
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>

      {show}
      <hr />
    </header>
  );
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Header);
