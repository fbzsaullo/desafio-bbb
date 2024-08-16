import { useState } from "react";
import { LoginStyled } from "./Login.style";
import { login } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      localStorage.setItem("apiKey", response.api_key);
    } catch (error) {
      console.error("Login failed", error);
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
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </LoginStyled>
  );
};

export default Login;
