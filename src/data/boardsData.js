import axios from 'axios';
import apiKeys from '../helpers/apiKeys.json';

import utils from '../helpers/utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => console.error(err));
});

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const createBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

const updateBoard = (boardId, editedBoard) => axios.put(`${baseUrl}/boards/${boardId}.json`, editedBoard);

export default {
  getBoardsByUid,
  getSingleBoard,
  deleteBoard,
  createBoard,
  updateBoard,
};
