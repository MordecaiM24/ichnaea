import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const Auth = () => {
  const [isUser, setIsUser] = useState(false);

  return isUser ? (
    <Login setIsUser={setIsUser} />
  ) : (
    <Register setIsUser={setIsUser} />
  );
};

const Login = (props) => {
  const { setIsUser } = props;

  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("username", username);
    } catch (error) {
      console.log(error);
      alert("Username or password is incorrect");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button
        type="button"
        onClick={() => {
          setIsUser(false);
        }}
      >
        Don't have an account? Sign Up
      </button>
    </div>
  );
};

const Register = (props) => {
  const { setIsUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username,
          password,
        }
      );
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("username", username);
    } catch (error) {
      alert("User already exists");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button
        type="button"
        onClick={() => {
          setIsUser(true);
        }}
      >
        Already a user? Login
      </button>
    </div>
  );
};
