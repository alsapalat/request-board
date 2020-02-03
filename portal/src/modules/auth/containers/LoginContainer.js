import React from 'react';
// import PropTypes from 'prop-types';
import * as actions from '../actions';

function LoginContainer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // temporary payload
    const payload = {
      email: 'admin@email.com',
      password: '123123123',
    };
    actions.login(payload);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        LOGIN FORM HERE
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

LoginContainer.propTypes = {

};

export default LoginContainer;
