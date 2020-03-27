import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/super-admin/components/content-navbar';
import Sidebar from 'pages/super-admin/components/sidebar';
import Footer from 'pages/super-admin/components/footer';


import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';
import CompanyModel from 'models/Company';

const Companies = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isSuperAdmin()) {
    return AuthHelper.loginRedirect();
  }
  const [init, setIntit] = useState(false);
  const [companyList, setCompanyList] =
  useState(CompanyModel.companyList.admins);
  if (!init) {
    CompanyModel.companyList.fetch().then(() => {
      setCompanyList(CompanyModel.companyList.admins);
      setIntit(true);
    });
  }

  const [companies, setCompanies] =
  useState(CompanyModel.companyList.companies);
  if (!init) {
    CompanyModel.companyList.fetch().then(() => {
      setCompanies(CompanyModel.companyList.companies);
      setIntit(true);
    });
  }

  console.log(companies);
  let companyId;
  let name = '';
  let gender = '';
  let mobile = '';
  let password = '';


  return (
    <>
      <div className="row" id="users">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-12">
            <button className="pull-right btn btn-primary"
              data-toggle="modal" data-target="#myModal">
              ADD ADMIN
            </button>
            <div className="info-wrapper5">
              <div className="info-icon21">
                <h4 className="subhead-title">ADMINISTRATORS</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <br />
              <div className="horizontal-rule1 table-responsive">
                <table
                  className="table table-condesnsed
              table-stripped table-hover"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Company Name</th>
                      <th>Admin Name</th>
                      <th>Mobile</th>
                      <th>Gender</th>
                      <th>Role</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      companyList.map((company, index) => (
                        <tr key={index} >
                          <td>{company.id}</td>
                          <td>{company.company.name}</td>
                          <td>{company.user.name}</td>
                          <td>{company.user.mobile}</td>
                          <td>{company.user.gender}</td>
                          <td>{company.role}</td>
                          <td>{new Date(company.created_at)
                            .toDateString()}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <button className="btn btn-primary pull-left">PREVIOUS</button>
              <button className="btn btn-primary pull-right">NEXT</button>
            </div>
          </div>
        </div>
        <Footer />
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog modal-md">

            <div className="modal-content">
              <div className="modal-header">
                <div className="info-icon21">
                  <h2 className="subhead-title text-center">Create Company</h2>
                </div>
              </div>
              <div className="modal-body">
                <div className="col-lg-12">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    CompanyModel.companyList.addCompanyUser({
                      name,
                      mobile,
                      gender,
                      password,
                      'company-id': companyId,
                    }
                    );
                  }}>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name"
                          className="form-control"
                          onChange={(e) => {
                            name = e.target.value;
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Mobile</label>
                        <input type="text" name="mobile"
                          className="form-control"
                          onChange={(e) => {
                            mobile = e.target.value;
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" className="form-control"
                          onChange={(e) => {
                            gender = e.target.value;
                          }}>
                          <option value="" disabled selected>
                            Gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password"
                          className="form-control"
                          onChange={(e) => {
                            password = e.target.value;
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Companies</label>
                        <select name="companyId" className="form-control"
                          onChange={(e)=>{
                            companyId = e.currentTarget.value;
                          }}>
                          <option value="" disabled selected>
                            See All</option>
                          {
                            companies.map((company, index) => (
                                    <>
                          <option key ={index}
                            value={company.id}>{company.name}</option>
                          </>
                            ))
                          }
                        </select>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <button type="submit"
                          className="btn btn-md btn-success"
                        >
                ADD
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default"
                  data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
