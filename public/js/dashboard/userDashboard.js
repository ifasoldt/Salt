import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import UserDashboard from '../components/UserDashboard'
import Hosting from '../components/Hosting'
import Attending from '../components/Attending'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/current_user/dashboard" component={UserDashboard}>
      <Route path="/current_user/dashboard/hosting" component={Hosting} />
      <Route path="/current_user/dashboard/attending" component={Attending} />
    </Route>
  </Router>
, document.getElementById('renderUser'))
