import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import adminlteHelper from '../helper/adminlte.helper';
import authService from '../service/auth.service';

import HeaderPartial from './partials/header.partial';
import SidebarPartial from './partials/sidebar.partials';
import FooterPartial, {  } from "./partials/footer.partial";

import Content1 from './dashboardPages/content1';
import NoPages from './dashboardPages/nopages';
import DeskPage from './dashboardPages/desk';
import UserList from './dashboardPages/user.list';
import ServiceList from './dashboardPages/service.list';
import ServiceEdit from './dashboardPages/service.edit';
import CounterList from './dashboardPages/counter.list';
import CounterEdit from './dashboardPages/counter.edit';
import ProfilePage from './dashboardPages/profile';
import UserEdit from './dashboardPages/user.edit';

import io from "socket.io-client";
import SettingsPage from './dashboardPages/settings';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isModerator: false,
      isAdmin: false,
      currentUser: authService.getCurrentUser(),
      token: '', 
      socket: null,
    };
  }


  setupSocket = () => {
    if(!this.state.socket){
      console.log("not socketed");
      const newsocket = io();

      newsocket.on("connect", ()=> {
        console.log("Socket connected");;
      })

      newsocket.on("disconnect", () => {
        console.log("disconnect from setupsocket");
        this.setState({socket:null});
        setTimeout(this.setupSocket, 3000);        
      });
      newsocket.on("TicketCountUpdate", (message) => {        
        console.log("from dashboard: "+message);
      })  
      
      this.setState({socket:newsocket});      
    }
  }

  logout = () => {    
    authService.logout();
    this.setState({
      currentUser: ''
    });
  }
  
  componentDidMount(){
    document.body.classList.add('sidebar-mini');
    adminlteHelper.fixLoginRegisterHeight();
    adminlteHelper.fixContentHeight();
    const user = authService.getCurrentUser();

    if(user) {
      this.setState({
        currentUser: user,
        isModerator: user.roles.includes("ROLE_MODERATOR"),
        isAdmin: user.roles.includes("ROLE_ADMIN")
      });
    }
    this.setupSocket();
  }
  componentWillUnmount(){
    console.log("will unmount");
    if(this.state.socket){
      console.log("disconnect will unmount");
      this.state.socket.disconnect();

    }

  }
  
  render() {
    const matchPath = this.props.match.path;
    const { currentUser, isModerator, isAdmin, token, socket } = this.state;
    //const user = authService.getCurrentUser();
    if(!currentUser)
      return <Redirect to='/login' />
    return (
      <>
        <HeaderPartial logout={this.logout} />
        <SidebarPartial isModerator={isModerator} currentUser={currentUser} />
        {/* Content Wrapper. Contains page content */}      
        <div className="content-wrapper">        
          <Switch>
            <Route path={`${matchPath}/desk`}>            
              <DeskPage socket={socket} />
            </Route>            
            <Route path={`${matchPath}/profile`}>
              <ProfilePage />
            </Route>
            {/* Admin Only */}
            <Route path={`${matchPath}/reports`}>
              <Content1 />
            </Route>
            <Route exact path={`${matchPath}/users`}><UserList /></Route>
            <Route exact path={`${matchPath}/users/create`} component={UserEdit} />
            <Route exact path={`${matchPath}/users/:id/edit`} component={UserEdit} />

            <Route exact path={`${matchPath}/counters`}><CounterList /></Route>
            <Route exact path={`${matchPath}/counters/create`} component={CounterEdit} />
            <Route exact path={`${matchPath}/counters/:id/edit`} component={CounterEdit} />

            <Route exact path={`${matchPath}/services`}><ServiceList /></Route>
            <Route exact path={`${matchPath}/services/create`} component={ServiceEdit} />
            <Route path={`${matchPath}/services/:id/edit`} component={ServiceEdit} />
              
            <Route path={`${matchPath}/settings`}>
              <SettingsPage />
            </Route>
            {/* End of Admin Only */}
            <Route exact path={matchPath}> 
              <Content1 />
            </Route>
            <Route>
              <NoPages />
            </Route>
          </Switch>
          
        </div>
        {/* /.content-wrapper */}
        <FooterPartial />
        
      </>
    )
  }
}