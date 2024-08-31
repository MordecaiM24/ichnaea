import React, { useState } from "react";
import { X } from "lucide-react";

export const UserInfo = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(0); // Start at step 0 for the intro slide
  const [userInfo, setUserInfo] = useState({
    goals: "",
    extracurriculars: "",
    academics: "",
    experience: "",
  });

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

  const handleSubmit = () => {
    onSubmit(userInfo);
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
                case.
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
          {/* ... (rest of the steps remain the same) ... */}
          <div className="mt-8 flex justify-between">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="rounded-lg border border-primary bg-white px-6 py-3 text-lg text-primary transition-all hover:bg-primary hover:text-white"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg bg-primary px-6 py-3 text-lg text-white"
              >
                {step === 0 ? "Get Started" : "Next"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-lg bg-primary px-6 py-3 text-lg text-white"
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
