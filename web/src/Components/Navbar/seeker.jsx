import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./navbarElements.jsx";
import { useAuth } from "../AuthContext.jsx"; // Import the auth context

const Navbar = () => {
    const { isSignedIn, signOut } = useAuth();

    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/search" activeStyle>
                        Search
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Teams
                    </NavLink>
                    <NavLink to="/upload" activeStyle>
                        Upload
                    </NavLink>
                    <NavLink to="/resume" activeStyle>Resume</NavLink>
                   
                        
                    
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
