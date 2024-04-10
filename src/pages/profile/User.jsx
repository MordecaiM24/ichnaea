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
    <div className="relative mb-96 flex w-full justify-center px-10 py-14">
      <div className="w-full max-w-[1220px]">
        <TodoList todos={todos} />

        <CollegeList colleges={colleges} essays={essays} />
      </div>

      <button
        className="absolute right-6 top-4 rounded-lg bg-primary px-4 py-2 text-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}
