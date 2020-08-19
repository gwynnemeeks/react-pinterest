import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../data/connection';

import BoardContainer from '../components/BoardContainer/BoardContainer';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import SingleBoard from '../components/SingleBoard/SingleBoard';

import './App.scss';

fbConnection.firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
    singleBoardId: '',
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

  setSingleBoard = (singleBoardId) => {
    this.setState({ singleBoardId });
  }

  render() {
    const { authed, singleBoardId } = this.state;

    const loadComponent = () => {
      if (authed && singleBoardId.length === 0) {
        return <BoardContainer setSingleBoard={this.setSingleBoard}/>;
      }

      if (authed && singleBoardId.length > 0) {
        return <SingleBoard boardId={singleBoardId} setSingleBoard={this.setSingleBoard}/>;
      }

      return '';
    };

    return (
      <div className="App">
        <MyNavBar authed={authed}/>
        {loadComponent()}
        {/* <MyPins authed={authed}/> */}
      </div>
    );
  }
}

export default App;
