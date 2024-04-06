import React, { useEffect, useState } from "react";
import { supabase } from "../../App";

export default function User() {
  const [user, setUser] = useState(null);

  async function getUser() {
    const user = (await supabase.auth.getSession()).data.session.user;

    setUser(user);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    location.reload();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="tw-w-full tw-px-10">
      <div className="tw-flex tw-items-center tw-justify-around">
        <p>user:</p>
        <p>{JSON.stringify(user)}</p>
        <button
          className="tw-w-full tw-rounded-lg tw-bg-primary tw-p-4 tw-px-6 tw-text-white"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
