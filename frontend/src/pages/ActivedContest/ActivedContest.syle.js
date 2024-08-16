import styled from 'styled-components';

export const ActivedContestStyle = styled.div`
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  text-align: center;
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
      width: 516px;
      transition: 0.3s;

      img {
        height: 86px;
        border-radius: 0 8px 8px 0;
      }
      h2 {
        margin-left: 20px;
      }
      &:hover {
        cursor: pointer;
        filter: drop-shadow(0px 0px 10px #2D59DC);
        transition: 0.1s;
      }
    }
  }
}
`;