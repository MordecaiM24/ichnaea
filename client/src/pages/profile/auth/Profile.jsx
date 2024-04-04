import { Auth } from "./Auth";
import { supabase } from "../../../App";
import { useEffect, useState } from "react";
import User from "../User";

export const Profile = () => {
  const [user, setUser] = useState(null);

  async function getUser() {
    console.log("getting user");
    const { data, error } = await supabase.auth.getSession();

    setUser(data?.session?.user);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (user) {
    return <User user={user} />;
  } else {
    return <Auth />;
  }
};

// If user is not logged in, render sign up page. If user is logged in, render profile.
//
