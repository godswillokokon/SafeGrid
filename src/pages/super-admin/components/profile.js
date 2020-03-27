import React from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/super-admin/components/content-navbar';
import Sidebar from 'pages/super-admin/components/sidebar';
import Footer from 'pages/super-admin/components/footer';

import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Profile = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isSuperAdmin()) {
    return AuthHelper.loginRedirect();
  }

  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-6">
            <div className="info-wrapper6">
              <div className="info-icon21">
                <h4 className="subhead-title">Profile</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="" className="form-control"
                    defaultValue={UserModel.profile.FirstName} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="" className="form-control"
                    defaultValue={UserModel.profile.LastName} />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label>Mobile</label>
                  <input type="text" name="" className="form-control"
                    defaultValue={UserModel.profile.Mobile}/>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" name="" className="form-control"
                    defaultValue={UserModel.profile.Role}/>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Gender</label>
                  <input type="text" name="" className="form-control"
                    defaultValue={UserModel.profile.Gender}/>
                </div>
              </div>
              <button className="btn btn-primary
               pull-right">UPDATE PROFILE</button>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="info-wrapper6">
              <div className="info-icon21">
                <h4 className="subhead-title">Change Password</h4>
                <h5 className="subhead-title-2"></h5>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label>Old Password</label>
                  <input type="text" name="" className="form-control" />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label>New Password</label>
                  <input type="text" name="" className="form-control" />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="text" name="" className="form-control" />
                </div>
              </div>
              <button className="btn btn-primary
              pull-right">SAVE CHANGES</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
