import React, { useState } from "react";
import { supabase } from "../../App";
import {
  CalendarDate,
  CircleFill,
  Flag,
  FlagFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";

export default function TodoList({ todos }) {
  return (
    <>
      <div className="tw-flex tw-w-full">
        <div className="tw-w-5/12">
          {/* TODO: Replace all these w/ blue-600 */}
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
      <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-around ">
        {todos.map((item) => {
          return <Todo task={item} key={item.id} />;
        })}
      </div>
    </>
  );
}

function Todo({ task }) {
  const [status, setStatus] = useState(task.status);
  const [flag, setFlag] = useState(task.flag);

  const color = status
    ? status === 2
      ? "green-500 hover:tw-bg-opacity-85"
      : "amber-400 tw-bg-opacity-85 hover:tw-bg-opacity-70"
    : "red-500 tw-bg-opacity-95 hover:tw-bg-opacity-80";

  const statusText = status
    ? status === 2
      ? "Completed"
      : "In Progress"
    : "Not Started";

  async function updateStatus() {
    let oldStatus = status;

    // this does this: 0 -> 1 -> 2 -> 0 -> 1 -> 2
    let newStatus = (oldStatus + 1) % 3;

    const { data, error } = await supabase
      .from("todos")
      .update({ status: newStatus })
      .eq("id", task.id);

    setStatus((prev) => (prev + 1) % 3);
  }

  async function changeFlag(e) {
    let oldFlag = flag;

    // Doing this in the middle so that change is instantaneous w/o waiting on supa
    setFlag((prev) => !prev);

    const res = await supabase
      .from("todos")
      .update({ flag: !oldFlag })
      .eq("id", task.id);
  }

  return (
    <div className="tw-flex tw-w-full tw-items-center tw-rounded-md tw-border tw-border-t-0 tw-border-gray-300 tw-py-2 first:tw-rounded-tl-none first:tw-border-t hover:tw-bg-gray-50 ">
      <div className="tw-flex tw-h-full tw-w-5/12 tw-items-center tw-pl-4">
        <CircleFill className={`tw-me-2 tw-text-[8px] tw-text-${color}`} />
        <p>{task.name}</p>
      </div>

      <div className="tw-flex tw-w-7/12 tw-items-center tw-pe-4 *:tw-flex *:tw-justify-center *:tw-text-xl">
        <a className="tw-w-1/6">
          <JournalBookmarkFill className="tw-cursor-pointer" />
        </a>

        <a className="tw-w-1/6">
          <CalendarDate className="tw-cursor-pointer" />
        </a>

        <div className="tw-w-1/2">
          <button
            className={`tw-bg-${color} tw-rounded-lg tw-px-10 tw-py-2 tw-text-base tw-text-opacity-100 tw-transition-all`}
            onClick={async (e) => {
              //this is all unnecessary, but whatever.
              e.target.disabled = true;
              let oldClasses = e.target.className;
              e.target.className = `tw-bg-${color} tw-px-11 tw-rounded-lg tw-py-2 tw-text-base tw-opacity-60 tw-transition-all`;
              await updateStatus();

              e.target.className = oldClasses;
              e.target.disabled = false;
            }}
          >
            {statusText}
          </button>
        </div>

        <a className="tw-w-1/6">
          {flag ? (
            <FlagFill
              className="tw-cursor-pointer tw-text-[#0D6EFD]"
              onClick={(e) => changeFlag(e)}
            />
          ) : (
            <Flag
              className="tw-cursor-pointer"
              onClick={(e) => changeFlag(e)}
            />
          )}
        </a>
      </div>

      {/* Makes sure tailwind classes are loaded */}
      <div className="tw-hidden tw-bg-amber-400 tw-bg-opacity-85 tw-text-red-500  hover:tw-bg-opacity-85"></div>
      <div className="tw-hidden  tw-bg-green-500 tw-bg-opacity-95  tw-text-green-500 hover:tw-bg-opacity-80 "></div>
      <div className="tw  tw tw-hidden tw-bg-red-500 tw-text-amber-400  hover:tw-bg-opacity-70"></div>
    </div>
  );
}
