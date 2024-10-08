import styled from 'styled-components';

export const DesignStyle = styled.div`
  .container {
    max-width: 1200px;
    text-align: center;
    padding: 10px;
    gap: 20px;

    @media (min-width: 769px) {
      display: flex;
      margin: 75px auto;
    }
  }

  .sidebar {
    border-radius: 10px;
    background-color: #e3e7f1;
    padding: 20px;
    top: 20px;
    height: fit-content;

    @media (min-width: 769px) {
      position: sticky;
      width: 250px;
    }

    @media (max-width: 768px) {
      width: auto;
      margin: 40px 0;
    }
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    padding: 15px 30px;
    font-size: 18px;
    color: #5a5a5a;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 30px;
    span {
      margin-left: 10px;
    }
    &:hover {
      color: #007bff;
    }
  }

  .disconnect {
    color: #dc3545;
    &:hover {
      color: #dc3545;
      filter: drop-shadow(0 0 0.75rem #dc3545);
    }
  }


  .sidebar-item.active {
    color: #007bff;
    background-color: #d6ddf4;
  }

  .main-content {
    flex: 1;
    h2 {
      text-align: left;
      margin-bottom: 20px;
    }
  }

  .stats {
    gap: 20px;
    margin-bottom: 20px;
    @media (min-width: 769px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      background-color: #007bff;
      color: white;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        filter: drop-shadow(0 0 0.75rem #007bff);
      }
    }
  }

  .stat-card {
    background-color: #dce6f7;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    h3 {
      margin-bottom: 10px;
    }

    @media (min-width: 769px) {
      width: 23%;
    }

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }

  .stat-value {
    font-size: 32px;
    font-weight: bold;
  }

  .chart-container {
    background-color: #dce6f7;
    padding: 20px;
    border-radius: 10px;
  }

  .participants {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 5px;
  }

  .participant-card {
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
  }

  .participant-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .participants-create {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .participant-card-create {
    display: flex;
    align-items: center;
    background-color: #f0f4ff;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e8ff;
    }

    &.selected {
      background-color: #d6ddf4;
      border: 2px solid #007bff;
    }
  }

  .participant-card-create img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-right: 20px;
  }

  .participant-card-create h4 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  .create-contest-button {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      filter: drop-shadow(0 0 0.75rem #007bff);
    }

    &:disabled {
      background-color: #007bff;
      cursor: not-allowed;
    }
  }
`;
