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

const Companies = () => {
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

  let name = '';
  let location = '';
  return (
    <>
      <div className="row" id="users">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-12">
            <button className="pull-right btn btn-primary"
              data-toggle="modal" data-target="#myModal">
              ADD COMPANY
            </button>
            <div className="info-wrapper5">
              <div className="info-icon21">
                <h4 className="subhead-title">Companies</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <br />
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
                    <th>Deactivate</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    companyList.map((company, index) => (
                      <tr key={index} >
                        <td>{index}</td>
                        <td>{company.name}</td>
                        <td>{company.location}</td>
                        <td>{company.active}</td>
                        <td>{new Date(company.created_at)
                          .toDateString()}</td>
                        <td><button onClick={(e) => {
                          e.preventDefault();
                          CompanyModel.companyList.deactivateCompany({
                            'id': company.id,
                            'action': 'deactivate',
                          }).then(() => {
                            setIntit(true);
                            CompanyModel.companyList.fetch.then(() => {
                              setCompanyList(CompanyModel.
                                companyList.companies);
                            });
                          });
                        }}>Deactivate</button></td>

                        <td><button onClick={(e) => {
                          e.preventDefault();
                          CompanyModel.companyList.deleteCompany({
                            'id': company.id,
                          }).then(() => {
                            setIntit(true);
                            CompanyModel.companyList.fetch().then(() => {
                              setCompanyList(CompanyModel.
                                companyList.companies);
                            });
                          });
                        }}>Delete</button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

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
                    CompanyModel.companyList.addCompany({
                      name,
                      location,
                    }
                    ) .then(() => {
                      setIntit(true);
                      CompanyModel.companyList.fetch().then(() => {
                        setCompanyList(CompanyModel.
                          companyList.companies);
                      });
                    });
                  }}>
                    <div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Company Name</label>
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
                          <label>Location</label>
                          <input type="text" name="location"
                            className="form-control"
                            onChange={(e) => {
                              location = e.target.value;
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <button type="submit"
                            className="btn btn-md btn-success pull-center"
                          >
                ADD
                          </button>
                        </div>
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
