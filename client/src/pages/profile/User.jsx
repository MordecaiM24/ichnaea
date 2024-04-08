import React, { useEffect, useState } from "react";
import { supabase } from "../../App";
import {
  CalendarDate,
  ChevronDown,
  CircleFill,
  Flag,
  FlagFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";
import TodoList from "./TodoList";

export default function User() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [colleges, setColleges] = useState([]);

  async function getUser() {
    const id = (await supabase.auth.getSession()).data.session.user.id;

    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);

    let { data: todos, error: todosError } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", id)
      .order("created_at");

    const { data: colleges, error } = await supabase
      .from("user_saved_colleges")
      .select(
        `
        colleges (
          full_name, id
        ),
        deadlines (
          special_name
        )
        `,
      )
      .eq("user_id", id);

    setUser(user[0]);
    setTodos(todos);
    setColleges(colleges);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    location.reload();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="tw-relative tw-mb-96 tw-w-full tw-px-10 tw-py-14">
      <TodoList todos={todos} />

      <div className="tw-mt-12 tw-flex tw-w-full">
        <div className="tw-w-5/12">
          <p className="tw-inline-block tw-rounded-lg tw-rounded-b-none tw-bg-orange-600 tw-px-3 tw-py-2.5 tw-text-white md:tw-px-12">
            Universities
          </p>
        </div>

        <div className="tw-flex tw-w-7/12 tw-items-center tw-pe-4 *:tw-flex *:tw-justify-center">
          <div className="tw-w-1/6">Target Date</div>

          <div className="tw-w-1/2">Application Cycle</div>

          <div className="tw-w-1/6">Completion</div>
        </div>
      </div>

      <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-around tw-rounded-lg tw-rounded-tl-none tw-border tw-border-gray-300">
        {colleges.map((college) => (
          <College college={college} userID={user.id} />
        ))}
      </div>

      <button
        className="tw-absolute tw-right-6 tw-top-4 tw-rounded-lg tw-bg-primary tw-px-4 tw-py-2 tw-text-white"
        onClick={() => logout()}
      >
        Logout
      </button>

      {JSON.stringify(colleges)}
    </div>
  );
}

function College({
  college: { colleges: university, deadlines: deadline },
  userID,
}) {
  const [essays, setEssays] = useState([]);

  async function getEssays() {
    let { data: essays, err } = await supabase
      .from("user_supplemental_essays")
      .select("*")
      .eq("user_id", userID)
      .eq("college_id", university.id);

    setEssays(essays);
  }

  useEffect(() => {
    getEssays();
  }, []);

  console.log(userID);

  return (
    <div
      className="tw-flex tw-w-full tw-items-center tw-border-b tw-border-gray-300 tw-py-2 last:tw-border-b-0 hover:tw-bg-gray-50"
      data-accordion="collapse"
    >
      <div className="tw-flex tw-h-full tw-w-5/12 tw-items-center tw-pl-4">
        <p>{university.full_name}</p>
      </div>

      <div className="tw-flex tw-w-7/12 tw-items-center tw-pe-4 *:tw-flex *:tw-justify-center *:tw-text-xl">
        <a className="tw-w-1/6">
          <CalendarDate className="tw-cursor-pointer" />
        </a>

        <div className="tw-w-1/2">
          <button className="tw-w-1/2 tw-rounded-lg tw-py-2 tw-text-base tw-text-opacity-100 tw-transition-all">
            {deadline.special_name}
          </button>
        </div>

        <a className="tw-w-1/6">
          <FlagFill className="tw-cursor-pointer tw-text-[#0D6EFD]" />
        </a>

        <a className="tw-w-1/6">
          <ChevronDown
            onClick={() => {
              console.log(essays);
            }}
          />
        </a>
      </div>
    </div>
  );
}
