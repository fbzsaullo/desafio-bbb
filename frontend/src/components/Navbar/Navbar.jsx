import { NavbarStyle } from "./Navbar.style";
import icon from "../../assets/icon.svg";

const Navbar = () => {
  return (
    <NavbarStyle>
      <div className="container">
        <div className="logo">
          <img src={icon} alt="icon" />
          <h4>Desafio BBB</h4>
        </div>
        <div className="button">
          <button>Login</button>
        </div>
      </div>
    </NavbarStyle>
  );
}

export default Navbar;