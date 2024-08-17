import styled from 'styled-components';

export const ContestsStyle = styled.div`
  .contests-list {
    list-style-type: none;
    padding: 0;
  }

  .contest-item {
    padding: 20px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-5px);
    }
  }

  .contest-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h3 {
      margin: 0;
      color: #007bff;
    }
    .status {
      padding: 5px 10px;
      border-radius: 5px;
      &.active {
        background-color: #28a745;
        color: #fff;
      }
      &.completed {
        background-color: #dc3545;
        color: #fff;
      }
    }
  }

  .winner {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .winner-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .winner-details {
      p {
        margin: 0;
        color: #495057;
      }
    }
  }

  p {
    margin: 5px 0;
    color: #495057;
  }
`;
