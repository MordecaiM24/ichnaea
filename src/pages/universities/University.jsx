import React, { useEffect, useState } from "react";
import { PlusLg, Trash3Fill } from "react-bootstrap-icons";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <div
      onClick={() => {
        isSaved ? null : addUniversity();
      }}
    >
      <div className="group relative flex h-full w-full cursor-pointer items-center rounded-xl border-2 border-primary hover:text-white">
        <div className="h-full w-1/2 md:w-5/12">
          <img
            src={`/assets/colleges/${kebab_name}-1.webp`}
            alt="college_picture"
            className="aspect-square h-full rounded-l-[10px]"
          />
        </div>

        {/* rounded right medium instead of xl w/ parent div b/c of weird borders  */}
        <div className="flex h-full w-1/2 flex-col justify-between rounded-r-md p-2 text-sm transition-all group-hover:bg-primary md:w-7/12">
          <p className="text-xl font-extralight">
            {full_name.length < 30 ? full_name : short_name}
          </p>

          <p className="font-bold">{location}</p>

          <p>
            {length} &#183; {privacy} &#183; {setting}
          </p>
          <p>General Ranking: #{gen_ranking}</p>
          <p>{num_students.toLocaleString("en-us")} Undergraduate Students</p>
          <p>Test Optional</p>
        </div>

        {/* Calculating the percent (1/2 or 5/12) - (1/2(font size (30)) + padding (12)) = (50 || 41.667)% - 27px */}
        <button
          onClick={() => {
            isSaved ? deleteUniversity() : addUniversity();
          }}
          className="group/plus peer absolute -bottom-12 left-[calc(50%-27px)] inline-block rounded-full border-2 border-secondary bg-white p-3  transition-all hover:bg-secondary group-hover:inline-block md:left-[calc(41.667%-27px)] md:hidden"
        >
          {isSaved ? (
            <Trash3Fill className="text-3xl text-secondary group-hover/plus:text-white" />
          ) : (
            <PlusLg className="text-3xl text-secondary group-hover/plus:text-white" />
          )}
        </button>
      </div>

      {modal && (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-screen cursor-default items-center justify-center bg-gray-100 bg-opacity-15 text-black">
          <DeadlineModal
            showModal={showModal}
            uniID={id}
            userID={userID}
            uniName={full_name}
          />
        </div>
      )}
    </div>
  );
}

function DeadlineModal({ showModal, uniID, userID, uniName }) {
  const [deadlines, setDeadlines] = useState([]);
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

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
    navigate("/profile#colleges");
  }

  useEffect(() => {
    getDeadlines();
  }, []);

  return (
    <div className="relative h-64 min-h-fit w-1/3 rounded-lg border border-gray-200 bg-gray-100 p-8 shadow-lg">
      <p className="pb-4 pl-5 text-xl font-thin">Choose your decision plan:</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveCollege();
        }}
      >
        {deadlines.map((deadline) => {
          return (
            <div className="flex items-center pb-2" key={deadline.id}>
              <input
                type="radio"
                name="deadline"
                value={deadline.id}
                id={deadline.id}
                onClick={(e) => setDeadline(e.target.value)}
              />

              <label className="pl-2" htmlFor={deadline.id}>
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

        <div className="absolute bottom-4 right-4 flex items-center gap-6">
          <button
            className="rounded-lg border border-secondary px-4 py-2 text-secondary hover:bg-secondary hover:text-white"
            onClick={() => {
              showModal(false);
            }}
          >
            Cancel
          </button>

          <button
            className="rounded-lg border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
