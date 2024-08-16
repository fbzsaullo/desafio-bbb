import styled from 'styled-components';

export const ButtonStyle = styled.button`
  min-width: 180px;
  height: 50px;
  background-color: #2D59DC;
  border-radius: 8px;
  border: none;
  font-size: 24px;
  font-weight: 700;
  color: #F2F4FC;
  transition: 0.3s;
  padding: 0 20px;

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0px 0px 10px #2D59DC);
    transition: 0.1s;
  }
`;