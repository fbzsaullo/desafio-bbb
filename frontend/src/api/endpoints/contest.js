import api from '../api';

export const getContests = () => {
  return api.get('/contests');
}

export const getActivedContest = () => {
  return api.get('/contests/actived');
}

export const getActivedContestVotes = () => {
  return api.get('/contests/actived_votes');
}

export const finishContest = (contestId) => {
  const token = localStorage.getItem('token'); 
  return api.patch(`/contests/${contestId}/complete`, {}, {
    headers: {
      Authorization: token,
    },
  });
}

export const createContest = (contestData) => {
  const token = localStorage.getItem('token');
  return api.post('/contests', contestData, {
    headers: {
      Authorization: token,
    },
  });
}