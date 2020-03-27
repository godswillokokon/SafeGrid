import React from 'react';
import AuthHelper from 'helpers/auth';

const ContentNavbar = () => {
  return (
    <>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="javascript:void(0)" className="navbar-brand">
              <span className="fa fa-bars"> </span>
            </a>
          </div>
          <ul className="nav navbar-nav pull-right">
            {/* <li>
              <a href="javascript:void(0)">
                <span className="dripicons dripicons-user"> </span>
                ACCOUNT
              </a>
            </li> */}
            <li>
              <a href="javascript:;" onClick={AuthHelper.logout}>
                <span className="fa fa-sign-out"> </span>
                &nbsp; Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default ContentNavbar;
