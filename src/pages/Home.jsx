import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid p-5 bg-img vw-100 mt--5 text-white flex flex-col items-center justify-center"
      style={{ height: "150vh" }}
    >
      {/* <img src="src/assets/bg-masthead.jpeg" /> */}
      <h1 className="py-2 text-7xl font-light text-white">Universitrack</h1>
      <hr className="divider" />
      <p className="text-xl font-light text-white">
        College applications give you a lot to keep track of. We can help you
        organize all of it.
      </p>
      <button
        className="my-3 rounded-full bg-[rgb(244,98,58)] px-12 py-4 text-xl text-white"
        onClick={() => {
          navigate("/colleges");
        }}
      >
        Try it out
      </button>
    </div>
  );
};
