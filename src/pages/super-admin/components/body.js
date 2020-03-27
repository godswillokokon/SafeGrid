import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/super-admin/components/content-navbar';
import Sidebar from 'pages/super-admin/components/sidebar';
import Footer from 'pages/super-admin/components/footer';

import CompanyModel from 'models/Company';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Body = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isSuperAdmin()) {
    return AuthHelper.loginRedirect();
  }

  const [init, setIntit] = useState(false);
  const [companyList, setCompanyList] =
    useState(CompanyModel.companyList.companies);
  if (!init) {
    CompanyModel.companyList.fetch().then(() => {
      setCompanyList(CompanyModel.companyList.companies);
      setIntit(true);
    });
  }

  const [adminList, setCompany] =
  useState(CompanyModel.companyList.admins);
  if (!init) {
    CompanyModel.companyList.fetch().then(() => {
      setCompany(CompanyModel.companyList.admins);
      setIntit(true);
    });
  }

  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="row">
            <div className="col-lg-6">
              <div className="info-wrapper">
                <div className="info-icon1">
                  <span className="fa fa-users"></span>
                </div>
                <p className="text-default pull-right">Total Companies</p>
                <h3 className="shift-right text-primary pull-right">
                  {companyList.length}</h3>
                <div className="horizontal-rule">
                  <span className="fa fa-calendar"> </span>
                  Last 24 hours
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="info-wrapper">
                <div className="info-icon2">
                  <span className="fa fa-file"></span>
                </div>
                <p className="text-default pull-right">Total Administrator</p>
                <h3 className="shift-right text-primary pull-right">
                  {adminList.length}</h3>
                <div className="horizontal-rule">
                  <span className="fa fa-calendar"> </span>
                  Last 24 hours
                </div>
              </div>
            </div>
            <br />
            <div className="col-lg-6">
              <div className="info-wrapper3">
                <div className="info-icon11">
                  <h4 className="subhead-title">Companies</h4>
                </div>
                <br />
                <table
                  className="table table-condesnsed
              table-stripped table-hover"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      companyList.map((company, index) => (
                        <tr key={index} >
                          <td>{company.id}</td>
                          <td>{company.name}</td>
                          <td>{company.location}</td>
                          <td>{company.active}</td>
                          <td>{new Date(company.created_at)
                            .toDateString()}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="info-wrapper3">
                <div className="info-icon21">
                  <h4 className="subhead-title">Administrators</h4>
                </div>
                <br />
                <table
                  className="table table-responsive table-condesnsed
              table-stripped table-hover"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Mobile</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      adminList.map((admin, index) => (
                        <tr key={index} >
                          <td>{admin.id}</td>
                          <td>{admin.user.name}</td>
                          <td>{admin.user.gender}</td>
                          <td>{admin.user.mobile}</td>
                          <td>{new Date(admin.created_at)
                            .toDateString()}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Body;
