import { ButtonStyle } from "./Button.style";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ children, onClick, to }) => {
  if (to) {
    return (
      <Link to={to}>
        <ButtonStyle onClick={onClick}>
          {children}
        </ButtonStyle>
      </Link>
    );
  }

  return (
    <ButtonStyle onClick={onClick}>
      {children}
    </ButtonStyle>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string
}

export default Button;
