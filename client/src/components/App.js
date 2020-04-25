import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import '../index.scss';
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import JobInfo from './views/JobInfo/';
import PostJob from './views/JobPost';

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
          <Route exact path="/jobInfo" component={Auth(JobInfo, null)} />
          <Route exact path="/post" component={Auth(PostJob, null)} />
        </Switch>
      
      
    </Suspense>
  );
}

export default App;
