import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customOptions, setCustomOptions] = useState([]);
  const predefinedOptions = ["Sports", "Music", "Technology"];
  const [error, setError] = useState("");

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleCustomOptionSubmit = (e) => {
    e.preventDefault();
    const Option = e.target.elements.option.value.trim();
    const newOption =
      Option.charAt(0).toUpperCase() + Option.slice(1).toLowerCase();
    if (
      !predefinedOptions.includes(newOption) &&
      !customOptions.includes(newOption)
    ) {
      setCustomOptions([...customOptions, newOption]);
      e.target.elements.option.value = "";
    }
  };

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else if (!isValidEmail(email)) {
      setError("Invalid email address.");
    } else if (!isValidUsername(username)) {
      setError("Username can only contain letters, numbers, and underscores.");
    } else if (selectedOptions.length < 1) {
      setError("Select atleast one preference.");
    } else {
      try {
        console.log(selectedOptions);
        const response = await axios.post(
          "https://news-aggregator-3fk9.onrender.com/signup",
          {
            username,
            email,
            password,
            preferences: selectedOptions,
          }
        );
        console.log("Response Data:", response.data);
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          handleSuccess("Registration successful.");
          setTimeout(() => {
            navigate("/forYou");
          }, 1000);
        } else {
          handleError("An error occurred while registering.");
        }
      } catch (error) {
        if (error.response) {
          console.log("Error response:", error.response);
          const errorMessage = error.response.data.message;
          handleError(errorMessage);
        } else {
          handleError("An error occurred while registering.");
        }
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };
  const isValidUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    return usernameRegex.test(username);
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Register</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="Preference">Preferences:</label>
        <br />
        {predefinedOptions.concat(customOptions).map((option) => (
          <label htmlFor="option" id="prefoptions" key={option}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}

        <form onSubmit={handleCustomOptionSubmit}>
          <input className="form-control" type="text" name="option" />
          <button className="btn btn-secondary" type="submit">
            Add Preference
          </button>
        </form>
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>
      <p >
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;


