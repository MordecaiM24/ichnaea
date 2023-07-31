import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

export const User = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [savedColleges, setSavedColleges] = useState([]);

  const [updateSaved, shouldUpdate] = useState(0);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      const getSavedColleges = async () => {
        const res = await axios.get(
          `http://192.168.1.77:5000/api/users/savedColleges/${userID}`
        );

        setSavedColleges(res.data);
      };

      getSavedColleges();
    }
  }, [shouldUpdate]);

  console.log(savedColleges);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/profile");
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
      <h1>Saved Colleges:</h1>
      {savedColleges.map((college) => {
        return <div>{college.fullName}</div>;
      })}

      <h1>Supplemental Essays:</h1>
      {savedColleges.map((college) => {
        return (
          <div>
            {college.fullName}: {college.suppEssays[0]}
          </div>
        );
      })}
    </>
  );
};
