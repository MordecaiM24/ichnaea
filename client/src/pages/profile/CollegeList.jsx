import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarDate, FlagFill } from "react-bootstrap-icons";
import React, { useState } from "react";
import { supabase } from "../../App";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function CollegeList({ colleges, essays }) {
  let percentage = 66;

  return (
    <>
      <div className="tw-mt-12 tw-flex tw-w-full">
        <div className="tw-w-7/12">
          <p className="tw-inline-block tw-rounded-lg tw-rounded-b-none tw-bg-orange-600 tw-px-3 tw-py-2.5 tw-text-white md:tw-px-12">
            Universities
          </p>
        </div>

        <div className="tw-mr-20 tw-flex tw-w-5/12 tw-items-center tw-ps-5 *:tw-flex *:tw-justify-center">
          <div className="tw-w-1/6">Date</div>

          <div className="tw-w-1/3">Application Cycle</div>

          <div className="tw-w-1/2"></div>

          {/* <div className="tw-w-1/6">Completion</div> */}
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="tw-w-full tw-rounded-lg tw-rounded-tl-none tw-border tw-border-gray-300"
      >
        {colleges.map((obj, idx) => {
          let { full_name, id } = obj.colleges;
          let deadline = obj.deadlines.special_name;

          return (
            <AccordionItem
              className="tw-border-b tw-pr-4 first:tw-rounded-tr-lg last:tw-rounded-b-lg last:tw-border-b-0 hover:tw-bg-gray-50"
              value={`item-${idx}`}
              key={id}
            >
              <AccordionTrigger>
                <div className="tw-flex tw-w-full tw-items-center tw-px-6 tw-py-3 tw-font-normal">
                  <div className="tw-flex tw-h-full tw-w-7/12 tw-items-center">
                    <p>{full_name}</p>
                  </div>

                  <div className="tw-flex tw-w-5/12 tw-items-center tw-pe-4 *:tw-flex *:tw-justify-center">
                    <a className="tw-w-1/6 tw-text-xl">
                      <CalendarDate className="tw-cursor-pointer" />
                    </a>

                    <div className="tw-w-1/3 tw-text-base">{deadline}</div>

                    <div className="tw-w-1/2">
                      <a
                        className="tw-rounded-lg tw-bg-primary tw-px-4 tw-py-2 tw-text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(id);
                        }}
                      >
                        Open Essays
                      </a>
                    </div>

                    {/* <a className="tw-w-1/6">
                      <div className="tw-aspect-square tw-w-full md:tw-w-3/4 lg:tw-w-1/2">
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                        />
                      </div>
                    </a> */}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="tw-pe-6 tw-pr-8">
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
    </>
  );
}
function Essay({ essay }) {
  const [status, setStatus] = useState(essay.status);

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

    await supabase
      .from("user_supplemental_essays")
      .update({ status: newStatus })
      .eq("id", essay.id);

    setStatus((prev) => (prev + 1) % 3);
  }

  return (
    <div className="tw-flex tw-items-center tw-rounded-r-lg tw-border-r tw-border-t tw-border-gray-300 tw-py-3 tw-pe-8 tw-ps-6 last:tw-border-b">
      <p className="tw-w-7/12">{essay.supplemental_essay_prompt}</p>

      <div className="tw-flex tw-w-5/12 tw-items-center tw-justify-center  *:tw-text-center">
        <div className="tw-w-1/2"></div>

        <a
          className={`tw-bg-${color} tw-cursor-pointer tw-rounded-lg tw-px-10 tw-py-2 tw-text-base tw-text-opacity-100 tw-transition-all`}
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
        </a>

        {/* <div className="tw-w-1/6">QWERTY</div> */}
      </div>
    </div>
  );
}
