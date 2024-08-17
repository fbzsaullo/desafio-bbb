import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DesignStyle } from './Dashboard.style';
import { faSignOutAlt, faEnvelope, faChartBar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ActiveContest from '../../components/ActiveContest/ActiveContest';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('contest');

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresAt');
    window.location.href = '/';
  };

  return (
    <DesignStyle>
      <div className="container">
        <div className="sidebar">
          <button className="sidebar-item disconnect" onClick={handleDisconnect}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Desconectar</span>
          </button>
          <div
            className={`sidebar-item ${activeSection === 'contest' ? 'active' : ''}`}
            onClick={() => setActiveSection('contest')}
          >
            <FontAwesomeIcon icon={faTrophy} />
            <span>Concurso Ativo</span>
          </div>
          <div
            className={`sidebar-item ${activeSection === 'contests' ? 'active' : ''}`}
            onClick={() => setActiveSection('contests')}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Concursos</span>
          </div>
          <div
            className={`sidebar-item ${activeSection === 'participants' ? 'active' : ''}`}
            onClick={() => setActiveSection('participants')}
          >
            <FontAwesomeIcon icon={faChartBar} />
            <span>Participantes</span>
          </div>
        </div>

        <div className="main-content">
          {activeSection === 'contest' ? (
            <ActiveContest />
          ) : activeSection === 'contests' ? (
            <h2>Concursos:</h2>
          ) : activeSection === 'participants' ? (
            <h2>Participantes:</h2>
          ) : (
            <h2>Nenhuma votação em andamento</h2>
          )}
        </div>
      </div>
    </DesignStyle>
  );
};

export default Dashboard;
