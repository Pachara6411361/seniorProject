// Navbar.js
import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/AuthContext.jsx"; // Import the auth context

const Navbar = () => {
  const { userType, logout } = useAuth();

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/" activeStyle>
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
              <NavLink to="/register" activeStyle>
                Register
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

// Main Nav container
export const Nav = styled.nav`
  background: #002147; /* Dark Blue background */
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow */
`;

// Navigation Links styling
export const NavLink = styled(Link)`
  color: #ffffff; /* White color for nav links */
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    color: #32cd32; /* Bright green on hover */
  }

  &.active {
    color: #32cd32; /* Bright green for the active link */
  }
`;

// Bars for Mobile View
export const Bars = styled(FaBars)`
  display: none;
  color: #ffffff; /* White color for the bars */
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

// Container for Menu Links
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Button Container
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Button Styling
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #32cd32; /* Bright green for button */
  padding: 10px 22px;
  color: #ffffff; /* White text */
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;

  &:hover {
    background: #ffffff; /* White background on hover */
    color: #32cd32; /* Green text on hover */
  }
`;
