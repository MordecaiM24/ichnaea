import React from "react";
import { PlusLg } from "react-bootstrap-icons";

export default function University({ university }) {
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

  return (
    <div className="tw-group tw-relative tw-flex tw-cursor-pointer tw-items-center tw-rounded-xl tw-border-2 tw-border-primary hover:tw-text-white">
      <div className="tw-h-full tw-w-1/2 md:tw-w-5/12">
        <img
          src={`/assets/colleges/${kebab_name}-1.webp`}
          alt="college_picture"
          className="tw-aspect-square tw-h-full tw-rounded-l-[10px]"
        />
      </div>

      {/* rounded right medium instead of xl w/ parent div b/c of weird borders  */}
      <div className="tw-flex tw-h-full tw-w-1/2 tw-flex-col tw-justify-between tw-rounded-r-md tw-p-2 tw-text-sm tw-transition-all group-hover:tw-bg-primary md:tw-w-7/12">
        <p className="tw-text-xl tw-font-extralight">
          {full_name.length < 30 ? full_name : short_name}
        </p>

        <p className="tw-font-bold">{location}</p>

        <p>
          {length} &#183; {privacy} &#183; {setting}
        </p>
        <p>General Ranking: #{gen_ranking}</p>
        <p>{num_students.toLocaleString("en-us")} Undergraduate Students</p>
        <p>Test Optional</p>
      </div>

      {/* Calculating the percent (1/2 or 5/12) - (1/2(font size (30)) + padding (12)) = (50 || 41.667)% - 27px */}
      <button className="tw-group/plus tw-border-secondary hover:tw-bg-secondary tw-absolute -tw-bottom-12 tw-left-[calc(50%-27px)] tw-hidden tw-rounded-full tw-border-2 tw-bg-white tw-p-3  tw-transition-all group-hover:tw-inline-block md:tw-left-[calc(41.667%-27px)]">
        <PlusLg className="tw-text-secondary tw-text-3xl group-hover/plus:tw-text-white" />
      </button>
    </div>
  );
}
