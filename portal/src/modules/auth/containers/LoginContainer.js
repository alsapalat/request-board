// import PropTypes from 'prop-types';
import React, {useState} from 'react'
import * as actions from '../actions';

function LoginContainer() {
  const [payload, setPayload] = useState({email: 'admin@email.com' , password: '123123123'});

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(payload);
  }

  const handleChange = (e) => {
    setPayload({...payload, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="col-3">
        LOGIN FORM HERE
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control form-control-sm" name="email" value={payload.email} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" value={payload.password} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

LoginContainer.propTypes = {

};

export default LoginContainer;
