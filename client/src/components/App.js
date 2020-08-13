import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import '../index.scss';
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import JobInfo from './views/DetailJobPage/DetailJobPage';
import PostJob from './views/JobPost';
import JobsbyUser from './views/ListJobsByUser';
import About from './views/About';
import ResetPassword from './views/ResetPassword';
import UpdatePassword from './views/UpdatePassword/UpdatePassword';
import Api from './views/Api/Api';


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    
    <Suspense fallback={(<div>Loading...</div>)}>
      
      
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/jobsid/:jobId" component={Auth(JobInfo, null)} />
          
          <Route exact path="/post" component={Auth(PostJob, true)} />
          <Route exact path="/jobsbyuser" component={Auth(JobsbyUser, true)} />
          <Route exact path="/about" component={Auth(About, null)} />
          <Route exact path="/reset_password" component={Auth(ResetPassword, null)} />
          <Route exact path="/update_password/:userId/:token" component={Auth(UpdatePassword, false)} />
          <Route exact path="/apis" component={Auth(Api, null)} />
        </Switch>
      
      
    </Suspense>
  );
}

export default App;
