import { College } from "./College";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "react-bootstrap-icons";
import { useSearchParams } from "react-router-dom";

export const CollegeGrid = () => {
  const [colleges, setColleges] = useState([]);

  const [savedColleges, setSavedColleges] = useState([]);

  const [shouldUpdate, updateSaved] = useState(0);

  const userID = window.localStorage.getItem("userID");

  const [params, setParams] = useSearchParams();

  // Get a specific query parameter
  const searchQuery = params.get("search");

  useEffect(() => {
    const url = searchQuery
      ? `http://${
          import.meta.env.VITE_IP
        }:5000/api/colleges/search?search=${searchQuery}`
      : `http://${import.meta.env.VITE_IP}:5000/api/colleges`;

    const getColleges = async () => {
      const res = await axios.get(url);
      const newColleges = res.data;
      setColleges(newColleges);
    };

    getColleges();
    console.log(colleges);
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

  const [newParams, setNewParams] = useState("");

  return (
    <div className="container-fluid px-5">
      <div className="search-bar-container position-relative">
        <form className="search-box d-flex align-items-center py-4">
          <input
            type="text"
            className="search-input"
            placeholder="Start Looking For Something!"
            name="search"
            onChange={(e) => {
              setNewParams(e.target.value);
            }}
          />
          <a
            className="search-btn"
            type="submit"
            onClick={() => {
              setParams({ search: newParams });
              window.location.reload();
            }}
          >
            <Search />
          </a>
        </form>
      </div>

      {colleges.length === 0 && (
        <div className="vh-100 vw-100 text-center">
          <p className="display-5"> No Results Found</p>
          <p className="lead">
            New colleges are being added every day. Check back soon!
          </p>
        </div>
      )}

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
