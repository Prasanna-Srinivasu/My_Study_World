import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react";

import LiquidButton from "../../components/common/LiquidButton/LiquidButton";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    /*
      IMPORTANT:
      This is intentionally NOT fake authentication.

      The real API/backend authentication will be connected
      in the next authentication step.

      For now we only verify that the form works.
    */

    setError(
      "Login form is ready. Real authentication will be connected next.",
    );
  };

  return (
    <main className="login-page">
      <div className="login-background">
        <span className="login-orb orb-one" />
        <span className="login-orb orb-two" />
        <span className="login-orb orb-three" />

        <span className="floating-symbol symbol-one">✦</span>
        <span className="floating-symbol symbol-two">◇</span>
        <span className="floating-symbol symbol-three">✧</span>
        <span className="floating-symbol symbol-four">+</span>
      </div>

      <section className="login-container">
        <div className="login-brand">
          <div className="login-logo">
            <BookOpen size={25} />
          </div>

          <span>MY STUDY WORLD</span>
        </div>

        <div className="login-card">
          <div className="login-card-header">
            <span className="login-welcome">WELCOME BACK ✨</span>

            <h1>
              Continue your
              <br />
              <span>learning journey.</span>
            </h1>

            <p>Sign in and keep building your skills, one topic at a time.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email</label>

              <div className="login-input-wrapper">
                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>

              <div className="login-input-wrapper">
                <Lock size={18} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-button"
                onClick={() => {
                  setError(
                    "Password reset will be connected with authentication.",
                  );
                }}
              >
                Forgot password?
              </button>
            </div>

            <LiquidButton type="submit">LOGIN</LiquidButton>

            {error && <div className="login-message">{error}</div>}
          </form>

          <div className="login-divider">
            <span />
            <p>OR</p>
            <span />
          </div>

          <p className="signup-text">
            Don't have an account?{" "}
            <button
              type="button"
              className="signup-link-button"
              onClick={() =>
                setError("Sign up will be connected with authentication next.")
              }
            >
              Create account
            </button>
          </p>
        </div>

        <p className="login-footer">Learn • Practice • Build • Grow 🚀</p>
      </section>
    </main>
  );
}

export default Login;
