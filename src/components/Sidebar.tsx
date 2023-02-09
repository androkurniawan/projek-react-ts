import React from 'react';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/css/style.css';
import { Link, NavLink, useNavigate, NavigateFunction } from "react-router-dom";

function Sidebar() {
  const navigate: NavigateFunction = useNavigate();

  const logout: () => void = () => {
    document.cookie = "username=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    localStorage.removeItem("role");
    navigate("/");
  }
  
  return (
    <>
    <aside id="sidebar" className="sidebar pt-5">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/">
          <i className="bi bi-envelope"></i>
          <span><i className="fa-solid fa-house"></i>Home</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to={localStorage.getItem('role') === 'customer' ? "/profile-customer" : "/profile-hotel"} className="nav-link collapsed">
          <i className="bi bi-person"></i>
          <span><i className="fa-solid fa-user"></i>Profile</span>
        </Link>
      </li>

      <li className="nav-item">
        <NavLink
          className="nav-link collapsed"
          to={localStorage.getItem('role') === 'customer' ? "/update-profile-customer" : "/update-profile-hotel"}
        >
          <i className="bi bi-card-list"></i>
          <span><i className="fa-regular fa-pen-to-square"></i>Update Profile</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to={localStorage.getItem('role') === 'customer' ? "/change-password-customer" : "/change-password-hotel"}>
          <i className="bi bi-dash-circle"></i>
          <span><i className="fa-solid fa-key"></i>Change Password</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link onClick={logout} className="nav-link collapsed" to="/">
          <i className="bi bi-box-arrow-in-right"></i>
          <span><i className="fa-solid fa-right-from-bracket"></i>Logout</span>
        </Link>
      </li>

    </ul>

  </aside>
  </>
  )
}

export default Sidebar;