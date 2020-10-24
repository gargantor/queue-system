import React from 'react';
import { NavLink } from "react-router-dom";

export default function HeaderPartial(props) {
  return (
    <nav className="main-header navbar navbar-expand navbar-blue navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item"><a className="nav-link" data-widget="pushmenu" href="/#" role="button"><i className="fas fa-bars" /></a></li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to='/'>
              Home
          </NavLink>
        </li>
        <li className="nav-item">          
          <NavLink className="nav-link" activeClassName="active" to='/login'>
              Login
          </NavLink>  
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to='/register'>
              Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to='/monitor'>
              Monitor
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to='/kiosk'>
              Kiosk
          </NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item d-none d-sm-inline-block">
          <button className="nav-link btn btn-danger btn-labeled" onClick={props.logout}>
            <span className="btn-label"><i className="nav-icon fas fa-power-off" /></span>
            Logout
          </button>
        </li>
      </ul>
    </nav>

  
  );
}
