import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../data/authData';

// newBoard requires:
// name

class BoardForm extends React.Component {
    static propTypes = {
      createBoard: PropTypes.func.isRequired,
    }

    state = {
      boardName: '',
      // make object based on fields
    }

    // there will be a change Event for each field
    changeNameEvent = (e) => {
      e.preventDefault();
      this.setState({ boardName: e.target.value });
    }

    // create the object you want to save to firebase

    saveBoardEvent = (e) => {
      e.preventDefault();
      const { boardName } = this.state;
      const { createBoard } = this.props;

      const newBoard = {
        boardName, // must match firebase keys
        uid: authData.getUid(),
      };
      createBoard(newBoard);
      console.warn('here is a new board', newBoard);
    }

    render() {
      return (
            <form className="col 6 offset-3">
                <div className="form-group">
                    <label htmlFor="boardName">Board Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="boardName"
                    placeholder="EnterBoardName"
                    onChange={this.changeNameEvent}
                    />
                </div>
                <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
            </form>
      );
    }
}

export default BoardForm;
