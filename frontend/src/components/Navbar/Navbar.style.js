import styled from 'styled-components';

export const NavbarStyle = styled.div`
  background-color: #2D59DC;
  color: #F2F4FC;
  height: 75px;
  padding: 0 5px;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 43px;
      margin-right: 10px;
    }
  }

  .button {
    button {
      height: 30px;
      width: 100px;
      background-color: #F2F4FC;
      color: #2D59DC;
      border: none;
      border-radius: 16px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        filter:  drop-shadow(0px 0px 5px #F2F4FC);
      }
    }
  }
`;