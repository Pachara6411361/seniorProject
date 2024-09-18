// Navbar.js
import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./navbarElements.jsx";
import { useAuth } from "../AuthContext"; // Import the auth context

const Navbar = () => {
  const { userType, logout } = useAuth();

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/home" activeStyle>
            Home
          </NavLink>

          {/* Conditionally render links based on userType */}
          {userType === "user" && (
            <>
              <NavLink to="/upload" activeStyle>
                Upload
              </NavLink>
              <NavLink to="/resume" activeStyle>
                Resume
              </NavLink>
            </>
          )}

          {userType === "staff" && (
            <>
              <NavLink to="/search" activeStyle>
                Search
              </NavLink>
             
            </>
          )}
          
          {/* Show Login and Sign Up when user is not logged in */}
          {!userType && (
            <>
              <NavLink to="/login" activeStyle>
                Login
              </NavLink>
              <NavLink to="/signup" activeStyle>
                Sign Up
              </NavLink>
            </>
          )}
        </NavMenu>

        {/* Show Logout button when user is logged in */}
        {userType && (
          <NavBtn>
            <NavBtnLink to="/" onClick={logout}>
              Logout
            </NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
