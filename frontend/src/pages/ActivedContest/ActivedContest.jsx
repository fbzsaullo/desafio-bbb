import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { ActivedContestStyle } from "./ActivedContest.syle.js";
import { sendVote, getActivedContests } from "../../api";

const ActivedContest = () => {
  const [contestData, setContestData] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [error, setError] = useState(null); // Estado para gerenciar erros
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await getActivedContests();
        if (response.data && response.data.participants && response.data.participants.length > 0) {
          setContestData(response.data);
        } else {
          setError("No actived contest");
        }
      } catch (error) {
        console.error('Error fetching active contests:', error);
        setError(error.response.data.errors); 
      }
    };

    fetchContestData();
  }, []);

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
  };

  const handleVote = async () => {
    if (!contestData || !selectedParticipant) return;

    try {
      await sendVote(contestData.contest.id, selectedParticipant.id);
      navigate('/obrigado-por-votar');
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  if (error) {
    console.log(error);
    return (
      <ActivedContestStyle>
        <div className="container">
          <div className="text">
            <h1>
              {error === "No actived contest" ? "Nenhuma votação em andamento" : "Error occurred"}
            </h1>
          </div>
        </div>
      </ActivedContestStyle>
    )
  }

  if (!contestData) {
    return <div>Loading...</div>;
  }

  return (
    <ActivedContestStyle>
      <div className="container">
        <div className="text">
          <h1>Paredão BBB24: Escolha quem deve ficar!</h1>
          <h3>Vote para definir quem deve ficar no BBB 2024!</h3>
        </div>
        <div className="contest">
          <div className="participants">
            {contestData.participants.map(participant => (
              <div
                key={participant.id}
                className={`participant ${selectedParticipant?.id === participant.id ? 'selected' : ''}`}
                onClick={() => handleParticipantClick(participant)}
              >
                <h2>{participant.name}</h2>
                <img
                  src={'http://localhost:3000/'+participant.photo_url}
                  alt={`participant ${participant.id}`}
                />
              </div>
            ))}
          </div>
          {selectedParticipant && (
            <button onClick={handleVote} className="vote-button">
              Submit Vote
            </button>
          )}
        </div>
      </div>
    </ActivedContestStyle>
  );
};

export default ActivedContest;
