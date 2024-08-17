import api from '../api';

export const getParticipants = () => {
  return api.get('/participants');
}

export const createParticipant = (participant) => {
  const token = localStorage.getItem('token'); 
  return api.post('/participants', participant, {
    headers: {
      Authorization: token,
    },
  });
}
