import React from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/branch/components/content-navbar';
import Sidebar from 'pages/branch/components/sidebar';
import Footer from 'pages/branch/components/footer';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Companies = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isBranchRep()) {
    return AuthHelper.loginRedirect();
  }
  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-12">
            <div className="info-wrapper5">
              <div className="info-icon21">
                <h4 className="subhead-title">Companies</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <br /><br />
              <p className="paragraph-label">
                show
                <input type="text" name="" className="entries-field" />
                entries
              </p>
              <p className="paragraph-label">
                Search
                <input type="text" name="" />
              </p>
              <table className="table table-condesnsed
              table-stripped table-hover">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Company Name</th>
                    <th>Status</th>
                    <th>Company Created On</th>
                    <th>Company Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mobil</td>
                    <td>Active</td>
                    <td>01-01-2003</td>
                    <td>01-01-2003</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Mobil</td>
                    <td>Active</td>
                    <td>01-01-2003</td>
                    <td>01-01-2003</td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-condesnsed
              table-stripped table-hover">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Company Name</th>
                    <th>Status</th>
                    <th>Company Created On</th>
                    <th>Company Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mobil</td>
                    <td>Active</td>
                    <td>01-01-2003</td>
                    <td>01-01-2003</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Mobil</td>
                    <td>Active</td>
                    <td>01-01-2003</td>
                    <td>01-01-2003</td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-primary pull-left">PREVIOUS</button>
              <button className="btn btn-primary pull-right">NEXT</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Companies;
