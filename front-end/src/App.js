import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import DashboardPage from './pages/dashboardPage';
import KioskPage from './pages/kioskPage';
import LoginPage from "./pages/loginPage";
import MonitorPage from './pages/monitorPage';
import NoPages from './pages/noPages';
import NoprintkioskPage from './pages/nopkioskPage';
import RegisterPage from './pages/registerPage';


function App() {      
  return (
    <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="dashboard" />} />
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/register' component={RegisterPage}/> 
          <Route path='/dashboard' render={(props) => <DashboardPage {...props} />} />
          {/*<Route path='/dashboard'>
              <DashboardPage />
  </Route>*/}
          <Route path='/monitor'>
            <MonitorPage />
          </Route>  
          <Route path='/kiosk'>
            <KioskPage />
          </Route> 
          <Route path='/nopkiosk'>
            <NoprintkioskPage />
          </Route>
          <Route>
            <NoPages />
          </Route>           
        </Switch>
    </Router>
  );
}

export default App;
