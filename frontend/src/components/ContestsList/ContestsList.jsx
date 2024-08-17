import { useEffect, useState } from 'react';
import { getContests } from '../../api';

const ContestsList = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    getContests()
      .then((response) => {
        setContests(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar concursos:', error);
      });
  }, []);

  return (
    <div>
      <h2>Todo concursos</h2>
      {contests.length > 0 ? (
        <ul>
          {contests.map((contest) => (
            <li key={contest.id}>
              <h3>{contest.id}</h3>
              <p>{contest.status === 'active' ? 'Ativo' : 'Finalizado'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum concurso disponível no momento.</p>
      )}
    </div>
  );
};

export default ContestsList;
