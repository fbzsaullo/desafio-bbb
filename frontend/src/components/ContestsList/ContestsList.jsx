import { useEffect, useState } from 'react';
import { getContests } from '../../api';
import { ContestsStyle } from './ContestsList.style';

const ContestsList = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    getContests()
      .then((response) => {
        const sortedContests = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setContests(sortedContests);
      })
      .catch((error) => {
        console.error('Erro ao buscar concursos:', error);
      });
  }, []);

  return (
    <ContestsStyle>
      <div className="contests-container">
        <h2>Todos os Concursos</h2>
        {contests.length > 0 ? (
          <ul className="contests-list">
            {contests.map((contest) => (
              <li className="contest-item" key={contest.id}>
                <div className="contest-header">
                  <h3>Concurso #{contest.id}</h3>
                  <p className={`status ${contest.status === 'active' ? 'active' : 'completed'}`}>
                    {contest.status === 'active' ? 'Ativo' : 'Finalizado'}
                  </p>
                </div>
                {contest.status === 'completed' && contest.winner && (
                  <div className="winner">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${contest.winner.photo_url}`}
                      alt={contest.winner.name}
                      className="winner-image"
                    />
                    <div className="winner-details">
                      <p><b>Vencedor:</b> {contest.winner.name}</p>
                      <p><b>Total de Votos:</b> {contest.winner.total_votes}</p>
                    </div>
                  </div>
                )}
                <p><b>Criado em:</b> {new Date(contest.created_at).toLocaleString()}</p>
                <p><b>Última atualização:</b> {new Date(contest.updated_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum concurso disponível no momento.</p>
        )}
      </div>
    </ContestsStyle>
  );
};

export default ContestsList;
