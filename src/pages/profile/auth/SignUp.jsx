import { useState } from "react";
import { supabase } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    await supabase.from("todos").insert([
      {
        user_id: data.user.id,
        name: "Ask for / upload teacher recommendations",
        status: 0,
      },
      {
        user_id: data.user.id,
        name: "Upload ACT",
        status: 0,
      },
      {
        user_id: data.user.id,
        name: "Upload SAT",
        status: 0,
      },
      {
        user_id: data.user.id,
        name: "Finish Common App Essay",
        status: 0,
      },
      {
        user_id: data.user.id,
        name: "Upload extracurriculars",
        status: 0,
      },
    ]);

    console.log(signUpRes);
    console.log(insertRes);
    location.reload();

    setLoading(false);
  }

  return (
    <form
      //No idea why but putting whole thing as w-3/5 breaks it. Keep it like this until further notice.
      className="flex max-w-xl flex-col items-center gap-y-6 px-4 pt-8 md:w-3/5 lg:w-3/5"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.info("Passwords don't match.", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          return;
        }

        if (password.length < 6) {
          toast.info("Passwords must be at least 6 characters.", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          return;
        }
        signUpNewUser();
      }}
    >
      <p className="text-5xl font-light">Sign Up</p>

      <div className="flex w-full flex-col">
        <input
          required
          autoComplete="off"
          type="email"
          id="email"
          className="w-full rounded border border-slate-300 bg-transparent px-2 py-2 autofill:text-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="email">Email address</label>
      </div>

      <div className="flex w-full flex-row gap-x-2">
        <div className="flex w-full flex-col">
          <input
            required
            className="rounded border border-slate-300 bg-transparent px-2 py-2"
            id="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label htmlFor="firstName">First Name</label>
        </div>

        <div className="flex w-full flex-col">
          <input
            required
            className="rounded border border-slate-300 bg-transparent px-2 py-2"
            id="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
      </div>

      <div className="flex w-full flex-row gap-x-2">
        <div className="flex w-full flex-col">
          <input
            required
            type="password"
            className="rounded border border-slate-300 bg-transparent px-2 py-2"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="flex w-full flex-col">
          <input
            required
            type="password"
            className="rounded border border-slate-300 bg-transparent px-2 py-2"
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
        className="w-full rounded-md border border-black p-2 text-xl font-normal transition-all duration-200 hover:bg-black hover:text-white focus:bg-black focus:text-white disabled:border-gray-50 disabled:bg-gray-300 disabled:text-gray-600"
        disabled={loading}
      >
        Sign Up
      </button>

      <div className="flex w-full items-center justify-around">
        <p>Already have an account?</p>
        <button
          type="button"
          className="underline"
          onClick={() => {
            setHasAccount(true);
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
}
