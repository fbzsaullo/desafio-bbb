import styled from 'styled-components';

export const ParticipantsStyle = styled.div`
  h2 {
    margin-bottom: 20px;
    color: #343a40;
  }

  .participants-list {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
  }

  .participant-item {
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

  .participant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h3 {
      margin: 0;
      color: #007bff;
    }
  }

  .participant-info {
    display: flex;
    align-items: center;
    .participant-image {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .participant-details {
      p {
        margin: 5px 0;
        color: #495057;
      }
    }
  }

  .participant-form {
    display: flex;
    flex-direction: column;
    .form-group {
      margin-bottom: 15px;
      label {
        display: block;
        margin-bottom: 5px;
        color: #495057;
      }
      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 5px;
      }
    }
    .form-actions {
      display: flex;
      justify-content: space-between;
      button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        &.cancel {
          background-color: #dc3545;
          color: #fff;
          &:hover {
            background-color: #c82333;
          }
        }
        &:not(.cancel) {
          background-color: #007bff;
          color: #fff;
          &:hover {
            background-color: #0056b3;
          }
        }
      }
    }
  }

  p {
    margin: 5px 0;
    color: #495057;
  }
`;
