import React from 'react';
import PropTypes from 'prop-types';

import Pin from '../Pins/Pins';
import PinForm from '../PinForm/pinForm';

import boardsData from '../../data/boardsData';
import pinsData from '../../data/pinsData';

class SingleBoard extends React.Component {
    static propTypes = {
      boardId: PropTypes.string.isRequired,
      setSingleBoard: PropTypes.func.isRequired,
    }

    state = {
      board: {},
      pins: [],
      showForm: false,
      editPins: {},
    }

    getPins = () => {
      const { boardId } = this.props;

      pinsData.getPinsByBoardId(boardId)
        .then((pins) => this.setState({ pins }))
        .catch((err) => console.error('get pins failed', err));
    }

    componentDidMount() {
      const { boardId } = this.props;

      boardsData.getSingleBoard(boardId)
        .then((response) => this.setState({ board: response.data }))
        .catch((err) => console.error('get single board failed', err));

      this.getPins();
    }

    deletePin = (pinId) => {
      pinsData.deletePin(pinId)
        .then(() => {
          this.getPins();
        })
        .catch((err) => console.error('delete pins failed', err));
    }

    createPin = (newPin) => {
      pinsData.createPin(newPin)
        .then(() => {
          this.getPins();
          this.setState({ showForm: false });
        })
        .catch((err) => console.error(err));
    }

    editAPin = (pinToEdit) => {
      this.setState({ showForm: true, editPins: pinToEdit });
    }

    updatePin = (pinId, editedPin) => {
      pinsData.updatePin(pinId, editedPin)
        .then(() => {
          this.getPins();
          this.setState({ showForm: false, editPins: {} });
        })
        .catch((err) => console.error('update pins is a failure'));
    }

    render() {
      const {
        board,
        pins,
        showForm,
        editPins,
      } = this.state;
      const { setSingleBoard, boardId } = this.props;

      const pinCards = pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin} editAPin={this.editAPin}/>);

      return (
        <div>
            <h4>{board.boardName}</h4>
            <button className="btn btn-warning" onClick={() => { this.setState({ showForm: !showForm }); }}><i className={showForm ? 'far fa-times-circle' : 'far fa-plus-square'}></i></button>
          {showForm ? <PinForm boardId={boardId} createPin={this.createPin} editingPin={editPins} updatePin={this.updatePin}/> : ''}
            <div className="card-columns">
              {pinCards}
            </div>
            <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>Go Back</button>
            </div>
      );
    }
}

export default SingleBoard;
