import { College } from "./College";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "react-bootstrap-icons";

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
    }
  }, [shouldUpdate]);

  return (
    <div className="container-fluid px-5">
      <div className="search-bar-container  position-relative">
        <div className="search-box d-flex align-items-center py-4">
          <input
            type="text"
            className="search-input"
            placeholder="Start Looking For Something!"
          />
          <a className="search-btn" href="#">
            <Search />
          </a>
        </div>
      </div>

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
