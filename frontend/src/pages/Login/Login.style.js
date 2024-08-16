import styled from 'styled-components';

export const LoginStyled = styled.div`
  height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #F2F4FC;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #2D59DC;
    padding: 20px 50px;
    border-radius: 8px;
    width: 350px;
    height: 300px;
    text-align: center;
    filter: drop-shadow(0 0 0.75rem #2D59DC);
  }

  .login-input {
    background-color: #F2F4FC;
    border: none;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    width: 93%;
  }

  .login-button {
    background-color: #F2F4FC;
    border: none;
    padding: 10px;
    margin-top: 20px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color: #e0e3f7;
    }
  }
`;
