import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import './header.css';

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
      </React.Fragment>
    );
  } else {
    show = (
      //add listner to sign up
      <React.Fragment>
        <Link className="top-btn" to="/login">
          <button>Log In</button>
        </Link>
        <Link to="/register">
          <button className="top-btn button-primary">Sign Up</button>
        </Link>
      </React.Fragment>
    );
  }
  return (
    <header className="main-header">
      <div className="container">
        <div className="row">
          <div className="two columns">
            <Link id="home-link" to="/">
              <span id="header-logo">
                wack
                <b>overflow</b>
              </span>
            </Link>
          </div>

          {/* <form className="search six columns">
            <input type="search" placeholder="...search" />
            <button className="button-primary" type="submit">
              <i className="fas fa-search" />
            </button>
          </form> */}

          <div className="four columns">{show}</div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Header);
