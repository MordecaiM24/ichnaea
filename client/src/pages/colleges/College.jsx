export const College = (props) => {
  const college = props.college;
  const {
    name,
    kebabName,
    location,
    privacy,
    length,
    type,
    genRank,
    numStudents,
    characteristic,
  } = college;

  return (
    <div className="col-12  col-md-6 col-xl-4">
      <div className="card mb-3 border-primary border-2 p-0 btn btn-outline-primary text-start">
        {/* Row gx-0 makes a horizontal card with no space */}
        <div className="row gx-0">
          <div className="col-6 col-md-5">
            <img
              src={`src/assets/${kebabName}-1.jpg`}
              alt="Image of UNC Chapel-Hill"
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-6 col-md-7">
            <div className="card-body p-2" style={{ height: "100%" }}>
              <div
                className="card-text d-flex flex-column justify-content-between overflow-hidden"
                style={{ height: "100%" }}
              >
                {/* TODO: change info depending on screen size */}
                <p className="lead mb-0">{name}</p>
                <small className="d-none d-sm-block">
                  <strong>{location}</strong>
                </small>
                <small className="d-none d-sm-block">
                  {length} &#183; {privacy} &#183; {type}
                </small>
                <small className="d-none d-sm-block">
                  General Ranking: #{genRank}
                </small>
                <small className="d-none d-sm-block">
                  {numStudents.toLocaleString("en-US")} Students
                </small>
                <small className="d-none d-sm-block">{characteristic}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
