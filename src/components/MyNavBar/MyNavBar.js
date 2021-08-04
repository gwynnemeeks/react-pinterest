import React from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import Auth from '../Auth/Auth';
import 'firebase/auth';

class MyNavBar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logOutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/"><sup>GWYNN</sup> | <sub>TERST</sub></a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {
              authed
                ? <button className="nav-link btn btn-danger text-light logout-button" onClick={this.logOutEvent}><i className="fas fa-sign-out-alt"></i> Logout    </button>
                : <Auth />
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default MyNavBar;
