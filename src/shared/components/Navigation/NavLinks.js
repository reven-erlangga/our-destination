import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/create">Add Places</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Auth</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
