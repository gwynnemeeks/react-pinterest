import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../data/connection';

import BoardContainer from '../components/BoardContainer/BoardContainer';
import MyNavBar from '../components/MyNavBar/MyNavBar';

import Auth from '../components/Auth/Auth';

import './App.scss';

fbConnection.firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    const loadComponent = () => {
      if (authed) {
        return <BoardContainer />;
      }
      return <Auth />;
    };

    return (
      <div className="App">
        <h2>React-Pinterest</h2>
        <button className="btn btn-success">Success <i class="fas fa-heart">
        <MyNavBar />
        {loadComponent()}
          </i>
          </button>
      </div>
    );
  }
}

export default App;
