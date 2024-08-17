import { useState } from "react";
import { LoginStyled } from "./Login.style";
import { login } from "../../api";
import Notification from "../../components/Notification/Notification";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const token = response.data.token;
      const expiresAt = response.data.expires_at;

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiresAt", expiresAt);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.response.data.error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <LoginStyled>
      <div className="card">
        <h2>Login</h2>
        <div className="inputs">
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
      <Notification 
        message={error === 'Invalid email or password'
          ? "Email ou senha inválidos"
          : error}
        show={showError} 
      />
    </LoginStyled>
  );
};

export default Login;
