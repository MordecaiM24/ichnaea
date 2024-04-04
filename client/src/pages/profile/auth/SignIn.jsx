import { useState } from "react";
import { supabase } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";

export function SignIn({ setHasAccount }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmail() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Sign in results");
    console.log({ data, error });

    location.reload();

    setLoading(false);
  }

  return (
    <form
      className="tw-flex tw-max-w-xl tw-flex-col tw-items-center tw-gap-y-6 tw-px-4 tw-pt-8 md:tw-w-2/5 lg:tw-w-3/5"
      onSubmit={(e) => {
        e.preventDefault();

        signInWithEmail();
      }}
    >
      <p className="tw-text-5xl tw-font-light">Welcome Back</p>

      <div className="tw-flex tw-w-full tw-flex-col">
        <input
          required
          type="email"
          className="tw-w-full tw-rounded tw-border tw-border-slate-300 tw-bg-transparent tw-px-2 tw-py-1 autofill:tw-text-black"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="email">Email address</label>
      </div>

      <div className="tw-flex tw-w-full tw-flex-col">
        <input
          required
          type="password"
          className="tw-rounded tw-border tw-border-slate-300 tw-bg-transparent tw-px-2 tw-py-1"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
      </div>

      <button
        type="submit"
        className="tw-w-full tw-rounded-md tw-border tw-border-black tw-p-2 tw-text-xl tw-font-normal tw-transition-all tw-duration-200 hover:tw-bg-black hover:tw-text-white focus:tw-bg-black focus:tw-text-white"
        disabled={loading}
      >
        Log In
      </button>

      <div className="tw-flex tw-w-full tw-items-center tw-justify-around">
        <p>Don't have an account?</p>
        <button
          className="tw-underline"
          onClick={() => {
            setHasAccount(false);
          }}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
