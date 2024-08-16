import styled from 'styled-components';

export const ActivedContestStyle = styled.div`
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

  }

  .text {
    margin: 20px;
    h1 {
      margin-bottom: 20px;
    }
  }

  .contest {
    .participants {
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      .participant {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #83A0F4;
        border-radius: 8px;
        height: 86px;
        width: 100%;
        max-width: 516px;
        transition: 0.3s;

        img {
          height: 86px;
          border-radius: 0 8px 8px 0;
          max-width: 30%;
        }

        h2 {
          margin-left: 20px;
          font-size: 1.2em;
        }
        &:hover {
          cursor: pointer;
          filter: drop-shadow(0px 0px 10px #2D59DC);
          transition: 0.1s;
        }
      }
      .selected {
        background-color: #2D59DC;
        color: #F2F4FC;
        filter: drop-shadow(0px 0px 10px #2D59DC);
      }
    }
    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 10px;

      @media (min-width: 768px) {
        .recaptcha {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          transform: scale(0.70);
          transform-origin: 0 0;
        }
      }
    }
  }

  @media (min-width: 768px) {
    .contest .buttons {
      flex-direction: row;
      gap: 20px;
    }
  }
`;
