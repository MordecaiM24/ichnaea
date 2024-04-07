import React, { useEffect, useRef, useState } from "react";
import University from "./University";
import { supabase } from "../../App";
import { Search } from "react-bootstrap-icons";

export default function UniversityGrid() {
  const [userID, setUserID] = useState(null);
  const [universities, setUniversities] = useState([]);
  const inputRef = useRef(null);

  async function getUniversities() {
    const { data: universities, err } = await supabase
      .from("colleges")
      .select("*")
      .order("gen_ranking")
      .limit(6);
    setUniversities(universities);
  }

  // Only getting userid b/c the user object doesn't have any relevant info.
  async function getUser() {
    console.log("getting user");
    const { data, error } = await supabase.auth.getSession();

    if (!data?.session?.user) {
      setUserID(false);
      return;
    }

    const id = data.session.user.id;
    setUserID(id);
  }

  useEffect(() => {
    getUniversities();
    getUser();
  }, []);

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
    <div className="tw-p-4 tw-px-12">
      {/* Didn't refactor into tailwind b/c the css for this was written by the elder gods */}
      <div className="search-bar-container tw-relative">
        <form
          className="search-box tw-flex tw-items-center tw-py-6"
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
            className="search-input tw-text-sm"
            placeholder="Start Looking For Something!"
            id="search"
            ref={inputRef}
          />

          <a className="search-btn tw-cursor-pointer" type="submit">
            <Search />
          </a>
        </form>
      </div>

      {/* 1 card on sm screen, 2 on md screen, 3 on xl screen */}
      <div className="tw-grid tw-grid-cols-1 tw-gap-x-10 tw-gap-y-16 tw-py-4 md:tw-grid-cols-2 xl:tw-grid-cols-3">
        {universities.map((university) => {
          return <University university={university} userID={userID} />;
        })}
      </div>
    </div>
  );
}
