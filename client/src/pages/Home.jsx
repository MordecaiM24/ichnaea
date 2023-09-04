import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center p-5 bg-img vw-100 mt--5 text-white"
      style={{ height: "150vh" }}
    >
      {/* <img src="src/assets/bg-masthead.jpeg" /> */}
      <h1 className="display-3">Universitrack</h1>
      <hr class="divider" />
      <p className="lead">
        College applications give you a lot to keep track of. We can help you
        organize all of it.
      </p>
      <button
        className="rounded rounded-pill btn-orange my-3"
        onClick={() => {
          navigate("/colleges");
        }}
      >
        Try it out
      </button>
    </div>
  );
};
