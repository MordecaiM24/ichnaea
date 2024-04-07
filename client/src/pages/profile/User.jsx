import React, { useEffect, useState } from "react";
import { supabase } from "../../App";
import {
  CalendarDate,
  CircleFill,
  Flag,
  FlagFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";

export default function User() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  async function getUser() {
    const id = (await supabase.auth.getSession()).data.session.user.id;

    let { data: user, userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);

    let { data: todos, todosErr } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", id);

    setUser(user[0]);
    setTodos(todos);
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
      <div className="tw-flex tw-w-full">
        <div className="tw-w-5/12">
          <p className="tw-inline-block tw-rounded-lg tw-rounded-b-none tw-bg-[#0D6EFD] tw-px-3 tw-py-2.5 tw-text-white md:tw-px-12">
            Common App
          </p>
        </div>

        <div className="tw-flex tw-w-7/12 tw-items-center tw-pe-4 *:tw-flex *:tw-justify-center">
          <div className="tw-w-1/6">Notes</div>

          <div className="tw-w-1/6">Target</div>

          <div className="tw-w-1/2">Status</div>

          <div className="tw-w-1/6">Priority</div>
        </div>
      </div>

      {/* Todo list */}
      <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-around ">
        {todos.map((item) => {
          return <Todo task={item} />;
        })}
      </div>

      <button
        className="tw-absolute tw-right-6 tw-top-4 tw-rounded-lg tw-bg-primary tw-px-4 tw-py-2 tw-text-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}

function Todo({ task }) {
  return (
    <div className="tw-flex tw-w-full tw-items-center tw-rounded-md tw-border tw-border-t-0 tw-border-gray-300 tw-py-2 first:tw-rounded-tl-none first:tw-border-t hover:tw-bg-gray-50 active:tw-bg-gray-200">
      <div className="tw-flex tw-h-full tw-w-5/12 tw-items-center tw-pl-4">
        <CircleFill className="tw-me-2 tw-text-[8px] tw-text-green-500" />
        <p>{task.name}</p>
      </div>

      <div className="tw-flex tw-w-7/12 tw-items-center tw-pe-4 *:tw-flex *:tw-justify-center *:tw-text-xl">
        <button className="tw-w-1/6">
          <JournalBookmarkFill />
        </button>

        <button className="tw-w-1/6">
          <CalendarDate />
        </button>

        <div className="tw-w-1/2">
          <button className="tw-w-1/2 tw-rounded-lg tw-bg-green-500 tw-py-2 tw-text-base">
            Completed
          </button>
        </div>

        <button className="tw-w-1/6">
          <Flag />
        </button>
      </div>
    </div>
  );
}
