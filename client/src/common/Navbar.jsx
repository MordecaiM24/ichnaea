import { Bank, Coin, MortarboardFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate("/");
  const [navbarClasses, setNavbarClasses] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setNavbarClasses("navbar navbar-expand-md bg-transparent navbar-dark");
    } else {
      setNavbarClasses("navbar navbar-expand-md bg-primary navbar-dark");
    }
  }, [location]);

  return (
    <>
      {/* navbar */}
      <nav className="bg-primary">
        <div className="flex items-center px-12 pb-2 pt-4">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center pb-2 pe-12"
          >
            {/* TODO: change logo to text/svg. SVG not working (?) atm */}
            {/* BIGGER TODO: Change logo. Think of new name lol */}
            <img
              // src="src/assets/universitrack-logo-zip-file/png/logo-no-background.png"
              src={
                "/assets/universitrack-logo-zip-file/universitrack-website-favicon.png"
              }
              alt="bootstrap"
              width="64"
            />
          </Link>

          {/* navbar links */}
          <ul className="w-100 flex w-full items-center justify-around pl-12">
            {/* TODO: change justify-around to make profile sit at end */}
            {/* TODO: Maybe make navbar smaller overall (?) */}

            <Link
              to="/universities"
              className="flex items-center gap-x-2 text-xl font-light text-white opacity-55 hover:opacity-75"
            >
              <Bank />
              Universities
            </Link>

            <Link
              to="/scholarships"
              className="flex items-center gap-x-2 text-xl font-light text-white opacity-55 hover:opacity-75"
            >
              <Coin />
              Scholarships
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-x-2 text-xl font-light text-white opacity-55 hover:opacity-75"
            >
              <MortarboardFill />
              My Profile
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};
