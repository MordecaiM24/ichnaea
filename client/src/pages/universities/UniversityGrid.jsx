import React, { useEffect, useRef, useState } from "react";
import University from "./University";
import { supabase } from "../../App";
import { Search } from "react-bootstrap-icons";

export default function UniversityGrid() {
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

  useEffect(() => {
    getUniversities();
  }, []);

  async function searchUniversities(query) {
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

      {/* 1 by default, 2 on md screen, 3 on xl screen */}
      <div className="tw-grid tw-grid-cols-1 tw-gap-x-10 tw-gap-y-16 tw-py-4 md:tw-grid-cols-2 xl:tw-grid-cols-3">
        {universities.map((university) => {
          return <University university={university} />;
        })}
      </div>
    </div>
  );
}
