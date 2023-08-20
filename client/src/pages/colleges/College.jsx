import { Plus, PlusLg, Trash3Fill } from "react-bootstrap-icons";
import "./College.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMeasure } from "react-use";

export const College = (props) => {
  const [ref, { width, height }] = useMeasure();

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
  // const [isLoading, setLoading] = useState(false);
  const [modalVis, showModal] = useState(false);

  const navigate = useNavigate();
  // TODO: Make loading animation for user feedback when adding college. Grey out card, possibly put spinner in the middle.

  useEffect(() => {
    const savedState = savedColleges.find((college) => college._id === _id);
    if (isCollegeSaved !== savedState) {
      setCollegeSaved(savedColleges.find((college) => college._id === _id));
    }
  }, [savedColleges]);

  const handleMouseOver = () => {
    setVisibility(true);
  };

  const handleMouseOut = () => {
    setVisibility(false);
  };

  const handleClick = async () => {
    if (!userID) {
      toast.info("You must be logged in to save colleges and scholarships.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } else if (isCollegeSaved) {
      const res = await axios.delete(
        `http://${
          import.meta.env.VITE_IP
        }:5000/api/users/removeCollege/${userID}/${_id}`
      );
      updateSaved(shouldUpdate + 1);
      setCollegeSaved(!isCollegeSaved);
      setVisibility(false);
    } else {
      showModal(true);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="col-12 col-md-6 col-xl-4 pb-3">
  //       <div className="card h-100 mb-1" aria-hidden="true">
  //         <div className="row gx-0 h-100">
  //           <div className="col-6 col-md-5 bg-gray placeholder-glow h-100 rounded-start"></div>
  //           <div className="col-6 col-md-7 h-100">
  //             <div className="card-body p-2 h-100 d-flex flex-column justify-content-between overflow-hidden">
  //               <p className="lead mb-0 placeholder-glow">
  //                 <span className="placeholder col-6"></span>
  //               </p>
  //               <small className=" d-sm-block placeholder-glow">
  //                 <span className="placeholder col-7"></span>
  //               </small>
  //               <small className=" d-sm-block placeholder-glow">
  //                 <span className="placeholder col-12"></span>
  //               </small>
  //               <small className=" d-sm-block placeholder-glow">
  //                 <span className="placeholder col-8"></span>
  //               </small>
  //               <small className=" d-sm-block placeholder-glow">
  //                 <span className="placeholder col-9"></span>
  //               </small>
  //               <small className=" d-sm-block placeholder-glow">
  //                 <span className="placeholder col-5"></span>
  //               </small>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div
        className="card mb-3 border-primary border-2 p-0 btn btn-outline-primary text-start college-card"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={ref}
      >
        {/* Row gx-0 makes a horizontal card with no space */}
        <div className="row gx-0">
          <div className="col-6 col-md-5 bg-primary">
            <img
              src={`src/assets/colleges-new/${college.kebabName}-1.webp`}
              className="img-fluid rounded-start w-100 h-100 object-fit-cover"
              style={{ aspectRatio: 1 }}
            />
          </div>
          <div className="col-6 col-md-7">
            <div className="card-body p-2 position-relative h-100">
              <div
                className={
                  "card-text h-100" + (width > 330 && " flex-column-between")
                }
              >
                {/* TODO: change info depending on screen size */}

                <p className="lead mb-0">
                  {fullName.length < 30 ? fullName : shortName}
                </p>

                <small className="d-sm-block">
                  <strong>{location}</strong>
                </small>

                {width > 330 && (
                  <small className=" d-sm-block">
                    {length} &#183; {privacy} &#183; {setting}
                  </small>
                )}
                {width > 330 && (
                  <small className=" d-sm-block">
                    General Ranking: #{genRanking}
                    {/* TODO: add (tie) if genRanking matches other colleges genRanking */}
                  </small>
                )}
                {width > 330 && (
                  <small className=" d-sm-block">
                    {numStudents.toLocaleString("en-US")} Undergraduate Students
                    {/* {numStudents} */}
                  </small>
                )}
                {width > 330 && (
                  <small className=" d-sm-block">{characteristic}</small>
                )}
              </div>
            </div>
          </div>
        </div>
        {addBtnVisibility && (
          //TODO: Use isCollegeSaved to see if college is saved, and if so, replace plus button with trash button

          <button
            className="btn btn-outline-secondary rounded-circle add-college-btn btn-lg border-2"
            // onClick={renderModal}
            onClick={handleClick}
          >
            {isCollegeSaved ? <Trash3Fill /> : <PlusLg />}
          </button>
        )}
      </div>
      {modalVis && (
        <Modal
          isCollegeSaved={isCollegeSaved}
          updateSaved={updateSaved}
          shouldUpdate={shouldUpdate}
          setCollegeSaved={setCollegeSaved}
          setVisibility={setVisibility}
          college={college}
          showModal={showModal}
        />
      )}

      <ToastContainer />
    </div>
  );
};

const Modal = (props) => {
  const {
    isCollegeSaved,
    updateSaved,
    shouldUpdate,
    setCollegeSaved,
    setVisibility,
    college,
    showModal,
  } = props;

  const [selected, setSelected] = useState("regularDecision");

  const handleSaveUpdate = async () => {
    await axios.patch(
      `http://${import.meta.env.VITE_IP}:5000/api/users/saveCollege`,
      {
        userID: localStorage.getItem("userID"),
        collegeToSave: college._id,
        decisionType: selected,
      }
    );
    updateSaved(shouldUpdate + 1);

    setCollegeSaved(!isCollegeSaved);
    setVisibility(false);
    showModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveUpdate(props.college);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-around position-fixed top-0 start-0 college-modal">
      <div className="h-fit w-fit border border-primary border-3 rounded bg-white position-relative p-3">
        <p className="ps-1 pb-2">
          Which plan would you like for {college.shortName}?
        </p>

        <form
          onChange={(e) => {
            handleChange(e);
          }}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {college.deadlines.map((deadline) => {
            return (
              <div className="form-group d-flex align-items-center column-gap-2">
                <input
                  type="radio"
                  id={deadline.decisionType}
                  value={deadline.decisionType}
                  name="decision"
                />
                <label htmlFor={deadline.decisionType}>
                  {deadline.specialName} (
                  {new Date(deadline.date).toLocaleString("default", {
                    month: "long",
                    day: "numeric",
                  })}
                  )
                </label>
              </div>
            );
          })}

          <div className="mt-5">
            <button
              className="btn btn-outline-secondary position-absolute college-close"
              onClick={() => {
                showModal(false);
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn btn-outline-primary position-absolute college-submit"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
