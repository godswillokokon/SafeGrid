import React from 'react';
import Auth from 'helpers/auth';

import './style.scss';


const Login = () => {
  if (Auth.isLoggedIn()) {
    return Auth.loginRedirect();
  }

  let mobile = '';
  let password = '';

  return (
    <>
      <div className="container">
        <div className="row centered-row ">
          <div className="col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
            <div className="form-panel panel panel-primary">
              <div className="panel-heading text-center">
                <h4>SAFEGRID</h4>
                <hr />
                <h5>Login</h5>
              </div>
              <div className="panel-body">
                <br />
                <form onSubmit={(e) => {
                  e.preventDefault();
                  Auth.login({
                    mobile,
                    password,
                  });
                }}>
                  <div className="form-group form-group-lg">
                    <label>Mobile Number</label>
                    <input type="text" className="form-control"
                      aria-label="mobile"
                      onChange={(e) => {
                        mobile = e.target.value;
                      }} />
                  </div>
                  <div className="form-group form-group-lg">
                    <label>Password</label>
                    <input type="password" className="form-control"
                      aria-label="password"
                      onChange={(e) => {
                        password = e.target.value;
                      }} />
                  </div>
                  <div className="form-group form-group-lg">
                    <button className="btn btn-success btn-lg"
                      type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
