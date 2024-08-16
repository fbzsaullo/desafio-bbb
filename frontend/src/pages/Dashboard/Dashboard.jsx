import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DesignStyle } from './Dashboard.style';
import { faSignOutAlt, faEnvelope, faChartBar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { getActivedContest, getActivedContestVotes } from '../../api';
import { useEffect, useState } from 'react';
import ContestChart from '../../components/ContestChart/ContestChart';

const Dashboard = () => {
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
        console.error(error);
      });

    getActivedContestVotes()
      .then((response) => {
        setVoteData(response.data.participants);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem('apiKey');
    window.location.href = '/';
  };

  return (
    <DesignStyle>
      <div className="container">
        <div className="sidebar">
          <button className="sidebar-item" onClick={handleDisconnect}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Desconectar</span>
          </button>
          <div className={`sidebar-item ${window.location.pathname === '/dashboard' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faTrophy} />
            <span>Concurso Ativo</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Concursos</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faChartBar} />
            <span>Participantes</span>
          </div>
        </div>

        <div className="main-content">
          {contest ? (
            <>
              <h2>Concurso ativo:</h2>
              <div className="stats">
                <div className="stat-card">
                  <h3>Total Votes</h3>
                  <div className="stat-value">{contest.total_votes}</div>
                </div>
                <div className="stat-card">
                  <h3>Liderando:</h3>
                  <h3>{leader ? leader.name : 'N/A'}</h3>
                </div>
                <div className="stat-card">
                  <h3>Participants</h3>
                  <div className="stat-value">{contest.participants.length}</div>
                </div>
              </div>
              <h3>Votes by Participant:</h3>
              <div className="stats">
                {contest.participants.map((participant) => (
                  <div className="participant-card" key={participant.id}>
                    <img className="participant-image" src={import.meta.env.VITE_API_URL + participant.photo_url} alt={participant.name} />
                    <h4>{participant.name}</h4>
                    <p>Total Votes: {participant.total_votes}</p>
                    <p>Percentage: {participant.percentage}%</p>
                  </div>
                ))}
              </div>
              <div className="chart-container">
                <h3>Votos por hora</h3>
                {voteData && <ContestChart voteData={voteData} />}
              </div>
            </>
          ) : (
            <h2>Nenhuma votação em andamento</h2>
          )}
        </div>
      </div>
    </DesignStyle>
  );
};

export default Dashboard;
