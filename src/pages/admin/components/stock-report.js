import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import Sidebar from 'pages/admin/components/sidebar';
import ContentNavbar from 'pages/admin/components/content-nav';
import Footer from 'pages/admin/components/footer';

import Branch from 'models/Branch';
import stockModel from 'models/stockReport';
import InvoiceModel from 'models/BranchInvoiceReport';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';
import {setValueCurrentPage} from './common';


const StockReport = () => {
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

  const [stockList, setStock] =
    useState(stockModel.stockList.records);
  if (!init) {
    setIntit(true);
    stockModel.stockList.getAllStocks().then(() => {
      setStock(stockModel.stockList.records);
      setLastPage(stockModel.stockList.lastPage);
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
                <h4 className="subhead-title">StockReport</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <br /><br />
              <form name="filter" onSubmit={(e) => {
                e.preventDefault();
                stockModel.stockList.filter({
                  'stock-ids': [products],
                  'types': ['addition'],
                  'start-date': startDate,
                  'end-date': dateEnd,

                }
                ).then(() => {
                  setIntit(true);
                  setStock(stockModel.stockList.records);
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
              <table className="table table-condesnsed
              table-stripped table-hover table-responsive">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Branch Name</th>
                    <th>Stock</th>
                    <th>Addition</th>
                    <th>Balance</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {stockList.map((stock, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{stock.stock.branch.name}</td>
                      <td>{stock.stock.name}</td>
                      <td>{stock.quantity}</td>
                      <td>{stock.balance}</td>
                      <td>{stock.created_at}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
              <button disabled={!(currentPage>1)} // setUserList(stockModel.stockList.records);
                className="btn btn-primary pull-left" onClick={()=>{
                  setCurrentPage(setValueCurrentPage(
                    currentPage, 'previous', lastPage));
                  stockModel.stockList.fetchRecords(
                    setValueCurrentPage(
                      currentPage, 'previous', lastPage))
                    .then(() => {
                      setStock(
                        stockModel.stockList.records);
                      setLastPage(
                        stockModel.stockList.lastPage);
                    });
                }}>PREVIOUS</button>
              <button
                disabled={!(currentPage!=lastPage)}
                className="btn btn-primary pull-right"
                onClick={()=>{
                  setCurrentPage(setValueCurrentPage(
                    currentPage, 'next', lastPage));
                  stockModel.stockList.fetchRecords(
                    setValueCurrentPage(
                      currentPage, 'next', lastPage))
                    .then(() => {
                      setStock(
                        stockModel.stockList.records);
                      setLastPage(stockModel.stockList.lastPage);
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

export default StockReport;
