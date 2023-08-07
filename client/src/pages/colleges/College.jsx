import { Plus, PlusLg, Trash3Fill } from "react-bootstrap-icons";
import "./College.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const College = (props) => {
  // Is college saved will look at _id and check if it has a match in savedColleges. Each button should be rendered as isSaved ? trash : plus
  // Whenever the button is clicked, if the college is saved it will delete it and reload savedColleges.

  const college = props.college;

  const savedColleges = props.savedColleges;

  const shouldUpdate = props.shouldUpdate;
  const updateSaved = props.updateSaved;

  const {
    fullName,
    kebabName,
    shortName,
    location,
    privacy,
    setting,
    genRanking,
    numStudents,
    _id,
  } = college;

  const userID = window.localStorage.getItem("userID");

  const [isCollegeSaved, setCollegeSaved] = useState(false);

  const characteristic = "Test Optional";
  const length = "4 Year";

  const [addBtnVisibility, setVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  // TODO: Make loading animation for user feedback when adding college. Grey out card, possibly put spinner in the middle.

  useEffect(() => {
    setCollegeSaved(savedColleges.find((college) => college._id === _id));
  }, [savedColleges]);

  const handleMouseOver = () => {
    setVisibility(true);
  };

  const handleMouseOut = () => {
    setVisibility(false);
  };

  const handleClick = () => {
    if (!userID) {
      alert("You must be logged in to save colleges and scholarships");
      navigate("/profile");
    } else {
      handleSaveUpdate();
    }
  };

  const handleSaveUpdate = async () => {
    setLoading(true);
    if (isCollegeSaved) {
      const res = await axios.delete(
        `http://${
          import.meta.env.VITE_IP
        }:5000/api/users/removeCollege/${userID}/${_id}`
      );
      updateSaved(shouldUpdate + 1);
      setTimeout(() => {}, 500);
    } else {
      const res = await axios.patch(
        `http://${import.meta.env.VITE_IP}:5000/api/users/saveCollege`,
        { userID, collegeToSave: _id }
      );
      updateSaved(shouldUpdate + 1);
    }
    setLoading(false);
  };

  const imgLinks = {
    upenn: "https://ucarecdn.com/6a6dba25-379f-40c4-bf0c-5ea3e2a62f3c/",
    duke: "https://ucarecdn.com/5b794a55-7bdf-430a-ad74-bcc9922d9ddf/duke1.webp",
    princeton:
      "https://ucarecdn.com/8257edf6-c3a7-45b6-a05c-2bf1ec480c4d/princeton1.jpeg",
    jhu: "https://ucarecdn.com/00ad7e2c-3bf2-44c8-a5ff-f23870ac7015/jhu1.jpeg",
    uchicago:
      "https://ucarecdn.com/3fa70783-76a2-445f-beb7-0b1e47350fd4/uchicago1.jpeg",
    yale: "https://ucarecdn.com/29dc0f4d-836b-4e2c-9ed2-01166a50e7d8/yale1.webp",
    stanford:
      "https://ucarecdn.com/a99c6fdf-9a19-45e9-bd43-259030540036/stanford1.jpeg",
    mit: "https://ucarecdn.com/91147006-d5c3-4768-a201-b3d481c44c86/mit1.jpeg",
    caltech:
      "https://ucarecdn.com/e9a79a3a-99f3-4cef-b48c-2eb035085773/caltech1.jpeg",
    harvard:
      "https://ucarecdn.com/fe36e611-5930-4fa2-b815-12d7c1a550e2/harvard1.jpg",
  };

  if (isLoading) {
    return (
      <div className="col-12 col-md-6 col-xl-4 pb-3">
        <div class="card h-100 mb-1" aria-hidden="true">
          <div className="row gx-0 h-100">
            <div className="col-6 col-md-5 bg-gray placeholder-glow h-100 rounded-start"></div>
            <div className="col-6 col-md-7 h-100">
              <div className="card-body p-2 h-100 d-flex flex-column justify-content-between overflow-hidden">
                <p class="lead mb-0 placeholder-glow">
                  <span class="placeholder col-6"></span>
                </p>
                <small class="d-none d-sm-block placeholder-glow">
                  <span className="placeholder col-7"></span>
                </small>
                <small class="d-none d-sm-block placeholder-glow">
                  <span className="placeholder col-12"></span>
                </small>
                <small class="d-none d-sm-block placeholder-glow">
                  <span className="placeholder col-8"></span>
                </small>
                <small class="d-none d-sm-block placeholder-glow">
                  <span className="placeholder col-9"></span>
                </small>
                <small class="d-none d-sm-block placeholder-glow">
                  <span className="placeholder col-5"></span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-12 col-md-6 col-xl-4">
        <div
          className="card mb-3 border-primary border-2 p-0 btn btn-outline-primary text-start college-card"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {/* Row gx-0 makes a horizontal card with no space */}
          <div className="row gx-0">
            <div className="col-6 col-md-5 bg-primary">
              <img
                src={imgLinks[kebabName]}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-6 col-md-7">
              <div className="card-body p-2" style={{ height: "100%" }}>
                <div
                  className="card-text d-flex flex-column justify-content-between overflow-hidden"
                  style={{ height: "100%" }}
                >
                  {/* TODO: change info depending on screen size */}
                  <p className="lead mb-0">
                    {fullName.length < 30 ? fullName : shortName}
                  </p>
                  <small className="d-none d-sm-block">
                    <strong>{location}</strong>
                  </small>
                  <small className="d-none d-sm-block">
                    {length} &#183; {privacy ? "Public" : "Private"} &#183;{" "}
                    {setting}
                  </small>
                  <small className="d-none d-sm-block">
                    General Ranking: #{genRanking}
                    {/* TODO: add (tie) if genRanking matches other colleges genRanking */}
                  </small>
                  <small className="d-none d-sm-block">
                    {numStudents.toLocaleString("en-US")} Undergraduate Students
                    {/* {numStudents} */}
                  </small>
                  <small className="d-none d-sm-block">{characteristic}</small>
                </div>
              </div>
            </div>
          </div>
          {addBtnVisibility && (
            //TODO: Use isCollegeSaved to see if college is saved, and if so, replace plus button with trash button

            <button
              className="btn btn-outline-secondary rounded-circle add-college-btn btn-lg border-2"
              onClick={handleClick}
            >
              {isCollegeSaved ? <Trash3Fill /> : <PlusLg />}
              {/* <PlusLg /> */}
            </button>
          )}
        </div>
      </div>
    );
  }
};
