import { useCookies } from "react-cookie";

export const User = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/profile");
  };

  return <button onClick={logout}>Logout</button>;
};
