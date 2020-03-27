import React from 'react';
import {
  Redirect,
} from 'react-router-dom';

import Sidebar from 'pages/admin/components/sidebar';
import ContentNavbar from 'pages/admin/components/content-nav';
import Footer from 'pages/admin/components/footer';

import AuthHelper from 'helpers/auth';

const InvoiceReport = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <div className='row'>
        <div className='body'>
          <Sidebar />
          <ContentNavbar />
          <div className='col-lg-12'>
            <div className='info-wrapper5'>
              <div className='info-icon21'>
                <h4 className='subhead-title'>InvoiceReport</h4>
                <h5 className='subhead-title-2' />
              </div>
              <br />
              <br />
              <p className='paragraph-label'>
                Date
                <input type=' date' name='' />
                <input type='date' name='' />
                <input type='submit' name='' />
                <button className='btn btn-danger pull-right'>
                  <span className='fa fa-print' /> PRINT
                </button>
              </p>

              <table
                className='table table-condesnsed
              table-stripped table-hover'
              >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile</th>
                    <th>Total Charge</th>
                    <th>Amount Paid</th>
                    <th>Outstanding Balace</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>1234567890</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>active</td>
                    <td>01-01-2003</td>
                  </tr>
                </tbody>
              </table>

              <button className='btn btn-primary pull-left'>PREVIOUS</button>

              <button className='btn btn-primary pull-right'>NEXT</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InvoiceReport;
