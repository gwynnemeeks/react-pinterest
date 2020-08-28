import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../data/authData';

// import authData from '../../data/authData';

// newPin requires
// imageUrl, pinName, boardId

class PinForm extends React.Component {
    static propTypes = {
      createPin: PropTypes.func.isRequired,
      updatePin: PropTypes.func.isRequired,
      editingPin: PropTypes.object.isRequired,
    }

    state = {
      imageUrl: '',
      pinName: '',
      boardId: '',
      isEditing: false,
    }

    componentDidMount() {
      const { editingPin } = this.props;
      if (editingPin.name) {
        this.setState({
          pinName: editingPin.name,
          imageUrl: editingPin.imageUrl,
          boardId: editingPin.boardId,
          isEditing: true,
        });
      }
    }

    changeImageEvent = (e) => {
      e.preventDefault();
      this.setState({ imageUrl: e.target.value });
    }

    changeNameEvent = (e) => {
      e.preventDefault();
      this.setState({ pinName: e.target.value });
    }

    savePinEvent = (e) => {
      e.preventDefault();
      const { imageUrl, pinName } = this.state;
      const { createPin, boardId } = this.props;

      const newPin = {
        imageUrl,
        pinName,
        boardId,
        uid: authData.getUid(),
      };

      createPin(newPin);
    }

    editPinEvent = (e) => {
      e.preventDefault();
      const { imageUrl, pinName, boardId } = this.state;
      const { updatePin, editingPin } = this.props;

      const pinWithChanges = {
        imageUrl,
        pinName,
        boardId,
        uid: authData.getUid(),
      };

      updatePin(editingPin.id, pinWithChanges);
    }

    render() {
      const { imageUrl, pinName, isEditing } = this.state;
      return (
            <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            placeholder="Enter Pin Image Url"
            value={imageUrl}
            onChange={this.changeImageEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinName">Pin Name</label>
          <input
            type="text"
            className="form-control"
            id="pinName"
            placeholder="Pin Name"
            value={pinName}
            onChange={this.changeNameEvent}
          />
        </div>
        {
          isEditing
            ? <button className="btn btn-dark" onClick={this.editPinEvent}><i className="fas fa-pen-nib"></i></button>
            : <button className="btn btn-dark" onClick={this.savePinEvent}><i className="fas fa-save"></i></button>
        }

        </form>
      );
    }
}

export default PinForm;
