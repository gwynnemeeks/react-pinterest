import PropTypes from 'prop-types';

const pinShape = PropTypes.shape({
  imageUrl: PropTypes.string.isRequired,
  pinName: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
});

export default { pinShape };
