import { supabase } from "@/App";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Circles } from "react-loader-spinner";

export function Essays() {
  let { college_id } = useParams();
  const [user, setUser] = useState(null);
  const [essays, setEssays] = useState([]);

  async function getUser() {
    const user_id = (await supabase.auth.getSession()).data.session.user.id;

    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id);

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
      <div className="self-center py-4 text-center">
        <p className="text-5xl font-thin">{essays[0]?.college_name}</p>
      </div>

      {essays.map((essay) => {
        return <Essay essay={essay} key={essay.id} />;
      })}
    </div>
  );
}

function Essay({ essay }) {
  const [response, setResponse] = useState(essay.response);
  const [isAILoading, setAILoading] = useState(false);
  const [changeDelta, setChangeDelta] = useState(0);
  const [isEssaySaving, setEssaySaving] = useState(false);

  async function saveEssay(userResponse = response) {
    setEssaySaving(true);
    await supabase
      .from("user_supplemental_essays")
      .update({ response: userResponse })
      .eq("id", essay.id);

    setEssaySaving(false);
  }

  useEffect(() => {
    if (changeDelta === 20) {
      saveEssay();
      setChangeDelta(0);
    }
  }, [changeDelta]);

  async function edit() {
    if (response.length < 100) {
      toast.info(
        "Editing works best with a minimum of 100 characters. Start writing and we'll start helping!",
        {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        },
      );

      return;
    }

    const editedEssay = await axios.post(
      `${import.meta.env.VITE_FUNCTION_ENDPOINT}/api/edit`,
      { essay: response },
    );

    const originalEssay = response;

    const newEssay = originalEssay.concat(
      "\n\nEdited Essay: \n\n",
      editedEssay.data.final_essay,
    );

    setResponse(newEssay);
    saveEssay(newEssay);
  }

  function critique() {
    toast.info("Coming soon!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }

  function brainstorm() {
    toast.info("Coming soon!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }

  return (
    <>
      {!!essay.word_limit && (
        <div className="mb-12 flex flex-col gap-y-4">
          <p className="text-md ps-1">{essay.supplemental_essay_prompt}</p>

          <div className="relative min-h-56 w-full">
            <textarea
              onChange={(e) => {
                setChangeDelta((changeDelta) => changeDelta + 1);
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight + 18}px`;
                setResponse(e.target.value);
              }}
              onClick={(e) => {
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight + 18}px`;
              }}
              className="flex h-fit min-h-56 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
              value={response}
            />

            {isAILoading && (
              <div className="primary absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                <Circles
                  height={"33%"}
                  width={"33%"}
                  color="rgb(145,0,22)"
                  wrapperClass="flex items-center justify-center"
                />
              </div>
            )}

            {isEssaySaving && (
              <div className="primary absolute bottom-3 right-3 flex h-6 w-fit items-center justify-center gap-x-2 animate-in">
                <p className="animate-pulse text-sm text-gray-500">Saving</p>
                <svg
                  className="h-5 w-5 animate-spin text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="-3 -3 30 30"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-x-3">
              <button
                className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-primary"
                onClick={() => brainstorm()}
                disabled={isAILoading}
              >
                Brainstorm
              </button>

              <button
                className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-primary"
                disabled={isAILoading}
                onClick={async () => {
                  setAILoading(true);
                  await edit();
                  setAILoading(false);
                }}
              >
                Edit
              </button>

              <button
                className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-primary"
                onClick={() => critique()}
                disabled={isAILoading}
              >
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
      <ToastContainer />
      <div className="w-50 h-50 hidden"></div>
    </>
  );
}
