import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login", // ✅ sửa ở đây
      {
        email: username, // ⚠️ backend bạn đang dùng email, không phải username
        password: password,
      }
    );

    console.log(res.data);
    console.log("TOKEN:");
    console.log(res.data.token);

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (error: any) {
    console.error(error.response?.data || error.message);

    setError(
      error.response?.data?.message || "Sai tài khoản hoặc mật khẩu!"
    );
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">Lịch Sử Việt Nam</h1>
        <p className="subtitle">ADMIN PORTAL</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn">Đăng nhập</button>
        </form>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}

export default Login;