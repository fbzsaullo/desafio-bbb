import api from '../api';

export const sendVote = (contestId, participantId) => {
  return api.post(`/contests/${contestId}/participants/${participantId}/votes`);
}