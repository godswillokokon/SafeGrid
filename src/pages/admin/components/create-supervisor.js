import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import Sidebar from 'pages/admin/components/sidebar';
import ContentNavbar from 'pages/admin/components/content-nav';
import Footer from 'pages/admin/components/footer';
import toastr from 'toastr';
import Branch from 'models/Branch';
import SupervisorModel from 'models/Supervisor';

import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';
import {setValueCurrentPage} from './common';

const Supervisor = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isAdmin()) {
    return AuthHelper.loginRedirect();
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [init, setIntit] = useState(false);
  const [BranchList, setUserList] = useState(Branch.branchList.branchs);
  if (!init) {
    Branch.branchList.fetch().then(() => {
      setUserList(Branch.branchList.branchs);
      setIntit(true);
    });
  }
  const [init2, setIntit2] = useState(false);
  const [supervisorList, setSupervisorList] =
    useState(SupervisorModel.supervisorList.supervisor);
  if (!init2) {
    SupervisorModel.supervisorList.fetch(currentPage).then(() => {
      setSupervisorList(SupervisorModel.supervisorList.supervisor);
      setLastPage(SupervisorModel.supervisorList.lastPage);
      setIntit2(true); ;
    });
  }

  let gender;
  let supervisorName;
  let mobile;
  let password;
  let password2;
  let branchId;

  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-12">
            <button className="pull-right btn btn-primary"
              data-toggle="modal" data-target="#myModal">
              ADD  MANAGERS
            </button>
            <div className="info-wrapper7">
              <div className="info-icon21">
                <h4 className="subhead-title text-center">
                  Company Managers</h4>
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
                      <th>Supervisor Name</th>
                      <th>Phone Number</th>
                      <th>Branch Assigned</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      supervisorList &&
                       supervisorList.length>0 &&
                        supervisorList.map((user, index) => (
                          <tr key={index} >
                            <td>{user.id}</td>
                            <td>{user.user.name}</td>
                            <td>{user.user.mobile}</td>
                            <td>{user.user.branches.map((branch) => (
                              branch.name
                            ))}</td>
                            <td>{new Date(user.created_at)
                              .toDateString()}</td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
                <button disabled={!(currentPage>1)}
                  className="btn btn-primary pull-left" onClick={()=>{
                    setCurrentPage(setValueCurrentPage(
                      currentPage, 'previous', lastPage));
                    SupervisorModel.supervisorList.fetch(
                      setValueCurrentPage(
                        currentPage, 'previous', lastPage))
                      .then(() => {
                        setSupervisorList(
                          SupervisorModel.supervisorList.supervisor);
                        setLastPage(
                          SupervisorModel.supervisorList.lastPage);
                      });
                  }}>PREVIOUS</button>
                <button
                  disabled={!(currentPage!=lastPage)}
                  className="btn btn-primary pull-right"
                  onClick={()=>{
                    setCurrentPage(setValueCurrentPage(
                      currentPage, 'next', lastPage));
                    SupervisorModel.supervisorList.fetch(
                      setValueCurrentPage(
                        currentPage, 'next', lastPage))
                      .then(() => {
                        setSupervisorList(
                          SupervisorModel.supervisorList.supervisor);
                        setLastPage(SupervisorModel.supervisorList.lastPage);
                      });
                  }}>NEXT</button>
              </div>
            </div>
          </div>

        </div>
        <Footer />
        <form className="modal fade" id="myModal"
          onSubmit={(e) => {
            e.preventDefault();
            if (password != password2) {
              return toastr.error(
                'Password Mismatch!');
            }
            const data = {
              gender,
              'name': supervisorName,
              'branch-id': branchId,
              password,
              mobile,
              'role': 'supervisor',
            };
            SupervisorModel.addSupervisor(data);
          }}
          role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">

            <div className="modal-content">
              <div className="modal-header">
                <div className="info-icon21">
                  <h2 className="subhead-title text-center">
                  Create Supervisor</h2>
                </div>
              </div>
              <div className="modal-body">
                <div className="col-lg-12">
                  <div >
                    <div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Supervisor Name</label>
                          <input type="text" name="branch"
                            className="form-control"
                            onChange={(e) => {
                              supervisorName = e.target.value;
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Assign Branch</label>
                          <select name="AssignBranch" className="form-control"
                            onChange={(e) => {
                              branchId = e.currentTarget.value;
                            }}>
                            <option value="" disabled selected>
                              Assign Branch</option>
                            {
                              BranchList.map((branch, index) => (
                                <option value={branch.id} key={index}>
                                  {branch.name}</option>
                              ))
                            }

                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input type="text" name="branch"
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
                          <select name="AssignBranch" className="form-control"
                            onChange={(e) => {
                              gender = e.currentTarget.value;
                            }}>
                            <option value="" disabled selected>
                              Gender</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>

                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Password</label>
                          <input type="password" name="branch"
                            className="form-control"
                            onChange={(e) => {
                              password = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input type="password" name="branch"
                            className="form-control"
                            onChange={(e) => {
                              password2 = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit"
                  className="btn btn-md btn-success pull-center"
                >
                  ADD
                </button>
                <button type="button" className="btn btn-danger"
                  data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default Supervisor;
