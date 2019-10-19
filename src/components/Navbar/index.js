import React from "react";

import { Container } from "./styles";

import { NavLink } from 'react-router-dom';

// const Navbar = () => (
//     <Container>
//         <ul class="topnav">
//             <li><a class="active" href="/app">Home</a></li>
//             <li><a href="/cameras">Cameras</a></li>
//             <li class="right"><a href="#about">About</a></li>
//             <li class="right"><a href="#logout">Logout</a></li>
//         </ul>
//     </Container>
// );

const Navbar = () => (
    <Container>
        <nav className="navbar">
        <NavLink
            exact
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/app"
        >
            Smart Spy
        </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/cameras"
        >
            Cameras
        </NavLink>
        </nav>
    </Container>
  );

export default Navbar;