import { uncChapelHill1 } from "../../assets/assets";
import { College } from "./College";
import { useState, useEffect } from "react";
import axios from "axios";

export const CollegeGrid = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const getColleges = async () => {
      const res = await axios.get("http://localhost:5000/api/colleges");
      const newColleges = res.data;
      setColleges(newColleges);
    };
    getColleges();
  }, []);

  return (
    <div className="container-fluid px-5">
      <div className="row gx-5 gy-5">
        {colleges.map((college) => {
          return <College college={college} />;
        })}
      </div>
    </div>
  );
};
