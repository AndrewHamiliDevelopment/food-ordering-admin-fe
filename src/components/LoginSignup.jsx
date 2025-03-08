import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function LoginSignup({ isOpen, setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      if (response.status === 200) {
        sessionStorage.setItem("user-info", JSON.stringify(response.data));
        navigate("/home");
        setIsOpen(false);
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleSignUp = async () => {
    if (password !== reEnterPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        firstName,
        lastName,
        email,
        address,
        mobile,
        password,
      });
      if (response.status === 201) {
        sessionStorage.setItem("user-info", JSON.stringify(response.data));
        navigate("/home");
        setIsOpen(false);
      }
    } catch (error) {
      setError("Error during sign-up. Please try again.");
    }
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && setIsOpen(false)} style={modalBackdrop}>
      <div style={modalContainer}>
        <button onClick={() => setIsOpen(false)} style={closeButton}>&times;</button>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        {isSignUp && (
          <>
            <input type="text" placeholder="First Name" style={inputStyle} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" style={inputStyle} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="Address" style={inputStyle} value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="tel" placeholder="Mobile Number" style={inputStyle} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} />
          </>
        )}
        <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        <div style={inputWrapper}>
          <input type={showPassword ? "text" : "password"} placeholder="Password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
          <div style={eyeIcon} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</div>
        </div>
        {isSignUp && (
          <div style={inputWrapper}>
            <input type={showReEnterPassword ? "text" : "password"} placeholder="Re-enter Password" style={inputStyle} value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} />
            <div style={eyeIcon} onClick={() => setShowReEnterPassword(!showReEnterPassword)}>{showReEnterPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</div>
          </div>
        )}
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <button onClick={isSignUp ? handleSignUp : handleLogin} style={buttonStyle}>{isSignUp ? "Sign Up" : "Log In"}</button>
        <a href="#" onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}</a>
      </div>
    </div>
  );
}

const modalBackdrop = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" };
const modalContainer = { background: "white", padding: "20px", borderRadius: "8px", width: "400px", textAlign: "center", position: "relative" };
const closeButton = { position: "absolute", top: "10px", right: "10px", border: "none", background: "none", fontSize: "20px", cursor: "pointer" };
const inputStyle = { width: "100%", padding: "10px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" };
const inputWrapper = { position: "relative" };
const eyeIcon = { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" };
const buttonStyle = { width: "100%", padding: "10px", background: "gray", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };

export default LoginSignup;
