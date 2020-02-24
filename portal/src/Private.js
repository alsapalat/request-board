import React, {useState} from 'react';
import RequestContainer from 'modules/request/containers/RequestContainer';
import LogoutContainer from 'modules/auth/containers/LogoutContainer';
import DashboardContainer from 'modules/dashboard/containers/DashboardContainer';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

function Private() {
  return (
    <div>
      <div>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/">Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/request">Request</NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={DashboardContainer} />
        <Route path="/request" component={RequestContainer} />
        <Route path="/logout" component={LogoutContainer} />
        <Route component={() => <div>PAGE NOT FOUND</div>} />
      </Switch>
    </div>
  );
}

Private.propTypes = {

};

export default Private;
