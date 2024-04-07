import { useState } from "react";
import { supabase } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function SignUp({ setHasAccount }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function signUpNewUser() {
    setLoading(true);
    const signUpRes = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    const { data, error } = signUpRes;

    if (error?.message === "User already registered") {
      // Add toast here. Also navigate to a signin page.

      toast.info(
        "Looks like you already have an account. How about we try logging in?",
        {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        },
      );

      setHasAccount(true);
    }

    console.log({ firstName });
    console.log({ lastName });
    const insertRes = await supabase
      .from("users")
      .insert([
        { id: data.user.id, first_name: firstName, last_name: lastName, email },
      ]);

    console.log(signUpRes);
    console.log(insertRes);
    navigate(`/welcome?user=${data.user.id}`);

    setLoading(false);
  }

  return (
    <form
      //No idea why but putting whole thing as tw-w-3/5 breaks it. Keep it like this until further notice.
      className="tw-flex tw-max-w-xl tw-flex-col tw-items-center tw-gap-y-6 tw-px-4 tw-pt-8 md:tw-w-3/5 lg:tw-w-3/5"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert("Passwords don't match.");
          return;
        }
        signUpNewUser();
      }}
    >
      <p className="tw-text-5xl tw-font-light">Sign Up</p>

      <div className="tw-flex tw-w-full tw-flex-col">
        <input
          required
          autoComplete="off"
          className="tw-w-full tw-rounded tw-border tw-border-slate-300 tw-bg-transparent tw-px-2 tw-py-2 autofill:tw-text-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="email">Email address</label>
      </div>

      <div className="flex-row tw-flex tw-w-full tw-gap-x-2">
        <div className="tw-flex tw-w-full tw-flex-col">
          <input
            required
            className="tw-rounded tw-border tw-border-slate-300 tw-bg-transparent tw-px-2 tw-py-2"
            id="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label htmlFor="firstName">First Name</label>
        </div>

        <div className="tw-flex tw-w-full tw-flex-col">
          <input
            required
            className="tw-rounded tw-border tw-border-slate-300 tw-bg-transparent tw-px-2 tw-py-2"
            id="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
      </div>

      <div className="flex-row tw-flex tw-w-full tw-gap-x-2">
        <div className="tw-flex tw-w-full tw-flex-col">
          <input
            required
            type="password"
            className="tw-rounded tw-border tw-border-slate-300 tw-bg-transparent tw-px-2 tw-py-2"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="tw-flex tw-w-full tw-flex-col">
          <input
            required
            type="password"
            className="tw-rounded tw-border tw-border-slate-300 tw-bg-transparent tw-px-2 tw-py-2"
            id="confirmPassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <label htmlFor="password">Confirm Password</label>
        </div>
      </div>

      <button
        type="submit"
        className="tw-w-full tw-rounded-md tw-border tw-border-black tw-p-2 tw-text-xl tw-font-normal tw-transition-all tw-duration-200 hover:tw-bg-black hover:tw-text-white focus:tw-bg-black focus:tw-text-white"
        disabled={loading}
      >
        Sign Up
      </button>

      <div className="tw-flex tw-w-full tw-items-center tw-justify-around">
        <p>Already have an account?</p>
        <button
          className="tw-underline"
          onClick={() => {
            setHasAccount(true);
          }}
        >
          Login
        </button>
      </div>

      <ToastContainer />
    </form>
  );
}
