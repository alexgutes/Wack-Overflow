import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import './header.css';

export function Header(props) {
  let show;
  if (props.currentUser) {
    show = (
      <li>
        <button
          onClick={e => {
            props.dispatch(clearAuth());
            window.location = '/';
          }}
        >
          Logout
        </button>
      </li>
    );
  } else {
    show = (
      //add listner to sign up
      <React.Fragment>
        <li>
          <Link className="top-btn" to="/login">
            <button>Log In</button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <button className="top-btn button-primary">Sign Up</button>
          </Link>
        </li>
      </React.Fragment>
    );
  }
  return (
    <header className="main-header">
      <div className="container">
        <ul className="header">
          <li className="logo">
            <Link id="home-link" to="/">
              <span id="header-logo">
                wack
                <b>overflow</b>
              </span>
            </Link>
          </li>
          {show}
        </ul>
      </div>
    </header>
  );
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Header);
