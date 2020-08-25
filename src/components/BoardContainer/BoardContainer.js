import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

import authData from '../../data/authData';
import boardsData from '../../data/boardsData';
import smashData from '../../data/smash';

// create board
// boardForm component
// show board From on some click
// need a button
// go make the form on BoardForm
// on submit of a form: save to firebase, make sure board shows up

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
    formOpen: false,
  }

getBoards = () => {
  boardsData.getBoardsByUid(authData.getUid())
    .then((boards) => this.setState({ boards }))
    .catch((err) => console.error('get boards broke', err));
}

componentDidMount() {
  this.getBoards();
}

deleteBoard = (boardId) => {
  smashData.removeBoardAndPins(boardId)
    .then(() => {
      this.getBoards();
    })
    .catch((err) => console.error('delete boards sucks', err));
}

createBoard = (newBoard) => {
  boardsData.createBoard(newBoard)
    .then(() => {
      this.getBoards();
      this.setState({ formOpen: false });
    })
    .catch((err) => console.error('create boards broke', err));
}

render() {
  const { boards, formOpen } = this.state;
  const { setSingleBoard } = this.props;

  const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);

  return (
    <div>
      <button className="btn btn-warning" onClick={() => { this.setState({ formOpen: !formOpen }); }}><i className={formOpen ? 'far fa-times-circle' : 'far fa-plus-square'}></i></button>
          {formOpen ? <BoardForm createBoard={this.createBoard} /> : ''}
      <div className="card-columns">
        {boardCard}
      </div>
    </div>
  );
}
}

export default BoardContainer;
