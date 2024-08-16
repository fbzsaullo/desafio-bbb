import styled from 'styled-components';
import PropTypes from 'prop-types';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`;

const Notification = ({ message, show }) => {
  return (
    <NotificationContainer show={show}>
      {message}
    </NotificationContainer>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Notification;
