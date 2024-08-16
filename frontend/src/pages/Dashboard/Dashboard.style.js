import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 30px auto 0 auto;
  max-width: 1200px;
  height: 80vh;
  text-align: center;
  padding: 10px;
  gap: 20px;
`;

export const Sidebar = styled.div`
  border-radius: 10px;
  width: 250px;
  background-color: #e3e7f1;
  padding: 20px;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  font-size: 18px;
  color: ${(props) => (props.active ? '#007bff' : '#5a5a5a')};
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: #5a5a5a;
  cursor: pointer;

  span {
    margin-left: 10px;
  }

  &:hover {
    color: #007bff;
  }
`;

export const MainContent = styled.div`
  h2 {
    text-align: left;
    margin-bottom: 20px;
  }
  flex: 1;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  background-color: #dce6f7;
  padding: 20px;
  border-radius: 10px;
  width: 23%;
  text-align: center;

  h3 {
    margin-bottom: 10px;
  }
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

export const ChartContainer = styled.div`
  background-color: #dce6f7;
  padding: 20px;
  border-radius: 10px;
`;

export const ParticipantCard = styled.div`
  background-color: #f0f4ff;
  padding: 15px;
  border-radius: 10px;
  width: 23%;
  text-align: center;

  h4 {
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;

export const ParticipantImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;
