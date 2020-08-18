import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../data/connection';

import BoardContainer from '../components/BoardContainer/BoardContainer';
import MyNavBar from '../components/MyNavBar/MyNavBar';

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
      return '';
    };

    return (
      <div className="App">
        <MyNavBar authed={authed}/>
        {loadComponent()}
      </div>
    );
  }
}

export default App;
