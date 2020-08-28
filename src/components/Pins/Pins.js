import React from 'react';
import PropTypes from 'prop-types';

import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
    static propTypes = {
      pin: pinShape.pinShape,
      deletePin: PropTypes.func.isRequired,
      editAPin: PropTypes.func.isRequired,
    }

    deletePinEvent = (e) => {
      e.preventDefault();
      const { pin, deletePin } = this.props;
      deletePin(pin.id);
    }

    editPinEvent = (e) => {
      e.preventDefault();
      const { editAPin, pin } = this.props;
      editAPin(pin);
    }

    render() {
      const { pin } = this.props;

      return (
            <div className="card bg-dark text-white border-0">
        <img className="card-img" src={pin.imageUrl} alt={pin.pinName} />
        <h5 className="card-title">{pin.pinName}</h5>
        <button className="btn btn-danger" onClick={this.deletePinEvent}>delete pin</button>
        <button className="btn btn-warning" onClick={this.editPinEvent}>edit pin</button>
        </div>
      );
    }
}

export default Pin;
