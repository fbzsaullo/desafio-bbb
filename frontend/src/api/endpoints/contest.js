import api from '../api';

export const getContests = () => {
  return api.get('/contests');
}

export const getActivedContests = () => {
  return api.get('/contests/actived');
}