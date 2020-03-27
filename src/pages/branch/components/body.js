import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/branch/components/content-navbar';
import Sidebar from 'pages/branch/components/sidebar';
import Footer from 'pages/branch/components/footer';
import InvoiceModel from 'models/Invoice';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Body = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isBranchRep()) {
    return AuthHelper.loginRedirect();
  }

  const [init, setIntit] = useState(false);
  const [invoiceList, setUserList] = useState(InvoiceModel.invoiceList.invoice);
  if (!init) {
    InvoiceModel.invoiceList.fetch().then(() => {
      setUserList(InvoiceModel.invoiceList.invoice);
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
            <div className="col-lg-3">
              <div className="info-wrapper">
                <div className="info-icon1">
                  <span className="fa fa-users"></span>
                </div>
                <p className="text-default pull-right">Petrol Stock
                Reserve</p>
                <h3 className="shift-right text-primary pull-right">
                  {InvoiceModel.invoiceList.petrolBal[0]}</h3>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="info-wrapper">
                <div className="info-icon2">
                  <span className="fa fa-file"></span>
                </div>
                <p className="text-default pull-right">Kerosine Stock
                 Reserve</p>
                <h3 className="shift-right text-primary pull-right">0</h3>

              </div>
            </div>
            <div className="col-lg-3">
              <div className="info-wrapper">
                <div className="info-icon3">
                  <span className="fa fa-thumbs-up"></span>
                </div>
                <p className="text-default pull-right">Diesel Stock Reserve</p>
                <h3 className="shift-right pull-right"></h3>

              </div>
            </div>
            <div className="col-lg-3">
              <div className="info-wrapper">
                <div className="info-icon4">
                  <span className="fa fa-thumbs-down"></span>
                </div>
                <p className="text-default pull-right">Total Amount Paid</p>
                <h3 className="shift-right pull-right">
                  ₦

                </h3>

              </div>
            </div>

            <br />

            <div className="col-lg-12">
              <div className="info-wrapper3">
                <div className="info-icon21">
                  <h4 className="subhead-title">Invoice</h4>
                  <h5 className="subhead-title-2">Last 10
                  customers</h5>
                </div>
                <div className="horizontal-rule1 table-responsive">
                  <table className="table table-condesnsed
                  table-stripped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Mobile</th>
                        <th>Invoice Ref</th>
                        <th>Amount Paid (Petrol)</th>
                        <th>Amount Paid (Kerosine)</th>
                        <th>Amount Paid (Diesel)</th>
                        <th>Total Amount</th>
                        <th>Date Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        invoiceList.map((invoice, index) => (
                          <tr key={index} >
                            <td>{invoice.ID}</td>
                            <td>{invoice.FirstName} {invoice.LastName}</td>
                            <td>{invoice.Mobile}</td>
                            <td>{invoice.InvoiceRef}</td>
                            <td>{invoice.AmountPaid}</td>
                            <td>{invoice.AmountPaid}</td>
                            <td>{invoice.AmountPaid}</td>
                            <td>{invoice.AmountPaid }</td>
                            <td>{}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
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
