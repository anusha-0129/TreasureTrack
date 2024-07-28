import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '40vh', height: '100vh',marginRight:"0rem" }}>
      <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">TreasureTrack</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive) ? 'nav-link text-white active' : 'nav-link text-white'}
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dash"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/income"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Income
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/expense"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Expense
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/currency"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Currency Converter
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/voice-commands"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Voice Commands
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Signout
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
