import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/branch/components/content-navbar';
import Sidebar from 'pages/branch/components/sidebar';
import Footer from 'pages/branch/components/footer';

import InvoiceModel from 'models/BranchInvoiceReport';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Invoices = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isBranchRep()) {
    return AuthHelper.loginRedirect();
  }
  let amount = '';
  let quantity = '';
  let product;


  const [init, setIntit] = useState(false);
  const [invoiceList, setUserList] =
    useState(InvoiceModel.invoiceList.invoice);
  if (!init) {
    InvoiceModel.invoiceList.fetch().then(() => {
      setUserList(InvoiceModel.invoiceList.invoice);
      setIntit(true);
    });
  }


  const [stock, setStockId] =
  useState(InvoiceModel.invoiceList.stock);
  if (!init) {
    setIntit(true);
    InvoiceModel.invoiceList.fetch().then(() => {
      setStockId(InvoiceModel.invoiceList.stock);
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


  return (
        <>
            <div className="row">
              <div className="body">
                <Sidebar />
                <ContentNavbar />
                <div className="col-lg-12">
                  <button
                    className="pull-left btn btn-success"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                            ADD INVOICE
                  </button>
                  {/* <button className="pull-right btn btn-danger">
              SYNC INVOICE
            </button> */}
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
                        'stock-ids': [product],
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
                            <label>Product</label>
                            <select name="product" className="form-control"
                              onChange={(e)=>{
                                product = e.currentTarget.value;
                              }}>
                              <option value="" selected>
                            See All</option>
                              {
                                stock.map((stock, index) => (
                                    <>
                                    <option key={index}
                                      value={stock.id}>{stock.name}</option>
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
                    <div className="horizontal-rule1 table-responsive">

                      <table
                        className="table table-condesnsed
              table-stripped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Stock ID</th>
                            <th>Added by</th>
                            <th>Quantity</th>
                            <th>Amount </th>
                            <th>Date Created</th>
                            <th>Cancel</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            invoiceList.map((user, index) => (
                              <tr key={index} >
                                <td>{index}</td>
                                <td>{user.stock.name}</td>
                                <td>{user.added_by}</td>
                                <td>{user.quantity}</td>
                                <td>{user.amount}</td>
                                <td>{user.created_at}</td>
                                <td>{<button onClick={(e) => {
                                  e.preventDefault();
                                  InvoiceModel.invoiceList.reverseInvoice({
                                    'id': user.id,
                                  }).then(() => {
                                    setIntit(true);
                                    InvoiceModel.invoiceList.
                                      fetch().then(() => {
                                        setUserList(InvoiceModel.
                                          invoiceList.invoice);
                                      });
                                  });
                                }}>x</button>}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    <button className="btn btn-primary pull-left">
                                PREVIOUS
                    </button>
                    <button className="btn btn-primary pull-right">
                                NEXT
                    </button>
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
                        Create Invoice</h2>
                      </div>
                    </div>
                    <div className="modal-body">
                      <div className="col-lg-12">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          InvoiceModel.invoiceList.addInvoice({
                            'unit-cost': amount,
                            quantity,
                            'stock-id': product,
                          }
                          ).then(() => {
                            setIntit(true);
                            InvoiceModel.invoiceList.fetch().then(() => {
                              setUserList(InvoiceModel.invoiceList.invoice);
                            });
                          });
                        }}>
                          <div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Product</label>
                                <select name="product" className="form-control"
                                  onChange={(e)=>{
                                    product = e.currentTarget.value;
                                  }}>
                                  <option value="" disabled selected>
                            Stocks</option>
                                  {
                                    stock.map((stock, index) => (
                                    <>
                                    <option key={index}
                                      value={stock.id}>{stock.name}</option>
                                    </>
                                    ))
                                  }
                                </select>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Quantity</label>
                                <input type="text" name="quantity"
                                  onChange={(e) => {
                                    quantity = e.target.value;
                                  }}
                                  placeholder="Per Litre"
                                  className="form-control" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Unit Cost</label>
                                <input type="text" name="amount"
                                  onChange={(e) => {
                                    amount = e.target.value;
                                  }}
                                  placeholder="In Naira"
                                  className="form-control" />
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

export default Invoices;
