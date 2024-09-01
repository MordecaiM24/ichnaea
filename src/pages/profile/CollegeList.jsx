import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarDate, FlagFill } from "react-bootstrap-icons";
import React, { useState } from "react";
import { supabase } from "../../App";
import { useNavigate } from "react-router-dom";

export function CollegeList({ colleges, essays }) {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <div id="colleges" className="flex w-full">
        <div className="w-7/12">
          <p className="inline-block rounded-lg rounded-b-none bg-orange-600 px-3 py-2.5 text-white md:px-12">
            Universities
          </p>
        </div>

        <div className="mr-20 flex w-5/12 items-center ps-5 *:flex *:justify-center">
          <div className="w-1/6">Date</div>

          <div className="w-1/3">Application Cycle</div>

          <div className="w-1/2"></div>

          {/* <div className="w-1/6">Completion</div> */}
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full rounded-lg rounded-tl-none border border-gray-300"
      >
        {colleges.map((obj, idx) => {
          let { full_name, id } = obj.colleges;
          let deadline = obj.deadlines.special_name;

          return (
            <AccordionItem
              className="border-b pr-4 first:rounded-tr-lg last:rounded-b-lg last:border-b-0 hover:bg-gray-50"
              value={`item-${idx}`}
              key={id}
            >
              <AccordionTrigger>
                <div className="flex w-full items-center px-6 py-3 font-normal">
                  <div className="flex h-full w-7/12 items-center">
                    <p>{full_name}</p>
                  </div>

                  <div className="flex w-5/12 items-center pe-4 *:flex *:justify-center">
                    <a className="w-1/6 text-xl">
                      <CalendarDate className="cursor-pointer" />
                    </a>

                    <div className="w-1/3 text-base">{deadline}</div>

                    <div className="w-1/2">
                      <a
                        className="rounded-lg bg-primary px-4 py-2 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${id}`);
                        }}
                      >
                        Open Essays
                      </a>
                    </div>

                    {/* <a className="w-1/6">
                      <div className="aspect-square w-full md:w-3/4 lg:w-1/2">
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                        />
                      </div>
                    </a> */}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pe-6 pr-8">
                {essays
                  .filter((essay) => {
                    return essay.college_id == id;
                  })
                  .map((essay) => {
                    return <Essay essay={essay} key={essay.id} />;
                  })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

function Essay({ essay }) {
  const [status, setStatus] = useState(essay.status);

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

    await supabase
      .from("user_supplemental_essays")
      .update({ status: newStatus })
      .eq("id", essay.id);

    setStatus((prev) => (prev + 1) % 3);
  }

  return (
    <div className="flex items-center rounded-r-lg border-r border-t border-gray-300 py-3 pe-8 ps-6 last:border-b">
      <p className="w-7/12">{essay.supplemental_essay_prompt}</p>

      <div className="flex w-5/12 items-center justify-center  *:text-center">
        <div className="w-1/2"></div>

        <a
          className={`bg-${color} cursor-pointer rounded-lg px-10 py-2 text-base text-opacity-100 transition-all`}
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
        </a>

        {/* <div className="w-1/6">QWERTY</div> */}
      </div>
    </div>
  );
}

export function CollegeListSkeleton() {
  return (
    <div className="mb-12">
      <div className="flex w-full" id="colleges">
        <div className="w-7/12">
          <p className="inline-block rounded-lg rounded-b-none bg-orange-600 px-3 py-2.5 text-white md:px-12">
            Universities
          </p>
        </div>

        <div className="mr-20 flex w-5/12 items-center ps-5 *:flex *:justify-center">
          <div className="w-1/6">Date</div>

          <div className="w-1/3">Application Cycle</div>

          <div className="w-1/2"></div>

          {/* <div className="w-1/6">Completion</div> */}
        </div>
      </div>
      <div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="flex w-full animate-pulse items-center rounded-r-md border border-t-0 border-gray-300 py-6 first:border-t last:rounded-bl-md hover:bg-gray-50">
            <div className="flex h-full w-7/12 items-center ps-4">
              <div className="h-2 w-1/2 rounded-full bg-gray-300" />
            </div>

            <div className="mr-20 flex h-full w-5/12 items-center pe-4 ps-5 *:flex *:justify-center">
              <div className="w-1/6">
                <div className="h-4 w-4 rounded bg-gray-300" />
              </div>

              <div className="w-1/3">
                <div className="h-2 w-full rounded-lg bg-gray-300" />
              </div>

              <div className="w-1/2">
                <div className="h-6 w-1/2 rounded bg-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
