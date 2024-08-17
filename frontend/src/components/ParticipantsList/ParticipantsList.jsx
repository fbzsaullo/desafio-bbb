import { useEffect, useState } from 'react';
import { getParticipants, createParticipant } from '../../api';
import { ParticipantsStyle } from './ParticipantsList.style';
import Button from '../Button/Button';

const ParticipantsList = () => {
  const [participants, setParticipants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getParticipants()
      .then((response) => {
        const sortedParticipants = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setParticipants(sortedParticipants);
      })
      .catch((error) => {
        console.error('Erro ao buscar participantes:', error);
      });
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (photo) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

        const newParticipant = {
          participant: {
            name,
            photo_base64: base64String,
          },
        };

        try {
          const response = await createParticipant(newParticipant);
          setParticipants([response.data, ...participants]);
          setShowForm(false);
          setName('');
          setPhoto(null);
        } catch (error) {
          console.error('Erro ao criar participante:', error);
        }
      };
      reader.readAsDataURL(photo);
    }
  };

  return (
    <ParticipantsStyle>
      <div className="participants-container">
        {showForm ? (
          <form onSubmit={handleFormSubmit} className="participant-form">
            <h2>Criar Novo Participante</h2>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Foto:</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                required
              />
            </div>
            <div className="form-actions">
              <Button type="submit">Salvar</Button>
              <Button type="button" onClick={() => setShowForm(false)} variant="secondary">
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <>
            <h2>Todos os Participantes</h2>
            <Button onClick={() => setShowForm(true)}>
              Adicionar Novo Participante
            </Button>
            {participants.length > 0 ? (
              <ul className="participants-list">
                {participants.map((participant) => (
                  <li className="participant-item" key={participant.id}>
                    <div className="participant-header">
                      <h3>{participant.name}</h3>
                    </div>
                    <div className="participant-info">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${participant.photo_url}`}
                        alt={participant.name}
                        className="participant-image"
                      />
                      <div className="participant-details">
                        <p><b>Total de Votos:</b> {participant.total_votes}</p>
                        <p><b>Participando desde:</b> {new Date(participant.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum participante disponível no momento.</p>
            )}
          </>
        )}
      </div>
    </ParticipantsStyle>
  );
};

export default ParticipantsList;
