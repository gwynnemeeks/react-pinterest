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
      <div className="MyNavBar">
      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="navbar-brand" href="#">
           Gwynterist
          {
            authed
              ? <button className="btn btn-danger" onClick={this.logOutEvent}>Sign Out</button>
              : <Auth />
          }

        </div>
      </nav>
     </div>
    );
  }
}

export default MyNavBar;
