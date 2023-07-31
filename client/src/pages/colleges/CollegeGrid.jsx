import { uncChapelHill1 } from "../../assets/assets";
import { College } from "./College";
import { useState, useEffect } from "react";
import axios from "axios";

export const CollegeGrid = () => {
  const [colleges, setColleges] = useState([]);

  const [savedColleges, setSavedColleges] = useState([]);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    const getColleges = async () => {
      const res = await axios.get("http://localhost:5000/api/colleges");
      const newColleges = res.data;
      setColleges(newColleges);
    };

    const getSavedColleges = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/savedColleges/${userID}`
      );

      setSavedColleges(res.data);
    };

    getSavedColleges();

    getColleges();
    console.log(savedColleges);
  }, []);

  return (
    <div className="container-fluid px-5">
      <div className="row gx-5 gy-5">
        {colleges.map((college) => {
          return (
            <College
              college={college}
              savedColleges={savedColleges}
              setSavedColleges={setSavedColleges}
              key={college._id}
            />
          );
        })}
      </div>
    </div>
  );
};
