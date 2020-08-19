import axios from 'axios';
import apiKeys from '../helpers/apiKeys.json';

import utils from '../helpers/utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => console.error(err));
});

export default { getPinsByBoardId };
