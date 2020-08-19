import React from 'react';

import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
    static propTypes = {
      pin: pinShape.pinShape,
    }

    render() {
      const { pin } = this.props;

      return (
            <div className="card bg-dark text-white border-0">
        <img className="card-img" src={pin.imageUrl} alt={pin.pinName} />
        <h5 className="card-title">{pin.pinName}</h5>
        </div>
      );
    }
}

export default Pin;
