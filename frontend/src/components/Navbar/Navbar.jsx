import { NavbarStyle } from "./Navbar.style";
import icon from "../../assets/icon.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLogged = localStorage.getItem("apiKey").length > 0 ? "Dashboard" : "Login";
  return (
    <NavbarStyle>
      <div className="container">
        <div className="logo">
          <img src={icon} alt="icon" />
          <h4>Desafio BBB</h4>
        </div>
        <div className="button">
          <Link to="/login">
            <button>{isLogged}</button>
          </Link>
        </div>
      </div>
    </NavbarStyle>
  );
}

export default Navbar;