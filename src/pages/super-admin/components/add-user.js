import React from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/super-admin/components/content-navbar';
import Sidebar from 'pages/super-admin/components/sidebar';
import Footer from 'pages/super-admin/components/footer';

import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const AddUser = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isSuperAdmin()) {
    return AuthHelper.loginRedirect();
  }

  let FirstName = '';
  let LastName = '';
  let Mobile = '';
  let Gender = '';
  let Password = '';

  if (!Auth.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isSuperAdmin()) {
    return <h4>You are not authorized to view this page</h4>;
  }

  return (
    <>
      <div className="row" id="add-users">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-6">
            <form className="navbar-form navbar-center" onSubmit={(e) => {
              e.preventDefault();
              UserModel.userList.addUser([
                FirstName,
                LastName,
                Mobile,
                Gender,
                Password,
              ]
              );
            }}>
              <div className="form-group">
                <div className="input-group">
                  <input type="text" className="form-control"
                    placeholder="Firstname" name="FirstName"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      FirstName = e.target.value;
                    }} />
                  <input type="text" className="form-control"
                    placeholder="Lastname" name="LastName"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      LastName = e.target.value;
                    }} />
                  <input type="text" className="form-control"
                    placeholder="Mobile" name="Mobile"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      Mobile = e.target.value;
                    }} />
                  <input type="text" className="form-control"
                    placeholder="Gender" name="Gender"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      Gender = e.target.value;
                    }} />
                  <input type="text" className="form-control"
                    placeholder="Password" name="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      Password = e.target.value;
                    }} />
                </div>
              </div>
              <button type="submit"
                className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AddUser;
