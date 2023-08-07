import { Auth } from "./Auth";
import { User } from "../User";
import { useCookies } from "react-cookie";

export const Profile = () => {
  return localStorage.getItem("userID") ? <User /> : <Auth />;
};

// If user is not logged in, render sign up page. If user is logged in, render profile.
//
