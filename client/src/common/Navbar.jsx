import { ichnaeaLogo } from "src/assets/assets";
import { Bank, Coin, MortarboardFill } from "react-bootstrap-icons";

export const Navbar = () => {
  return (
    <>
      {/* navbar */}
      <nav className="navbar navbar-expand-md bg-primary mb-5 navbar-dark">
        <div className="container-fluid px-5">
          <a href="#intro" className="navbar-brand me-5">
            {/* TODO: change logo to text/svg. SVG not working (?) atm */}
            {/* BIGGER TODO: Change logo. Think of new name lol */}
            <img src={ichnaeaLogo} alt="bootstrap" width="128" />
          </a>
          {/* toggle button for mobile nav */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          {/* navbar links */}
          <div className="collapse navbar-collapse" id="main-nav">
            <ul className="navbar-nav w-100 justify-content-around ms-md-5 pt-3 align-items-center">
              {/* TODO: change justify-around to make profile sit at end */}
              {/* TODO: Maybe make navbar smaller overall (?) */}
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <p className="lead d-flex align-items-center gap-2">
                    <Bank />
                    Colleges
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <p className="lead d-flex align-items-center gap-2">
                    <Coin />
                    Scholarships
                  </p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link">
                  <p className="lead  d-flex align-items-center gap-2">
                    <MortarboardFill />
                    My Profile
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
