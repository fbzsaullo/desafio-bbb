import { useEffect, useState } from 'react';
import { getActivedContest, getActivedContestVotes, finishContest, getParticipants, createContest } from '../../api';
import ContestChart from '../../components/ContestChart/ContestChart';

const ActiveContest = () => {
  const [contest, setContest] = useState(null);
  const [leader, setLeader] = useState(null);
  const [voteData, setVoteData] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

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
      
    getParticipants()
      .then((response) => {
        setParticipants(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar participantes:', error);
      });
  }, []);

  const handleFinishContest = () => {
    if (contest) {
      finishContest(contest.contest.id)
        .then(() => {
          console.log('Concurso finalizado com sucesso!');
          setContest(null);
        })
        .catch((error) => {
          console.error('Erro ao finalizar o concurso:', error);
        });
    }
  };

  const handleCreateContest = () => {
    const contestData = {
      contest: {
        participant_ids: selectedParticipants.map((participant) => participant.id),
      },
    };

    createContest(contestData)
      .then(() => {
        console.log('Concurso criado com sucesso!');
        // Optionally, you can refresh the active contest after creation
        getActivedContest().then((response) => setContest(response.data));
      })
      .catch((error) => {
        console.error('Erro ao criar o concurso:', error);
      });
  };

  const handleSelectParticipant = (participant) => {
    setSelectedParticipants((prevSelected) =>
      prevSelected.includes(participant)
        ? prevSelected.filter((p) => p.id !== participant.id)
        : [...prevSelected, participant]
    );
  };

  return (
    <>
      {contest ? (
        <>
          <div className="header">
            <h2>Concurso ativo - {contest.contest.id}</h2>
            <button onClick={handleFinishContest} className="finish-button">Finalizar Concurso</button>
          </div>
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
        <>
          <h2>Nenhuma votação em andamento</h2>
          <div>
            <h3>Selecione os participantes para criar um novo concurso:</h3>
            <div className="participants-create">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`participant-card-create ${
                    selectedParticipants.includes(participant) ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectParticipant(participant)}
                >
                  <img
                    className="participant-image-create"
                    src={import.meta.env.VITE_API_URL + participant.photo_url}
                    alt={participant.name}
                  />
                  <h4>{participant.name}</h4>
                </div>
              ))}
            </div>
            <button
              onClick={handleCreateContest}
              className="create-contest-button"
              disabled={selectedParticipants.length === 0}
            >
              Criar Concurso
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ActiveContest;
