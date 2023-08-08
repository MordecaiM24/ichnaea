import { Mortarboard } from "react-bootstrap-icons";

export const Error = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="display-1 text-primary">
        <Mortarboard />
      </div>
      <div className="display-5 text-primary">
        Sorry! This page currently does not exist or is in progress
      </div>
    </div>
  );
};
