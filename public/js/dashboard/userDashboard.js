import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import UserDashboard from '../components/UserDashboard'
import Hosting from '../components/Hosting'
import Attending from '../components/Attending'


ReactDOM.render(
<Router history={browserHistory}>
  <Route path="/" component={UserDashboard}>
    <Route path="hosting" component={Hosting} />
    <Route path="attending" component={Attending} />
  </Route>
</Router>
, document.getElementById('renderUser'))
