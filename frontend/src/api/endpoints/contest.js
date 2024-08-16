import api from '../api';

export const getContests = () => {
  return api.get('/contests');
}

export const getActivedContest = () => {
  return api.get('/contests/actived');
}