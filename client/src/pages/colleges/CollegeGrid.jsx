import { uncChapelHill1 } from "../../assets/assets";
import { College } from "./College";

export const CollegeGrid = () => {
  const uncChapelHill = {
    name: "UNC Chapel Hill",
    kebabName: "unc-chapel-hill",
    location: "Chapel Hill, NC",
    privacy: "Public",
    length: "4 Year",
    type: "Suburban",
    genRank: 29,
    numStudents: 29000,
    characteristic: "Test Optional",
  };

  const cornell = {
    name: "Cornell University",
    camelName: "cornell",
    kebabName: "cornell",
    location: "Ithaca, NY",
    privacy: "Private",
    length: "4 Year",
    type: "Rural",
    genRank: 8,
    numStudents: 14000,
    characteristic: "Test Optional",
  };

  const harvard = {
    name: "Harvard University",
    camelName: "harvard",
    kebabName: "harvard",
    location: "Boston, MA",
    privacy: "Private",
    length: "4 Year",
    type: "Urban",
    genRank: 1,
    numStudents: 8000,
    characteristic: "Test Optional",
  };

  return (
    <div className="container-fluid px-5">
      <div className="row gx-5 gy-5">
        <College college={uncChapelHill} />
        <College college={cornell} />
        <College college={harvard} />
      </div>
    </div>
  );
};
