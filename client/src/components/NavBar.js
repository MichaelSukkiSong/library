import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import { ImLibrary, FaGithub } from "../styles/icons";

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav__logobox">
        <NavLink to="/" className="nav__logolink">
          <ImLibrary />
        </NavLink>
      </div>
      <div className="nav__navbox">
        <div className="nav__item">
          <a
            className="nav__link"
            target="_blank"
            href="https://github.com/MichaelSukkiSong"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
