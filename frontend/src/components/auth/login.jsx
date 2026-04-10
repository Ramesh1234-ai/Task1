import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api.js";
import "./auth.css";
export default function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (!email || !password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      const response = await authAPI.login(email, password);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!email || !password || !confirmPassword) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      const response = await authAPI.signup(email, password, confirmPassword);
      
      setSuccess("✓ Admin account created successfully! Please login.");
      
      // Clear form and switch to login
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        setIsSignup(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  const handleToggle = () => {
    setIsSignup(!isSignup);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>School Management System</h1>
        <h2>{isSignup ? "Create Admin Account" : "Admin Login"}</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? (isSignup ? "Creating account..." : "Logging in...") : (isSignup ? "Create Account" : "Login")}
          </button>
        </form>

        <div className="auth-toggle">
          {!isSignup ? (
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={handleToggle} className="toggle-btn">
                Create one
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button type="button" onClick={handleToggle} className="toggle-btn">
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}