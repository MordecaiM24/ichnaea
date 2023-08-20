import { Bank, Coin, MortarboardFill } from "react-bootstrap-icons";
import { Link, useSearchParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [navbarClasses, setNavbarClasses] = useState("");

  const removeQueryParams = () => {
    const param = searchParams.get("search");

    if (param) {
      // 👇️ delete each query param
      searchParams.delete("search");

      // 👇️ update state after
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (location.pathname === "/profile" && !window.localStorage.userID) {
      setNavbarClasses(
        "navbar navbar-expand-md bg-primary-gradient navbar-dark"
      );
    } else {
      setNavbarClasses("navbar navbar-expand-md bg-primary mb-3 navbar-dark");
    }
  }, [location]);

  return (
    <>
      {/* navbar */}
      <nav className={navbarClasses}>
        <div className="container-fluid px-5">
          <Link to="/" className="navbar-brand me-5">
            {/* TODO: change logo to text/svg. SVG not working (?) atm */}
            {/* BIGGER TODO: Change logo. Think of new name lol */}
            <img
              src="src/assets/ichnaea-logo-zip-file/png/logo-no-background.png"
              alt="bootstrap"
              width="128"
            />
          </Link>
          {/* toggle button for mobile nav */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* navbar links */}
          <div className="collapse navbar-collapse" id="main-nav">
            <ul className="navbar-nav w-100 justify-content-around ms-md-5 pt-3 align-items-start">
              {/* TODO: change justify-around to make profile sit at end */}
              {/* TODO: Maybe make navbar smaller overall (?) */}
              <li className="nav-item">
                <a href="/colleges" className="nav-link">
                  <p className="lead d-flex align-items-center gap-2">
                    <Bank />
                    Colleges
                  </p>
                </a>
              </li>

              <li className="nav-item">
                <Link to="/scholarships" className="nav-link">
                  <p className="lead d-flex align-items-center gap-2">
                    <Coin />
                    Scholarships
                  </p>
                </Link>
              </li>

              <li className="nav-item ">
                <Link to="/profile" className="nav-link">
                  <p className="lead  d-flex align-items-center gap-2">
                    <MortarboardFill />
                    My Profile
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
