import api from '../api';

export const sendVote = (contestId, participantId, recaptchaToken) => {
  return api.post(`/contests/${contestId}/participants/${participantId}/votes`, {
    recaptchaToken: recaptchaToken 
  });
}