import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Google } from "react-bootstrap-icons";
import { auth, signInWithGoogle } from "src/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);

  return hasAccount ? (
    <Login setHasAccount={setHasAccount} />
  ) : (
    <Register setHasAccount={setHasAccount} />
  );
};

const Login = (props) => {
  const { setHasAccount } = props;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const login = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      localStorage.setItem("userID", login.user.uid);
      await axios.post(
        `http://${import.meta.env.VITE_IP}:5000/api/users/login`
      );
      window.location.reload();
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6 my-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 my-5">
            <form>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-md"
                  onChange={(e) => handleChange(e)}
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-md"
                  onChange={(e) => handleChange(e)}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                {/* Checkbox */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberance"
                    name="rememberance"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="rememberance">
                    Remember me
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSubmit}
              >
                Sign in
              </button>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <button
                className="btn btn-outline-secondary btn-lg w-100 d-flex align-items-center justify-content-center column-gap-1"
                onClick={signInWithGoogle}
                type="button"
              >
                <Google />
                Continue with Google
              </button>
            </form>

            {/* Switch view */}
            <div className="d-flex justify-content-around align-items-center mt-4">
              <p className="mb-0">Don't have an account?</p>
              <a
                onClick={() => {
                  setHasAccount(false);
                }}
                className="link-opacity-100"
                style={{ cursor: "pointer" }}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Register = (props) => {
  const { setHasAccount } = props;

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signUp = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      localStorage.setItem("userID", signUp.user.uid);
      await axios.post(
        `http:/${import.meta.env.VITE_IP}:5000/api/users/register`,
        signUp
      );
      // Add "remember me state" to use sessionstorage instead of local storage if remember me not checked
      window.location.reload();
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6 my-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 my-5">
            <form>
              {/* Full name */}
              <div className="d-flex justify-content-between mb-4">
                {/* First Name */}
                <div className="form-outline w-50 me-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control form-control-md"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label className="form-label" htmlFor="firstName">
                    {" "}
                    First Name{" "}
                  </label>
                </div>

                {/* Last Name */}
                <div className="form-outline w-50 ms-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-control form-control-md"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label className="form-label" htmlFor="lastName">
                    {" "}
                    Last Name{" "}
                  </label>
                </div>
              </div>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-md"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>

              {/* Password & confirm password */}
              <div className="d-flex justify-content-between mb-4">
                <div className="form-outline w-50 me-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-md"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label className="form-label" htmlFor="password">
                    {" "}
                    Password{" "}
                  </label>
                </div>

                <div className="form-outline w-50 ms-1">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control form-control-md"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSubmit}
              >
                Sign up
              </button>

              {/* Divider */}
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              {/* Google log in */}
              <button
                className="btn btn-outline-secondary btn-lg w-100 d-flex align-items-center justify-content-center column-gap-1"
                onClick={signInWithGoogle}
                type="button"
              >
                <Google />
                Continue with Google
              </button>
            </form>

            {/* Switch view */}
            <div className="d-flex justify-content-around align-items-center mt-4">
              <p className="mb-0">Already have an account?</p>
              <a
                onClick={() => {
                  setHasAccount(true);
                }}
                className="link-opacity-100"
                style={{ cursor: "pointer" }}
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
