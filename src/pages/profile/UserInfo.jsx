import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/App";

export const UserInfo = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    goals: "",
    extracurriculars: "",
    academics: "",
    experience: "",
  });

  async function getUser() {
    const user_id = (await supabase.auth.getSession()).data.session.user.id;
    console.log(user_id);

    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id);

    console.log(user);

    setUser(user[0]);
    setUserInfo(user[0].user_info);
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    console.log("Doing in userinfo");
    const { data, error } = await supabase
      .from("users")
      .update({ user_info: userInfo })
      .eq("id", user.id)
      .select("*");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl rounded-lg bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="mb-6 text-3xl font-thin">
          Welcome to Your College Application Journey
        </h2>
        <form className="space-y-6">
          {step === 0 && (
            <div>
              <p className="mb-4 text-lg">
                We're excited to help you on your college application journey!
                To provide you with the best experience, we'd like to collect
                some information about you.
              </p>
              <p className="mb-4 text-lg">
                <strong>Important:</strong> The data you provide will only be
                used if you choose to use our AI-powered features. These
                features can help brainstorm ideas for your essays and provide
                personalized suggestions.
              </p>
              <p className="text-lg">
                Your privacy is important to us. You can always choose not to
                use the AI features, and your data will not be processed in that
                case. You can always come back and edit or delete your
                information.
              </p>
            </div>
          )}
          {step === 1 && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                What are your goals?
              </label>
              <textarea
                name="goals"
                value={userInfo.goals}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="Describe your academic and career goals..."
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                List your extracurricular activities:
              </label>
              <textarea
                name="extracurriculars"
                value={userInfo.extracurriculars}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="Include clubs, sports, volunteer work, etc..."
              />
            </div>
          )}
          {step === 3 && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                Relevant academics/coursework:
              </label>
              <textarea
                name="academics"
                value={userInfo.academics}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="List advanced courses, academic achievements, research projects..."
              />
            </div>
          )}
          {step === 4 && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                Any other relevant experience:
              </label>
              <textarea
                name="experience"
                value={userInfo.experience}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="Include internships, work experience, personal projects..."
              />
            </div>
          )}
          <div className="mt-8 flex justify-end space-x-4">
            <div className="flex-1">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="rounded-lg border border-primary bg-white px-6 py-2 text-lg text-primary transition-all hover:bg-primary hover:text-white"
                >
                  Previous
                </button>
              )}
            </div>
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg bg-primary px-6 py-2 text-lg text-white"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-lg bg-primary px-6 py-2 text-lg text-white"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export const EditUserInfo = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("goals");
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    goals: "",
    extracurriculars: "",
    academics: "",
    experience: "",
  });

  async function getUser() {
    const user_id = (await supabase.auth.getSession()).data.session.user.id;
    console.log(user_id);

    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id);

    console.log(user);

    setUser(user[0]);
    setUserInfo(user[0].user_info);
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("Doing in userinfo");
    const { data, error } = await supabase
      .from("users")
      .update({ user_info: userInfo })
      .eq("id", user.id)
      .select("*");

    onClose();
  };

  const tabs = [
    { id: "goals", label: "Goals" },
    { id: "extracurriculars", label: "Extracurriculars" },
    { id: "academics", label: "Academics" },
    { id: "experience", label: "Experience" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl rounded-lg bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="mb-6 text-3xl font-thin">Edit Your Information</h2>
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <form className="space-y-6">
          {activeTab === "goals" && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                Your Goals
              </label>
              <textarea
                name="goals"
                value={userInfo.goals}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="Describe your academic and career goals..."
              />
            </div>
          )}
          {activeTab === "extracurriculars" && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                Extracurricular Activities
              </label>
              <textarea
                name="extracurriculars"
                value={userInfo.extracurriculars}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="List your extracurricular activities..."
              />
            </div>
          )}
          {activeTab === "academics" && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                Relevant Academics/Coursework
              </label>
              <textarea
                name="academics"
                value={userInfo.academics}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="Describe your relevant academics and coursework..."
              />
            </div>
          )}
          {activeTab === "experience" && (
            <div>
              <label className="mb-2 block text-lg font-medium text-gray-700">
                Other Relevant Experience
              </label>
              <textarea
                name="experience"
                value={userInfo.experience}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 text-base"
                rows="6"
                placeholder="Describe any other relevant experience..."
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-primary px-4 py-3 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
