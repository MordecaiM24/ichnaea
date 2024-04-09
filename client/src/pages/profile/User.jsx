import React, { useEffect, useState } from "react";
import { supabase } from "../../App";
import { CalendarDate, ChevronDown, FlagFill } from "react-bootstrap-icons";
import TodoList from "./TodoList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

    let { data: colleges, error } = await supabase
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

        <div className="tw-mt-12 tw-flex tw-w-full">
          <div className="tw-w-5/12">
            <p className="tw-inline-block tw-rounded-lg tw-rounded-b-none tw-bg-orange-600 tw-px-3 tw-py-2.5 tw-text-white md:tw-px-12">
              Universities
            </p>
          </div>

          <div className="tw-mr-20 tw-flex tw-w-7/12 tw-items-center tw-ps-6 *:tw-flex *:tw-justify-center">
            <div className="tw-w-1/6">Target Date</div>

            <div className="tw-w-1/2">Application Cycle</div>

            <div className="tw-w-1/6">Completion</div>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="tw-w-full tw-rounded-lg tw-rounded-tl-none tw-border tw-border-gray-300"
        >
          {colleges.map((obj, idx) => {
            let { full_name, id } = obj.colleges;
            let deadline = obj.deadlines.special_name;

            return (
              <AccordionItem
                className="tw-border-b tw-pr-4 first:tw-rounded-tr-lg last:tw-rounded-b-lg last:tw-border-b-0 hover:tw-bg-gray-50"
                value={`item-${idx}`}
              >
                <AccordionTrigger>
                  <div className="tw-flex tw-w-full tw-items-center tw-px-6 tw-font-normal">
                    <div className="tw-flex tw-h-full tw-w-5/12 tw-items-center">
                      <p>{full_name}</p>
                    </div>

                    <div className="tw-flex tw-w-7/12 tw-items-center tw-pe-4 *:tw-flex *:tw-justify-center *:tw-text-xl">
                      <a className="tw-w-1/6">
                        <CalendarDate className="tw-cursor-pointer" />
                      </a>

                      <div className="tw-w-1/2">
                        <button className="tw-w-1/2 tw-rounded-lg tw-py-2 tw-text-base tw-text-opacity-100 tw-transition-all">
                          {deadline}
                        </button>
                      </div>

                      <a className="tw-w-1/6">
                        <FlagFill className="tw-cursor-pointer tw-text-[#0D6EFD]" />
                      </a>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="tw-pe-6 tw-pr-8">
                  {essays
                    .filter((essay) => {
                      console.log("Filtering");
                      console.log(essay);
                      return essay.college_id == id;
                    })
                    .map((essay) => {
                      console.log("Mapping");
                      console.log(essay);
                      return (
                        <div className="py-3 tw-rounded-r-lg tw-border-r tw-border-t tw-border-gray-300 tw-ps-6 last:tw-border-b">
                          <p className="tw-w-7/12">
                            {essay.supplemental_essay_prompt}
                          </p>
                        </div>
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
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
