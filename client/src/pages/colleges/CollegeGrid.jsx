import { College } from "./College";
import { useState, useEffect } from "react";
import axios from "axios";

export const CollegeGrid = () => {
  const [colleges, setColleges] = useState([]);

  const [savedColleges, setSavedColleges] = useState([]);

  const [shouldUpdate, updateSaved] = useState(0);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    const getColleges = async () => {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:5000/api/colleges`
      );
      const newColleges = res.data;
      setColleges(newColleges);
    };

    getColleges();
  }, []);

  useEffect(() => {
    if (userID) {
      const getSavedColleges = async () => {
        const res = await axios.get(
          `http://${
            import.meta.env.VITE_IP
          }:5000/api/users/savedColleges/${userID}`
        );

        setSavedColleges(res.data);
      };

      getSavedColleges();
      console.log(savedColleges);
    }
  }, [shouldUpdate]);

  return (
    <div className="container-fluid px-5">
      <div className="row gx-5 gy-5">
        {colleges.map((college) => {
          return (
            <College
              college={college}
              savedColleges={savedColleges}
              setSavedColleges={setSavedColleges}
              shouldUpdate={shouldUpdate}
              updateSaved={updateSaved}
              key={college._id}
            />
          );
        })}
      </div>
    </div>
  );
};
