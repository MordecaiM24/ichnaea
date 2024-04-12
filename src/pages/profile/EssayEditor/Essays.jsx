import { supabase } from "@/App";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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

  async function saveEssay() {
    await supabase
      .from("user_supplemental_essays")
      .update({ response })
      .eq("id", essay.id);
  }

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
    })
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
            onClick={(e) => {
              console.log("Clicked");
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight + 18}px`;
            }}
            className="flex h-fit min-h-56 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
            value={response}
          />

          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-x-3">
              <button
                className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white"
                onClick={() => brainstorm()}
              >
                Brainstorm
              </button>

              <button
                className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-50"
                onClick={async (e) => {
                  e.target.disabled = true;
                  await edit();
                  e.target.disabled = false;
                }}
              >
                Edit
              </button>

              <button
                className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white"
                onClick={() => critique()}
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
    </>
  );
}
