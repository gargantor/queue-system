import React from 'react';
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import adminlteHelper from '../../helper/adminlte.helper';

export default function SidebarPartial(props) {
    let match = useRouteMatch()    
    let location = useLocation();
    React.useLayoutEffect(()=>{
        //console.log(location);
        adminlteHelper.fixSidebarHeight()

    },[location])
    React.useEffect(()=>{
        
    },[location])
  return (
    <aside className="main-sidebar sidebar-dark-info elevation-4">
        <NavLink to={`${match.path}/`} className="brand-link">
            <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '0.8'}} />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
        </NavLink>
    <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image"><img src="/img/avatar2.png" className="img-circle elevation-2" alt="User" /></div>
        <div className="info"><NavLink to={`${match.path}/profile`} className="d-block">{props.currentUser.fullname ? props.currentUser.fullname : 'Dummy name'}</NavLink></div>
        </div>
        <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">                
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}/desk`}>
                    <i className="nav-icon fas fa-laptop-house" /><p>Desk</p>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}/profile`}>
                    <i className="nav-icon fas fa-user" /><p>Profile</p>
                </NavLink>
            </li>
            {props.isModerator &&
            <>
            <li className="nav-header">Admin</li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}/reports`}>
                    <i className="nav-icon far fa-chart-bar" /><p>Reports</p>
                </NavLink>                
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}/users`}>
                    <i className="nav-icon fas fa-users" /><p>Users List</p>
                </NavLink>                
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}/counters`}>
                    <i className="nav-icon fas fa-users" /><p>Counters List</p>
                </NavLink>                
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}/services`}>
                    <i className="nav-icon fas fa-users" /><p>Services List</p>
                </NavLink>            
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}/settings`}>
                    <i className="nav-icon fas fa-wrench" /><p>Settings</p>
                </NavLink>
            </li>
            </>
            }
            <li className="nav-header">MISCELLANEOUS</li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to='/maintenance'>
                    <i className="nav-icon fas fa-cog" /><p>Maintenance</p>
                </NavLink>            
            </li>
        </ul>
        </nav>
    </div>
    </aside>


  );
}
