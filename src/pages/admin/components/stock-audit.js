import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import Sidebar from 'pages/admin/components/sidebar';
import ContentNavbar from 'pages/admin/components/content-nav';
import Footer from 'pages/admin/components/footer';

import Branch from 'models/Branch';
import InvoiceModel from 'models/BranchInvoiceReport';
import DippingModel from 'models/StockAudit';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';
import {setValueCurrentPage} from './common';

const StockAudit = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isAdmin()) {
    return AuthHelper.loginRedirect();
  }

  const [init, setIntit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  let [branch, setBranchStock] = useState(branch);

  const [stock, setStockId] =
  useState(InvoiceModel.invoiceList.stock);
  if (!init) {
    setIntit(true);
    InvoiceModel.invoiceList.getAllStocks().then(() => {
      setStockId(InvoiceModel.invoiceList.stock);
    });
  }

  const [dippingList, setDippingList] =
  useState(DippingModel.dippingList.records);
  if (!init) {
    setIntit(true);
    DippingModel.dippingList.getAllStocks().then(() => {
      setDippingList(DippingModel.dippingList.records);
      setLastPage(DippingModel.dippingList.lastPage);
    });
  }

  const [BranchList, setBranchList] = useState(Branch.branchList.branchs);
  if (!init) {
    setIntit(true);
    Branch.branchList.fetch().then(() => {
      setBranchList(Branch.branchList.branchs);
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
            <div className="info-wrapper5">
              <div className="info-icon21">
                <h4 className="subhead-title">Stock Audit</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <br /><br />
              <form className="inline-form" name="filter" onSubmit={(e) => {
                e.preventDefault();
                DippingModel.dippingList.filter({
                  'stock-ids': [products],
                  'types': ['update'],
                  'start-date': startDate,
                  'end-date': dateEnd,

                }
                ).then(() => {
                  setIntit(true);
                  setDippingList(DippingModel.dippingList.records);
                  filter.reset();
                });
              }}>
                <div className="col-lg-12">
                  <div className="col-md-3">
                    <div className="form-group">
                      <select name="branch" className="form-control"
                        onChange={(e)=>{
                          branch = setBranchStock(e.currentTarget.value);
                        }}>
                        <option value="" disabled selected>
                            Branch</option>
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
                      <select name="products" className="form-control"
                        onChange={(e)=>{
                          products = e.currentTarget.value;
                        }}>
                        <option value="" disabled selected>
                            Stock Type</option>
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
                  <div className="col-md-2">
                    <div className="form-group">
                      <input type="date" name="startDate"
                        pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])
                      -(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])
                      -(?:30))|(?:(?:0[13578]|1[02])-31))"
                        onChange={(e) => {
                          startDate = e.currentTarget.value;
                        }}
                        placeholder="Start Date"
                        className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <input type="date" name="dateEnd"
                        pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])
                        -(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])
                        -(?:30))|(?:(?:0[13578]|1[02])-31))"
                        onChange={(e) => {
                          dateEnd = e.currentTarget.value;
                        }}
                        placeholder="End Date"
                        className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <input type="submit"
                        value="Update"
                        className="btn btn-success" />
                    </div>
                  </div>
                </div>
              </form>
              <div className="paragraph-label">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  DippingModel.dippingList.filter({
                    id: [parseInt(switchBranch)],
                  }) .then(() => {
                    setDippingList(DippingModel.dippingList.records);
                    console.log(DippingModel.dippingList.records);
                    setIntit(true);
                  });
                }}>

                </form>
              </div>

              <table className="table table-condesnsed
              table-stripped table-hover">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Branch</th>
                    <th>Product</th>
                    <th>Ideal Stock</th>
                    <th>Dipping</th>
                    <th>Difference</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dippingList.map((records, index) => (
                      // record = records.stock_id = 1 ? 'kerosene' :
                      //   records.stock_id = 2 ? 'Diesel' :
                      //     records.stock_id = 3 ? 'Petrol' : ''
                      // ,
                      <tr key={index} >
                        <td>{index}</td>
                        <td>{records.stock.branch.name}</td>
                        <td>{records.stock.name}</td>
                        <td>{records.previous_balance}</td>
                        <td>{records.balance}</td>
                        <td>{records.previous_balance - records.balance }</td>
                        <td>{records.created_at}</td>
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span>Total: </span></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
              <button disabled={!(currentPage>1)}
                className="btn btn-primary pull-left" onClick={()=>{
                  setCurrentPage(setValueCurrentPage(
                    currentPage, 'previous', lastPage));
                  DippingModel.dippingList.getAllStocks(
                    setValueCurrentPage(
                      currentPage, 'previous', lastPage))
                    .then(() => {
                      setDippingList(
                        DippingModel.dippingList.records);
                      setLastPage(
                        DippingModel.dippingList.lastPage);
                    });
                }}>PREVIOUS</button>
              <button

                className="btn btn-primary pull-right"
                onClick={()=>{
                  setCurrentPage(setValueCurrentPage(
                    currentPage, 'next', lastPage));
                  DippingModel.dippingList.getAllStocks(
                    setValueCurrentPage(
                      currentPage, 'next', lastPage))
                    .then(() => {
                      setDippingList(
                        DippingModel.dippingList.records);
                      setLastPage(DippingModel.dippingList.lastPage);
                    });
                }}>NEXT</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default StockAudit;
