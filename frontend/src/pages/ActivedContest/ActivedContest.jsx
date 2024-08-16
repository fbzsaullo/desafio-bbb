import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { ActivedContestStyle } from "./ActivedContest.syle.js";
import { sendVote, getActivedContests } from "../../api";
import Button from "../../components/Button/Button";

const ActivedContest = () => {
  const [contestData, setContestData] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const navigate = useNavigate();

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

  const handleRecaptchaChange = (value) => {
    setRecaptchaToken(value);
  };

  const handleVote = async () => {
    if (!contestData || !selectedParticipant || !recaptchaToken) return; 

    try {
      await sendVote(contestData.contest.id, selectedParticipant.id, recaptchaToken);
      navigate('/obrigado-por-votar');
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  if (error) {
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
                  src={import.meta.env.VITE_API_URL+participant.photo_url}
                  alt={`participant ${participant.id}`}
                />
              </div>
            ))}
          </div>
          <div className="buttons">
            <ReCAPTCHA
              className='recaptcha'
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
            />
            <Button onClick={handleVote} className="vote-button" disabled={!recaptchaToken}>
              Votar
            </Button>
          </div>
        </div>
      </div>
    </ActivedContestStyle>
  );
};

export default ActivedContest;
