import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';

import authData from '../../data/authData';
import boardsData from '../../data/boardsData';
import smashData from '../../data/smash';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

goGetYoBoards = () => {
  boardsData.getBoardsByUid(authData.getUid())
    .then((boards) => this.setState({ boards }))
    .catch((err) => console.error('get boards broke', err));
}

componentDidMount() {
  this.goGetYoBoards();
}

deleteBoard = (boardId) => {
  smashData.removeBoardAndPins(boardId)
    .then(() => {
      this.goGetYoBoards();
    })
    .catch((err) => console.error('delete boards sucks', err));
}

render() {
  const { boards } = this.state;
  const { setSingleBoard } = this.props;

  const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);

  return (
      <div className="card-columns">
        { boardCard }
     </div>
  );
}
}

export default BoardContainer;
