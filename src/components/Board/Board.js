import React from 'react';

import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
    static propTypes = {
      board: boardShape.boardShape,
    }

    render() {
      const { board } = this.props;
      return (
        <div className="card">
        <div className="card-body">
        <h4 className="card-title">{board.boardName}</h4>
    </div>
</div>
      );
    }
}

export default Board;
