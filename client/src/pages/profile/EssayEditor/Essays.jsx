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
    <div className="mx-auto px-36 xl:max-w-6xl 2xl:max-w-7xl">
      <div className="py-4 self-center text-center">
        <p className="text-5xl font-thin">{essays[0]?.college_name}</p>
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
        <div className="mb-12 flex flex-col gap-y-4">
          <p className="text-md ps-1">{essay.supplemental_essay_prompt}</p>

          <textarea
            onChange={(e) => {
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight + 18}px`;
              setResponse(e.target.value);
            }}
            className="flex h-fit min-h-56 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
            value={response}
          />

          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-x-3">
              <button className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white">
                Brainstorm
              </button>

              <button className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white">
                Edit
              </button>

              <button className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white">
                Critique
              </button>
            </div>

            <button
              className="rounded-lg bg-primary px-6 py-2 text-white"
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
