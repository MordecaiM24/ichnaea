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
      <div className="flex w-full">
        <div className="w-5/12">
          {/* TODO: Replace all these w/ blue-600 */}
          <p className="inline-block rounded-lg rounded-b-none bg-[#0D6EFD] px-3 py-2.5 text-white md:px-12">
            Common App
          </p>
        </div>

        <div className="flex w-7/12 items-center pe-4 *:flex *:justify-center">
          <div className="w-1/6">Notes</div>

          <div className="w-1/6">Target</div>

          <div className="w-1/2">Status</div>

          <div className="w-1/6">Priority</div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-around">
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
      ? "green-500 hover:bg-opacity-85"
      : "amber-400 bg-opacity-85 hover:bg-opacity-70"
    : "red-500 bg-opacity-95 hover:bg-opacity-80";

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

  async function changeFlag() {
    let oldFlag = flag;

    // Doing this in the middle so that change is instantaneous w/o waiting on supa
    setFlag((prev) => !prev);

    const res = await supabase
      .from("todos")
      .update({ flag: !oldFlag })
      .eq("id", task.id);
  }

  return (
    <div className="flex w-full items-center rounded-r-md border border-t-0 border-gray-300 py-2 first:border-t last:rounded-bl-md hover:bg-gray-50 ">
      <div className="flex h-full w-5/12 items-center pl-4">
        <CircleFill className={`me-2 text-[8px] text-${color}`} />
        <p>{task.name}</p>
      </div>

      <div className="flex w-7/12 items-center pe-4 *:flex *:justify-center *:text-xl">
        <a className="w-1/6">
          <JournalBookmarkFill className="cursor-pointer" />
        </a>

        <a className="w-1/6">
          <CalendarDate className="cursor-pointer" />
        </a>

        <div className="w-1/2">
          <button
            className={`bg-${color} rounded-lg px-10 py-2 text-base text-opacity-100 transition-all`}
            onClick={async (e) => {
              //this is all unnecessary, but whatever.
              e.target.disabled = true;
              let oldClasses = e.target.className;
              e.target.className = `bg-${color} px-11 rounded-lg py-2 text-base opacity-60 transition-all`;
              await updateStatus();

              e.target.className = oldClasses;
              e.target.disabled = false;
            }}
          >
            {statusText}
          </button>
        </div>

        <a className="w-1/6">
          {flag ? (
            <FlagFill
              className="cursor-pointer text-[#0D6EFD]"
              onClick={(e) => changeFlag(e)}
            />
          ) : (
            <Flag className="cursor-pointer" onClick={(e) => changeFlag(e)} />
          )}
        </a>
      </div>

      {/* Makes sure tailwind classes are loaded */}
      <div className="hidden bg-amber-400 bg-opacity-85 text-red-500  hover:bg-opacity-85"></div>
      <div className="hidden  bg-green-500 bg-opacity-95  text-green-500 hover:bg-opacity-80 "></div>
      <div className="tw  tw hidden bg-red-500 text-amber-400  hover:bg-opacity-70"></div>
    </div>
  );
}

export function TodoListSkeleton() {
  return (
    <>
      <div className="flex w-full">
        <div className="w-5/12">
          {/* TODO: Replace all these w/ blue-600 */}
          <p className="inline-block rounded-lg rounded-b-none bg-[#0D6EFD] px-3 py-2.5 text-white md:px-12">
            Common App
          </p>
        </div>

        <div className="flex w-7/12 items-center pe-4 *:flex *:justify-center">
          <div className="w-1/6">Notes</div>

          <div className="w-1/6">Target</div>

          <div className="w-1/2">Status</div>

          <div className="w-1/6">Priority</div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-around">
        {Array.from({ length: 5 }).map((_, index) => (
          <TodoSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

function TodoSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center rounded-r-md border border-t-0 border-gray-300 py-6 first:border-t last:rounded-bl-md hover:bg-gray-50">
      <div className="flex h-full w-5/12 items-center pl-4">
        <CircleFill className={`me-2 text-[8px] text-gray-300`} />
        <div className="h-2 w-2/3 rounded-full bg-gray-300" />
      </div>

      <div className="flex w-7/12 items-center pe-4 *:flex *:justify-center *:text-xl">
        <div className="w-1/6">
          <div className="h-4 w-4 rounded bg-gray-300" />
        </div>

        <div className="w-1/6">
          <div className="h-4 w-4 rounded bg-gray-300" />
        </div>

        <div className="w-1/2 px-16">
          <div className="h-5 w-full rounded-lg bg-gray-300" />
        </div>

        <div className="w-1/6">
          <div className="h-4 w-4 rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
