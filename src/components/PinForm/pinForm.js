import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../data/authData';

// import authData from '../../data/authData';

// newPin requires
// imageUrl, pinName, boardId

class PinForm extends React.Component {
    static propTypes = {
      createPin: PropTypes.func.isRequired,
    }

    state = {
      imageUrl: '',
      pinName: '',
      boardId: '',
    }

    changeImageEvent = (e) => {
      e.preventDefault();
      this.setState({ imageUrl: e.target.value });
    }

    changeNameEvent = (e) => {
      e.preventDefault();
      this.setState({ pinName: e.target.value });
    }

    // boardId?

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

    render() {
      return (
            <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            placeholder="Enter Pin Image Url"
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
            onChange={this.changeNameEvent}
          />
        </div>
        <button className="btn btn-dark" onClick={this.savePinEvent}><i class="fas fa-save"></i></button>
        </form>
      );
    }
}

export default PinForm;
