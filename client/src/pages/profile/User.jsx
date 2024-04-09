import React, { useEffect, useState } from "react";
import { supabase } from "../../App";
import TodoList from "./TodoList";

import { CollegeList } from "./CollegeList";

export default function User() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [essays, setEssays] = useState([]);

  async function getUser() {
    const id = (await supabase.auth.getSession()).data.session.user.id;

    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);

    let { data: todos, error: todosError } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", id)
      .order("created_at");

    let { data: colleges, error: collegesError } = await supabase
      .from("user_saved_colleges")
      .select(
        `
        colleges (
          full_name, id
        ),
        deadlines (
          special_name
        )
        `,
      )
      .eq("user_id", id);

    let { data: essays, error: essayErr } = await supabase
      .from("user_supplemental_essays")
      .select("*")
      .eq("user_id", id);

    setEssays(essays);
    setUser(user[0]);
    setTodos(todos);
    setColleges(colleges);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    location.reload();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="tw-relative tw-mb-96 tw-flex tw-w-full tw-justify-center tw-px-10 tw-py-14">
      <div className="tw-w-full tw-max-w-[1220px]">
        <TodoList todos={todos} />

        <CollegeList colleges={colleges} essays={essays} />
      </div>

      <button
        className="tw-absolute tw-right-6 tw-top-4 tw-rounded-lg tw-bg-primary tw-px-4 tw-py-2 tw-text-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}
