import React from 'react';
import PropTypes from 'prop-types';

import './board.scss';

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
            <button className="btn btn-secondary" onClick={this.singleBoardEvent}><i className="far fa-eye"></i></button>
            <button className="btn btn-warning" onClick={this.editBoardEvent}><i className="far fa-edit"></i></button>
            <button className="btn btn-danger" onClick={this.deleteBoardEvent}><i className="fas fa-eraser"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
