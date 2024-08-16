import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Sidebar, SidebarItem, MainContent, Stats, StatCard, StatValue, ChartContainer, ParticipantCard, ParticipantImage } from './Dashboard.style';
import { faSignOutAlt, faEnvelope, faChartBar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { getActivedContest } from '../../api';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [contest, setContest] = useState(null);

  useEffect(() => {
    getActivedContest()
      .then((response) => {
        setContest(response.data);
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
    <Container>
      <Sidebar>
        <SidebarItem as="button" onClick={handleDisconnect}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Desconectar</span>
        </SidebarItem>
        <SidebarItem>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Concursos</span>
        </SidebarItem>
        <SidebarItem>
          <FontAwesomeIcon icon={faChartBar} />
          <span>Participantes</span>
        </SidebarItem>
        <SidebarItem>
          <FontAwesomeIcon icon={faTrophy} />
          <span>Concurso Ativo</span>
        </SidebarItem>
      </Sidebar>

      <MainContent>
        {contest ? (
          <>
            <h2>Concurso ativo:</h2>
            <Stats>
              <StatCard>
                <h3>Total Votes</h3>
                <StatValue>{contest.total_votes}</StatValue>
              </StatCard>
              <StatCard>
                <h3>Participants</h3>
                <StatValue>{contest.votes_by_participant.length}</StatValue>
              </StatCard>
            </Stats>
            <h3>Votes by Participant:</h3>
            <Stats>
              {contest.votes_by_participant.map((participant) => (
                <ParticipantCard key={participant.participant_id}>
                  <ParticipantImage src={import.meta.env.VITE_API_URL+participant.participant_photo_url} alt={participant.participant_name} />
                  <h4>{participant.participant_name}</h4>
                  <p>Total Votes: {participant.total_votes}</p>
                  <p>Percentage: {participant.percentage}%</p>
                </ParticipantCard>
              ))}
            </Stats>
            <ChartContainer>
              <h3>Vote Distribution</h3>
              {/* Replace this with the actual chart component */}
              {/* <PlaceholderChart /> */}
            </ChartContainer>
          </>
        ) : (
          <h2>Nenhuma votação em andamento</h2>
        )}
      </MainContent>
    </Container>
  );
};

export default Dashboard;
