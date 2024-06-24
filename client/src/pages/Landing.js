import "./Landing.scss";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__box">
        <div className="landing__header">
          <h1 className="heading-primary">Library Management</h1>
        </div>
        <div className="landing__description">
          <h2 className="heading-secondary">Manage your books here!</h2>
        </div>
        <div className="landing__btn-section">
          <NavLink to="/books" className="landing__gotolink">
            <div className="landing__btn">
              <h2 className="heading-secondary">Show Books</h2>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Landing;
