import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/branch/components/content-navbar';
import Sidebar from 'pages/admin/components/sidebar';
import Footer from 'pages/admin/components/footer';

import Branch from 'models/Branch';
import InvoiceModel from 'models/BranchInvoiceReport';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';
import {setValueCurrentPage} from './common';

const Invoices = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isAdmin()) {
    return AuthHelper.loginRedirect();
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [init, setIntit] = useState(false);

  let [branch, setBranchStock] = useState(branch);

  const [stock, setStockId] =
  useState(InvoiceModel.invoiceList.stock);
  if (!init) {
    setIntit(true);
    InvoiceModel.invoiceList.getAllStocks().then(() => {
      setStockId(InvoiceModel.invoiceList.stock);
      setLastPage(InvoiceModel.invoiceList.lastPage);
    });
  }


  const [BranchList, setBranchList] = useState(Branch.branchList.branchs);
  if (!init) {
    setIntit(true);
    Branch.branchList.fetch().then(() => {
      setBranchList(Branch.branchList.branchs);
    });
  }


  const [invoiceList, setUserList] =
    useState(InvoiceModel.invoiceList.invoice);
  if (!init) {
    setIntit(true);
    InvoiceModel.invoiceList.getAllStocks().then(() => {
      setUserList(InvoiceModel.invoiceList.invoice);
    });
  }

  let [startDate, setStartDate] =
  useState(startDate);
  if (!init) {
    setStartDate((startDate) => startDate);
  }

  let [dateEnd, setDateEnd] =
  useState(dateEnd);
  if (!init) {
    setDateEnd((dateEnd) => dateEnd);
  }
  let products;

  return (
        <>
            <div className="row">
              <div className="body">
                <Sidebar />
                <ContentNavbar />
                <div className="col-lg-12">
                  <br />
                  <br />
                  <div className="info-wrapper5">
                    <div className="info-icon21">
                      <h4 className="subhead-title">Invoices</h4>
                      <h5 className="subhead-title-2" />
                    </div>
                    <br />
                    <br />
                    <form name="filter" onSubmit={(e) => {
                      e.preventDefault();
                      InvoiceModel.invoiceList.filter({
                        'stock-ids': [products],
                        'start-date': startDate,
                        'end-date': dateEnd,
                      }
                      ).then(() => {
                        setIntit(true);
                        setUserList(InvoiceModel.invoiceList.invoice);
                        filter.reset();
                      });
                    }}>
                      <div className="col-lg-12">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Branch</label>
                            <select name="branch" className="form-control"
                              onChange={(e)=>{
                                branch = setBranchStock(e.currentTarget.value);
                              }}>
                              <option value="" selected>
                            See All</option>
                              {
                                BranchList.map((branch) => (
                                    <>
                                    <option
                                      value={branch.id}>{branch.name}</option>
                                    </>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Stock</label>
                            <select name="products" className="form-control"
                              onChange={(e)=>{
                                products = e.currentTarget.value;
                              }}>
                              <option value="" selected>
                            See All</option>
                              {
                                stock.map((stock) => (
                                    <>
                                    {
                                      (branch && (stock.branch_id == branch)) &&
                                      <option
                                        value={stock.id}>{stock.name}
                                      </option>
                                      ||
                                      ''
                                    }
                                    </>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" name="startDate"
                              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])
                      -(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])
                      -(?:30))|(?:(?:0[13578]|1[02])-31))"
                              onChange={(e) => {
                                startDate = e.currentTarget.value;
                              }}
                              placeholder="PMS In Litres"
                              className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>End Date</label>
                            <input type="date" name="dateEnd"
                              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])
                        -(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])
                        -(?:30))|(?:(?:0[13578]|1[02])-31))"
                              onChange={(e) => {
                                dateEnd = e.currentTarget.value;
                              }}
                              placeholder="PMS In Litres"
                              className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <br/>
                            <input type="submit"
                              value="Search"
                              className="btn btn-success" />
                          </div>
                        </div>
                      </div>
                    </form>

                    <table
                      className="table table-condesnsed
              table-stripped table-hover"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Branch Name</th>
                          <th>Stock</th>
                          <th>Added by</th>
                          <th>Amount </th>
                          <th>Quantity</th>
                          <th>Date Created</th>
                          <th>Date Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          invoiceList.map((user, index) => (
                            <tr key={index} >
                              <td>{user.id}</td>
                              <td>{user.stock.branch.name}</td>
                              <td>{user.stock.name}</td>
                              <td>{user.added_by}</td>
                              <td>{user.amount}</td>
                              <td>{user.quantity}</td>
                              <td>{
                                user.created_at}</td>
                              <td>{
                                user.updated_at}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    <button disabled={!(currentPage>1)} // setUserList(InvoiceModel.invoiceList.invoice);
                      className="btn btn-primary pull-left" onClick={()=>{
                        setCurrentPage(setValueCurrentPage(
                          currentPage, 'previous', lastPage));
                        InvoiceModel.invoiceList.fetchInvoices(
                          setValueCurrentPage(
                            currentPage, 'previous', lastPage))
                          .then(() => {
                            setUserList(
                              InvoiceModel.invoiceList.invoice);
                            setLastPage(
                              InvoiceModel.invoiceList.lastPage);
                          });
                      }}>PREVIOUS</button>
                    <button
                      disabled={!(currentPage!=lastPage)}
                      className="btn btn-primary pull-right"
                      onClick={()=>{
                        setCurrentPage(setValueCurrentPage(
                          currentPage, 'next', lastPage));
                        InvoiceModel.invoiceList.fetchInvoices(
                          setValueCurrentPage(
                            currentPage, 'next', lastPage))
                          .then(() => {
                            setUserList(
                              InvoiceModel.invoiceList.invoice);
                            setLastPage(InvoiceModel.invoiceList.lastPage);
                          });
                      }}>NEXT</button>
                  </div>
                </div>
              </div>
              <Footer />

              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-md">

                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="info-icon21">
                        <h2 className="subhead-title text-center">
                         Invoice Report</h2>
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

export default Invoices;
