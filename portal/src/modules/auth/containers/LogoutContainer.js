import React from 'react';
// import PropTypes from 'prop-types';
import * as actions from '../actions';

function LogoutContainer() {
  React.useEffect(() => {
    actions.logout();
  }, []);
  return (
    <div>
      Logging out...
    </div>
  );
}

LogoutContainer.propTypes = {

};

export default LogoutContainer;
