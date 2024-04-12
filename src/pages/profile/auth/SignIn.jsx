import { useState } from "react";
import { supabase } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";

export function SignIn({ setHasAccount }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  async function signInWithEmail() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.name === "AuthApiError") {
      setFormError(true);
      setLoading(false);
      return;
    }

    location.reload();

    setLoading(false);
  }

  return (
    <form
      className="flex max-w-xl flex-col items-center gap-y-6 px-4 pt-8 md:w-2/5 lg:w-3/5"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();

        signInWithEmail();
      }}
    >
      <p className="text-5xl font-light">Welcome Back</p>

      <div className="flex w-full flex-col">
        <input
          required
          type="email"
          className="w-full rounded border border-slate-400 bg-transparent px-2 py-2"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="email">Email address</label>
      </div>

      <div className="flex w-full flex-col">
        <input
          required
          type="password"
          className="rounded border border-slate-400 bg-transparent px-2 py-2"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        {!!formError && (
          <p className="pt-2 text-red-500">Incorrect username or password</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md border border-black p-2 text-xl font-normal transition-all duration-200 hover:bg-black hover:text-white focus:bg-black focus:text-white disabled:border-gray-50 disabled:bg-gray-300 disabled:text-gray-600"
        disabled={loading}
      >
        Log In
      </button>

      <div className="flex w-full items-center justify-around">
        <p>Don't have an account?</p>
        <button
          type="button"
          className="underline"
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
