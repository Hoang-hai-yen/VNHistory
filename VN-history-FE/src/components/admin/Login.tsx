import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { useLoginMutation } from "../../hooks/api/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 👇 state hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({
        email: username,
        password: password,
      });

      navigate("/dashboard");

    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Sai tài khoản hoặc mật khẩu!"
      );
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1 className="title">
          Lịch Sử Việt Nam
        </h1>

        <p className="subtitle">
          ADMIN PORTAL
        </p>

        <form onSubmit={handleLogin}>

          {/* Username */}
          <div className="input-group">

            <label>
              Tên đăng nhập
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          {/* Password */}
          <div className="input-group">

            <label>
              Mật khẩu
            </label>

            <div
              style={{
                position: "relative",
              }}
            >

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={{
                  width: "95%",
                  // paddingRight: "0px",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {showPassword
                  ? "Ẩn"
                  : "Hiện"}
              </button>

            </div>
          </div>

          <button className="login-btn">
            Đăng nhập
          </button>

        </form>

        {error && (
          <p className="error-msg">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;
