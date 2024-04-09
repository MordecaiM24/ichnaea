import React, { useEffect, useState } from "react";
import { PlusLg, Trash3Fill } from "react-bootstrap-icons";
import { supabase } from "../../App";
import { ToastContainer, toast } from "react-toastify";

export default function University({ university, userID, saved }) {
  const [modal, showModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    full_name,
    kebab_name,
    short_name,
    location,
    privacy,
    setting,
    length,
    gen_ranking,
    num_students,
    id,
  } = university;

  async function addUniversity() {
    if (!userID) {
      toast.info("Make an account to start working on your application!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }

    showModal(true);
    setIsSaved(true);
  }

  async function deleteUniversity() {
    await supabase.from("user_saved_colleges").delete().eq("college_id", id);

    await supabase
      .from("user_supplemental_essays")
      .delete()
      .eq("college_id", id)
      .eq("user_id", userID);

    setIsSaved(false);
  }

  useEffect(() => {
    let _ = saved.includes(id);
    setIsSaved(_);
  }, [saved]);

  return (
    <div>
      <div className="tw-group tw-relative tw-flex tw-h-full tw-w-full tw-cursor-pointer tw-items-center tw-rounded-xl tw-border-2 tw-border-primary hover:tw-text-white">
        <div className="tw-h-full tw-w-1/2 md:tw-w-5/12">
          <img
            src={`/assets/colleges/${kebab_name}-1.webp`}
            alt="college_picture"
            className="tw-aspect-square tw-h-full tw-rounded-l-[10px]"
          />
        </div>

        {/* rounded right medium instead of xl w/ parent div b/c of weird borders  */}
        <div className="tw-flex tw-h-full tw-w-1/2 tw-flex-col tw-justify-between tw-rounded-r-md tw-p-2 tw-text-sm tw-transition-all group-hover:tw-bg-primary md:tw-w-7/12">
          <p className="tw-text-xl tw-font-extralight">
            {full_name.length < 30 ? full_name : short_name}
          </p>

          <p className="tw-font-bold">{location}</p>

          <p>
            {length} &#183; {privacy} &#183; {setting}
          </p>
          <p>General Ranking: #{gen_ranking}</p>
          <p>{num_students.toLocaleString("en-us")} Undergraduate Students</p>
          <p>Test Optional</p>
        </div>

        {/* Calculating the percent (1/2 or 5/12) - (1/2(font size (30)) + padding (12)) = (50 || 41.667)% - 27px */}
        <button
          className="tw-group/plus tw-peer tw-absolute -tw-bottom-12 tw-left-[calc(50%-27px)] tw-inline-block tw-rounded-full tw-border-2 tw-border-secondary tw-bg-white tw-p-3  tw-transition-all hover:tw-bg-secondary group-hover:tw-inline-block md:tw-left-[calc(41.667%-27px)] md:tw-hidden"
          onClick={() => {
            isSaved ? deleteUniversity() : addUniversity();
          }}
        >
          {isSaved ? (
            <Trash3Fill className="tw-text-3xl tw-text-secondary group-hover/plus:tw-text-white" />
          ) : (
            <PlusLg className="tw-text-3xl tw-text-secondary group-hover/plus:tw-text-white" />
          )}
        </button>
      </div>

      {modal && (
        <div className="tw-fixed tw-left-0 tw-top-0 tw-z-10 tw-flex tw-h-screen tw-w-screen tw-cursor-default tw-items-center tw-justify-center tw-bg-gray-100 tw-bg-opacity-15 tw-text-black">
          <DeadlineModal
            showModal={showModal}
            uniID={id}
            userID={userID}
            uniName={full_name}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

function DeadlineModal({ showModal, uniID, userID, uniName }) {
  const [deadlines, setDeadlines] = useState([]);
  const [deadline, setDeadline] = useState("");

  async function getDeadlines() {
    let { data: deadlines, err } = await supabase
      .from("deadlines")
      .select("*")
      .eq("college_id", uniID);

    setDeadlines(deadlines);
  }

  async function saveCollege() {
    if (!deadline) {
      alert("Choose a deadline");
      return;
    }

    await supabase
      .from("user_saved_colleges")
      .insert([{ user_id: userID, college_id: uniID, deadline_id: deadline }]);

    const { data: essays, err } = await supabase
      .from("supplemental_essays")
      .select("*")
      .eq("college_id", uniID);

    essays.map(async (essay) => {
      await supabase.from("user_supplemental_essays").insert([
        {
          user_id: userID,
          supplemental_essay_id: essay.id,
          supplemental_essay_prompt: essay.prompt,
          word_limit: essay.word_limit,
          college_id: uniID,
          college_name: uniName,
        },
      ]);
    });

    showModal(false);
  }

  useEffect(() => {
    getDeadlines();
  }, []);

  return (
    <div className="tw-relative tw-h-64 tw-min-h-fit tw-w-1/3 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-100 tw-p-8 tw-shadow-lg">
      <p className="tw-pb-4 tw-pl-5 tw-text-xl tw-font-thin">
        Choose your decision plan:
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveCollege();
        }}
      >
        {deadlines.map((deadline) => {
          return (
            <div className="pb-2 tw-flex tw-items-center" key={deadline.id}>
              <input
                type="radio"
                name="deadline"
                value={deadline.id}
                id={deadline.id}
                onClick={(e) => setDeadline(e.target.value)}
              />

              <label className="tw-pl-2" htmlFor={deadline.id}>
                {deadline.special_name} -{" "}
                {new Date(deadline.date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </label>
            </div>
          );
        })}

        <div className="tw-absolute tw-bottom-4 tw-right-4 tw-flex tw-items-center tw-gap-6">
          <button
            className="tw-rounded-lg tw-border tw-border-secondary tw-px-4 tw-py-2 tw-text-secondary hover:tw-bg-secondary hover:tw-text-white"
            onClick={() => {
              showModal(false);
            }}
          >
            Cancel
          </button>

          <button
            className="tw-rounded-lg tw-border tw-border-primary tw-px-4 tw-py-2 tw-text-primary hover:tw-bg-primary hover:tw-text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
