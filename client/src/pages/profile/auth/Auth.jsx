import { useState } from "react";
import { supabase } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp.jsx";
import { SignIn } from "./SignIn.jsx";

export const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);
  return (
    <div className="-mt-4 flex min-h-screen w-full items-start justify-center bg-sky-50 text-black ">
      {hasAccount ? (
        <SignIn setHasAccount={setHasAccount} />
      ) : (
        <SignUp setHasAccount={setHasAccount} />
      )}
    </div>
  );
};
