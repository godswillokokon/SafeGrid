import React, {useState} from 'react';

import {
  Redirect,
} from 'react-router-dom';

import Sidebar from 'pages/admin/components/sidebar';
import ContentNavbar from 'pages/admin/components/content-nav';
import Footer from 'pages/admin/components/footer';

import Branch from 'models/Branch';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Branches = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isAdmin()) {
    return AuthHelper.loginRedirect();
  }

  const [init, setIntit] = useState(false);
  const [BranchList, setUserList] = useState(Branch.branchList.branchs);
  // let totalAmount
  if (!init) {
    Branch.branchList.fetch().then(() => {
      setUserList(Branch.branchList.branchs);
      setIntit(true);
    });
  }


  const companyId = 1;

  let name = '';
  let location = '';
  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-12">

            <button className="pull-left btn btn-primary"
              data-toggle="modal" data-target="#myModal">
              ADD BRANCH
            </button>
            <div className="info-wrapper7">
              <div className="info-icon21">
                <h4 className="subhead-title text-center">Create Branch</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <div className="table-responsive">
                <table
                  className="table table-condesnsed
          table-stripped table-hover"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Branch Name</th>
                      <th>Location</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      BranchList.map((user, index) => (
                        <tr key={index} >
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.location}</td>
                          <td>{new Date(user.created_at)
                            .toDateString()}</td>
                          <td> <button onClick={(e) => {
                            e.preventDefault();
                            Branch.branchList.deleteBranch({
                              'id': user.id,
                            }).then(() => {
                              Branch.branchList.fetch().then(() => {
                                setUserList(Branch.branchList.branchs);
                                setIntit(true);
                              });
                            });
                          }}>x</button> </td>
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
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog modal-md">

            <div className="modal-content">
              <div className="modal-header">
                <div className="info-icon21">
                  <h2 className="subhead-title text-center">Create Branch</h2>
                </div>
              </div>
              <div className="modal-body">
                <div className="col-lg-12">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    Branch.branchList.addBranch({
                      name,
                      location,
                      'company-id': companyId,
                    }
                    ).then(() => {
                      setIntit(true);
                      Branch.branchList.fetch().then(() => {
                        setUserList(Branch.branchList.branchs);
                      });
                    });
                  }}>
                    <div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Branch Name</label>
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

export default Branches;
