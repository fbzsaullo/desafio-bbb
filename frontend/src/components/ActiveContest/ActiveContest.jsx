import { useEffect, useState } from 'react';
import { getActivedContest, getActivedContestVotes } from '../../api';
import ContestChart from '../../components/ContestChart/ContestChart';

const ActiveContest = () => {
  const [contest, setContest] = useState(null);
  const [leader, setLeader] = useState(null);
  const [voteData, setVoteData] = useState(null);

  useEffect(() => {
    getActivedContest()
      .then((response) => {
        const contestData = response.data;
        setContest(contestData);

        if (contestData && contestData.participants.length > 0) {
          const leader = contestData.participants.reduce((prev, current) => {
            return prev.total_votes > current.total_votes ? prev : current;
          });
          setLeader(leader);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar concurso ativo:', error);
      });

    getActivedContestVotes()
      .then((response) => {
        setVoteData(response.data.participants);
      })
      .catch((error) => {
        console.error('Erro ao buscar votos do concurso ativo:', error);
      });
  }, []);

  return (
    <>
      {contest ? (
        <>
          <h2>Concurso ativo:</h2>
          <div className="stats">
            <div className="stat-card">
              <h3>Total de Votos</h3>
              <div className="stat-value">{contest.total_votes}</div>
            </div>
            <div className="stat-card">
              <h3>Liderando:</h3>
              <div className="stat-value">{leader ? leader.name : 'N/A'}</div>
            </div>
            <div className="stat-card">
              <h3>Participantes</h3>
              <div className="stat-value">{contest.participants.length}</div>
            </div>
          </div>
          <h3>Votos por participante</h3>
          <div className="stats">
            <div className="participants">
              {contest.participants.map((participant) => (
                <div className="participant-card" key={participant.id}>
                  <img
                    className="participant-image"
                    src={import.meta.env.VITE_API_URL + participant.photo_url}
                    alt={participant.name}
                  />
                  <h4>{participant.name}</h4>
                  <p>
                    Total de votos: <b>{participant.total_votes}</b>
                  </p>
                  <p>
                    Porcentagem: <b>{participant.percentage}</b>%
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <h3>Votos por hora</h3>
            {voteData && <ContestChart voteData={voteData} />}
          </div>
        </>
      ) : (
        <h2>Nenhuma votação em andamento</h2>
      )}
    </>
  );
};

export default ActiveContest;
