import React from 'react';
import PropTypes from 'prop-types';

import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
    static propTypes = {
      board: boardShape.boardShape,
      setSingleBoard: PropTypes.func.isRequired,
      deleteBoard: PropTypes.func.isRequired,
      editABoard: PropTypes.func.isRequired,
    }

    singleBoardEvent = (e) => {
      e.preventDefault();
      const { board, setSingleBoard } = this.props;
      setSingleBoard(board.id);
    }

    deleteBoardEvent = (e) => {
      e.preventDefault();
      const { board, deleteBoard } = this.props;
      deleteBoard(board.id);
    }

    editBoardEvent = (e) => {
      e.preventDefault();
      const { editABoard, board } = this.props;
      editABoard(board);
    }

    render() {
      const { board } = this.props;
      return (
        <div className="card">
        <div className="card-body">
        <h4 className="card-title">{board.boardName}</h4>
        <div className="btn-group" role="group">
        <button className="btn btn-secondary" onClick={this.singleBoardEvent}> View Board </button>
        <button className="btn btn-warning" onClick={this.editBoardEvent}> Edit Board </button>
        <button className="btn btn-danger" onClick={this.deleteBoardEvent}> Delete Board </button>
        </div>
    </div>
</div>
      );
    }
}

export default Board;
