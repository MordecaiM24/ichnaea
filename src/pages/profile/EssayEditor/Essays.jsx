import { supabase } from "@/App";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { EditUserInfo } from "../UserInfo";

export function Essays() {
  let { college_id } = useParams();
  const [user, setUser] = useState(null);
  const [essays, setEssays] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
    <div className="relative mx-auto px-36 xl:max-w-6xl 2xl:max-w-7xl">
      <div className="flex flex-col items-center justify-between gap-y-5 py-8">
        <p className="text-5xl font-thin">{essays[0]?.college_name}</p>
        <button
          className="rounded-lg border border-primary bg-white px-6 py-1 text-lg text-primary transition-all hover:bg-primary hover:text-white"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      {essays.map((essay) => {
        return <Essay essay={essay} key={essay.id} student={user.user_info} />;
      })}

      <EditUserInfo
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
}

function Essay({ essay, student }) {
  const [response, setResponse] = useState(essay.response);
  const [isAILoading, setAILoading] = useState(false);
  const [changeDelta, setChangeDelta] = useState(0);
  const [isEssaySaving, setEssaySaving] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    // TODO: Add minimize button that resets height to h-56. Use event.stopPropagation to prevent resizing conflict.
    if (textareaRef.current && changeDelta !== 0) {
      textareaRef.current.style.height = "inherit"; // Reset the height to inherit to correctly reduce size if needed
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 18}px`;
    }
  }, [response, changeDelta]); // This will trigger every time the response state changes

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
          autoClose: 1000,
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

  async function critique() {
    if (response.length < 100) {
      toast.info(
        "Criticism works best with a minimum of 100 characters. Start writing and we'll start helping!",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        },
      );

      return;
    }

    const criticizedEssay = await axios.post(
      `${import.meta.env.VITE_FUNCTION_ENDPOINT}/api/critique`,
      { essay: response, prompt: essay.supplemental_essay_prompt },
    );

    const originalEssay = response;

    const newEssay = originalEssay.concat(
      "\n\nCritiques: \n\n",
      criticizedEssay.data.critiques,
    );

    setResponse(newEssay);
    saveEssay(newEssay);
  }

  async function brainstorm() {
    const brainstormedEssay = await axios.post(
      `${import.meta.env.VITE_FUNCTION_ENDPOINT}/api/brainstorm`,
      { prompt: essay.supplemental_essay_prompt, student },
    );

    const originalEssay = response;

    let newEssay;

    if (originalEssay.length === 0) {
      newEssay = originalEssay.concat(
        "Ideas : \n\n",
        brainstormedEssay.data.brainstorm,
      );
    } else {
      newEssay = originalEssay.concat(
        "\n\nIdeas : \n\n",
        brainstormedEssay.data.brainstorm,
      );
    }

    setResponse(newEssay);
    saveEssay(newEssay);
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
                setResponse(e.target.value);
              }}
              onClick={() => setChangeDelta((changeDelta) => changeDelta + 1)}
              ref={textareaRef}
              className="flex h-fit min-h-56 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
              value={response}
              style={{ height: "100px" }} // Set a default height inline
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

            {isEssaySaving && <Saving />}
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-x-3">
              <button
                className="rounded-lg border border-primary bg-white px-6 py-2 text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-primary"
                onClick={async () => {
                  setAILoading(true);
                  await brainstorm();
                  setAILoading(false);
                }}
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
                onClick={async () => {
                  setAILoading(true);
                  await critique();
                  setAILoading(false);
                }}
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

export function Saving() {
  return (
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
  );
}
