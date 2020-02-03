import React from 'react';
import RequestContainer from 'modules/request/containers/RequestContainer';
import LogoutContainer from 'modules/auth/containers/LogoutContainer';
import { Switch, Route, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

function Private() {
  return (
    <div>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/request">Request</Link>
        <Link to="/logout">Logout</Link>
      </div>
      <Switch>
        <Route exact path="/" component={() => <div>DASHBOARD CONTAINER</div>} />
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
