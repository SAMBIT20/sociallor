import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
function NavBar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create Post</Link>
        </li>,
        <li>
          <Link to="/myfollowingspost">Following Post</Link>
        </li>,
        <li>
          <button
            style={{
              width: "100px",
              height: "auto",
              marginRight: "20px",
              marginTop: "0px",
            }}
            className="btn #7b1fa2 purple darken-1"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/signin">Signin</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/signin"} className="brand-logo left bold">
            Socialloor
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
