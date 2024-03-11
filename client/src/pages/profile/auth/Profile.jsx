import { Auth } from "./Auth";
import { User } from "../User";
import { supabase } from "../../../App";

export const Profile = () => {
  return localStorage.getItem("userID") ? <User /> : <Auth />;
};

// If user is not logged in, render sign up page. If user is logged in, render profile.
//
