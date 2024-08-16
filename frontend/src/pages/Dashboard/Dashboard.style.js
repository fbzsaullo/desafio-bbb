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
`;
