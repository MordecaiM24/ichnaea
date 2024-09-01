import React, { useEffect, useState } from "react";
import { supabase } from "../../App";
import TodoList, { TodoListSkeleton } from "./TodoList";
import { CollegeList, CollegeListSkeleton } from "./CollegeList";
import { UserInfo } from "./UserInfo";
import { EditUserInfo } from "./UserInfo";

export default function User() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [essays, setEssays] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getUser() {
    setLoading(true);

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
      .eq("user_id", id)
      .order("created_at");

    setEssays(essays);
    setUser(user[0]);
    setTodos(todos);
    setColleges(colleges);

    // Check if it's the user's first visit and open the modal if so
    if (user[0] && !user[0].has_visited) {
      setIsModalOpen(true);
    }

    setLoading(false);
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
        {!isLoading ? (
          <>
            <div></div>
            <CollegeList colleges={colleges} essays={essays} />
            <TodoList todos={todos} />
          </>
        ) : (
          <>
            <CollegeListSkeleton />
            <TodoListSkeleton />
          </>
        )}

        {/* {user && <UserInfo user={user} />} */}
      </div>

      <button
        className="absolute right-56 top-4 rounded-lg bg-primary px-4 py-2 text-white"
        onClick={() => setIsEditModalOpen(true)}
      >
        Edit Profile
      </button>

      <button
        className="absolute right-28 top-4 rounded-lg bg-primary px-4 py-2 text-white"
        onClick={() => logout()}
      >
        Logout
      </button>

      <UserInfo
        isOpen={isModalOpen}
        onClose={async () => {
          console.log("Updating has_visited");
          const { data, error } = await supabase
            .from("users")
            .update({ has_visited: "TRUE" })
            .eq("id", user.id)
            .select("*");

          console.log("Should've updated has_visited");

          console.log(data);
          console.log(error);
          setIsModalOpen(false);
        }}
      />

      <EditUserInfo
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
}
