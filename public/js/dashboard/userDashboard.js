import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import UserDashboard from '../components/UserDashboard'
import Hosting from '../components/Hosting'
import Attending from '../components/Attending'
import Inbox from '../components/Inbox'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/current_user/dashboard" component={UserDashboard}>
      <IndexRoute component={Hosting} />
      <Route path="/current_user/dashboard/attending" component={Attending} />
      <Route path="/current_user/dashboard/inbox" component={Inbox} />
    </Route>
  </Router>
, document.getElementById('renderUser'))
