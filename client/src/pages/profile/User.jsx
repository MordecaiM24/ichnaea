import React, { useEffect, useState } from "react";
import { supabase } from "../../App";
import {
  CalendarDate,
  CircleFill,
  Flag,
  FlagFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";
import TodoList from "./TodoList";

export default function User() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [colleges, setColleges] = useState([]);

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

    const { data: colleges, error } = await supabase
      .from("user_saved_colleges")
      .select(
        `
        colleges (
          full_name
        ),
        deadlines (
          special_name
        )
        `,
      )
      .eq("user_id", id);

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
    <div className="tw-relative tw-mb-96 tw-w-full tw-px-10 tw-py-14">
      <TodoList todos={todos} />

      <button
        className="tw-absolute tw-right-6 tw-top-4 tw-rounded-lg tw-bg-primary tw-px-4 tw-py-2 tw-text-white"
        onClick={() => logout()}
      >
        Logout
      </button>

      {JSON.stringify(colleges)}
    </div>
  );
}
