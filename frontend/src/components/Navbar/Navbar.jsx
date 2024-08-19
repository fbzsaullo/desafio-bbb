import { NavbarStyle } from "./Navbar.style";
import icon from "../../assets/icon.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return token.length > 32;
  };

  return (
    <NavbarStyle>
      <div className="container">
          <Link to="/">
            <div className="logo">
                <img src={icon} alt="icon" />
                <h4>Desafio BBB</h4>
            </div>
          </Link>
        <div className="button">
          <Link to={isLoggedIn() ? "/dashboard" : "/login"}>
            <button>{isLoggedIn() ? "Dashboard" : "Login"}</button>
          </Link>
        </div>
      </div>
    </NavbarStyle>
  );
}

export default Navbar;