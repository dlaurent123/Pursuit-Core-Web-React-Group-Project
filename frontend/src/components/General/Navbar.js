import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useInput } from '../../util/customHooks';
import OurCanvasLogoSplat from "../../images/OurCanvasLogoSplat.png";
import "../../css/Navbar.css";

const Navbar = ({ setLoggedIn, onSearch }) => {
  let search = useInput("");
  return (
    <nav>
      <div className="navLeft">
        <img src={OurCanvasLogoSplat} alt="logo" className="navLogo" />
      </div>
      <div className="navRight">
        <NavLink exact to="/" className="navAnchor">
          Home
        </NavLink>
        <NavLink to="/profile" className="navAnchor">
          Profile
        </NavLink>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSearch(search.value);
        }} className="searchForm">
          <input type="search" placeholder="Search By Tag" className="search" {...search} />
        </form>
        <NavLink
          to="/login"
          onClick={() => setLoggedIn(false)}
          className="navAnchor"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
