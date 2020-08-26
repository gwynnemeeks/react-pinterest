import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../data/authData';

// editBoard requires:
// boardForm for updating
// add edit button to boards
// on click open bf with inputs populated with board info
// on save/submit the board should update
// rerender the board container
// switchy button with a conditional

class BoardForm extends React.Component {
    static propTypes = {
      createBoard: PropTypes.func.isRequired,
      updateBoard: PropTypes.func.isRequired,
      boardThatIAmEditing: PropTypes.object.isRequired,
    }

    state = {
      boardName: '',
      isEditing: false,
    }

    componentDidMount() {
      const { boardThatIAmEditing } = this.props;
      if (boardThatIAmEditing.boardName) {
        this.setState({
          name: boardThatIAmEditing.boardName,
          isEditing: true,
        });
      }
    }

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
    }

    editBoardEvent = (e) => {
      e.preventDefault();
      const { boardName } = this.state;
      const { updateBoard, boardThatIAmEditing } = this.props;

      const myBoardWithChanges = {
        boardName,
        uid: authData.getUid(),
      };
      updateBoard(boardThatIAmEditing.id, myBoardWithChanges);
    }

    render() {
      const { boardName, isEditing } = this.state;
      return (
            <form className="col 6 offset-3">
                <div className="form-group">
                    <label htmlFor="boardName">Board Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="boardName"
                    placeholder="EnterBoardName"
                    value={boardName}
                    onChange={this.changeNameEvent}
                    />
                </div>
                {
          isEditing
            ? <button className="btn btn-light" onClick={this.editBoardEvent}>Edit Board</button>
            : <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
        }

            </form>
      );
    }
}

export default BoardForm;
