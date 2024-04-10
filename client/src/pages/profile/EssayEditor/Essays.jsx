import { supabase } from "@/App";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export function Essays() {
  let { college_id } = useParams();
  const [user, setUser] = useState(null);
  const [essays, setEssays] = useState([]);

  async function getUser() {
    const user_id = (await supabase.auth.getSession()).data.session.user.id;
    console.log(user_id);

    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id);
    console.log({ user });

    console.log(college_id);
    let { data: essays, error: essayErr } = await supabase
      .from("user_supplemental_essays")
      .select("*")
      .eq("user_id", user_id)
      .eq("college_id", college_id)
      .order("created_at");
    setEssays(essays);
    setUser(user[0]);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="tw-mx-auto tw-px-36 xl:tw-max-w-6xl 2xl:tw-max-w-7xl">
      <div className="py-4 tw-self-center tw-text-center">
        <p className="tw-text-5xl tw-font-thin">{essays[0]?.college_name}</p>
      </div>

      {essays.map((essay) => {
        return <Essay essay={essay} />;
      })}
    </div>
  );
}

function Essay({ essay }) {
  const [response, setResponse] = useState(essay.response);

  async function saveEssay() {
    await supabase
      .from("user_supplemental_essays")
      .update({ response })
      .eq("id", essay.id);
  }

  return (
    <>
      {!!essay.word_limit && (
        <div className="tw-mb-12 tw-flex tw-flex-col tw-gap-y-4">
          <p className="tw-text-md tw-ps-1">
            {essay.supplemental_essay_prompt}
          </p>

          <textarea
            onChange={(e) => {
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight + 18}px`;
              setResponse(e.target.value);
            }}
            className="tw-flex tw-h-fit tw-min-h-56 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm placeholder:tw-text-muted-foreground"
            value={response}
          />

          <div className="tw-flex tw-flex-row tw-items-center tw-justify-between">
            <div className="tw-flex tw-gap-x-3">
              <button className="tw-rounded-lg tw-border tw-border-primary tw-bg-white tw-px-6 tw-py-2 tw-text-primary tw-transition-all hover:tw-bg-primary hover:tw-text-white">
                Brainstorm
              </button>

              <button className="tw-rounded-lg tw-border tw-border-primary tw-bg-white tw-px-6 tw-py-2 tw-text-primary tw-transition-all hover:tw-bg-primary hover:tw-text-white">
                Edit
              </button>

              <button className="tw-rounded-lg tw-border tw-border-primary tw-bg-white tw-px-6 tw-py-2 tw-text-primary tw-transition-all hover:tw-bg-primary hover:tw-text-white">
                Critique
              </button>
            </div>

            <button
              className="tw-rounded-lg tw-bg-primary tw-px-6 tw-py-2 tw-text-white"
              onClick={() => saveEssay()}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
