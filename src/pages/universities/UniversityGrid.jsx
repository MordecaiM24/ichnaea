import React, { useEffect, useRef, useState } from "react";
import University from "./University";
import { supabase } from "../../App";
import { Search } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";

export default function UniversityGrid() {
  const [userID, setUserID] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [saved, setSaved] = useState([]);
  const [page, setPage] = useState(0);
  const inputRef = useRef(null);

  async function getUniversities() {
    let from = page * 6;
    let to = from + 5;

    const { data: newUniversities, err } = await supabase
      .from("colleges")
      .select("*")
      .order("gen_ranking")
      .range(from, to);

    if (newUniversities.length === 0) {
      toast.info("All out!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    const arr = [...universities, ...newUniversities];

    setUniversities(arr);
  }

  async function getSaved() {
    const { data, error } = await supabase.auth.getSession();

    if (!data?.session?.user) {
      setUserID(false);
      return;
    }

    const id = data.session.user.id;
    setUserID(id);

    const { data: savedColleges, err } = await supabase
      .from("user_saved_colleges")
      .select("college_id")
      .eq("user_id", id);

    const saved = savedColleges.map((college) => {
      return college.college_id;
    });

    setSaved(saved);
  }

  useEffect(() => {
    getSaved();
  }, []);

  useEffect(() => {
    getUniversities();
  }, [page]);

  async function searchUniversities(query) {
    // ilike is case insensitive search, the percents mean "contains", so any string that contains the query, i.e. princeton contains 'prince'
    const { data: universities, err } = await supabase
      .from("colleges")
      .select("*")
      .or(
        `full_name.ilike.%${query}%, short_name.ilike.%${query}%, location.ilike.%${query}`,
      )
      .order("gen_ranking")
      .limit(6);

    setUniversities(universities);
  }

  return (
    <div className="p-4 px-12">
      {/* Didn't refactor into tailwind b/c the css for this was written by the elder gods */}
      <div className="search-bar-container relative">
        <form
          className="search-box flex items-center"
          id="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            const query = inputRef.current.value;
            console.log(query);
            searchUniversities(query);
          }}
        >
          <input
            type="text"
            className="search-input text-sm"
            placeholder="Start Looking For Something!"
            id="search"
            ref={inputRef}
          />

          <a className="search-btn cursor-pointer" type="submit">
            <Search />
          </a>
        </form>
      </div>

      {/* 1 card on sm screen, 2 on md screen, 3 on xl screen */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 py-4 md:grid-cols-2 xl:grid-cols-3">
        {universities.map((university) => {
          return (
            <University
              university={university}
              userID={userID}
              saved={saved}
              key={university.id}
            />
          );
        })}
      </div>

      <div className="flex justify-center py-12 xl:pe-[4.5rem] 2xl:pe-20">
        <button
          className="rounded-lg border border-primary px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
          onClick={() => {
            setPage((page) => page + 1);
          }}
        >
          Show More
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
