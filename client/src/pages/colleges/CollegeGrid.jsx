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
      <div className=" d-flex justify-content-start align-items-center mb-3">
        <div className="c-pointer form border h-100 hover-expand d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="form-control form-input form-hover shadow-none"
            placeholder="Search anything..."
            name="search"
            id="search"
          />
          <label htmlFor="search">
            <Search className="fs-4 c-pointer" />
          </label>
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
