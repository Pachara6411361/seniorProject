import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

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
        color: #32CD32; /* Bright green on hover */
    }

    &.active {
        color: #32CD32; /* Bright green for the active link */
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
    background: #32CD32; /* Bright green for button */
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
        color: #32CD32; /* Green text on hover */
    }
`;
