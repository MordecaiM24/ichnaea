import { useState } from "react";
import { supabase } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp.jsx";
import { SignIn } from "./SignIn.jsx";

export const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);
  return (
    <div className="-tw-mt-4 tw-flex tw-min-h-screen tw-w-full tw-items-start tw-justify-center tw-bg-sky-50 tw-text-black ">
      {hasAccount ? (
        <SignIn setHasAccount={setHasAccount} />
      ) : (
        <SignUp setHasAccount={setHasAccount} />
      )}
    </div>
  );
};
