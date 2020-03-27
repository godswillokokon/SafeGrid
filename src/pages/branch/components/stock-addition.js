import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/branch/components/content-navbar';
import Sidebar from 'pages/branch/components/sidebar';
import Footer from 'pages/branch/components/footer';

import StockModel from 'models/Stock';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Stocks = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isBranchRep()) {
    return AuthHelper.loginRedirect();
  }
  const [init, setIntit] = useState(false);
  const [stockList, setStockList] =
  useState(StockModel.stockList.stocks);
  if (!init) {
    StockModel.stockList.init().then(() => {
      setStockList(StockModel.stockList.stocks);
      setIntit(true);
    });
  }

  const [stock, setStockId] =
  useState(StockModel.stockList.stock);
  if (!init) {
    setIntit(true);
    StockModel.stockList.init().then(() => {
      setStockId(StockModel.stockList.stock);
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


  let quantity;
  let products;


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
                            ADD STOCKS
                  </button>
                  {/* <button className="pull-right btn btn-danger">
              SYNC INVOICE
            </button> */}
                  <br />
                  <br />
                  <div className="info-wrapper5">
                    <div className="info-icon21">
                      <h4 className="subhead-title"> Stocks</h4>
                      <h5 className="subhead-title-2" />
                    </div>
                    <br />
                    <br />
                    <form name="filter" onSubmit={(e) => {
                      e.preventDefault();
                      StockModel.stockList.filter({
                        'stock-ids': [products],
                        'types': ['addition'],
                        'start-date': startDate,
                        'end-date': dateEnd,
                      }
                      ).then(() => {
                        setIntit(true);
                        setStockList(StockModel.stockList.stocks);
                        filter.reset();
                      });
                    }}>
                      <div className="col-lg-12">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Product</label>
                            <select name="products" className="form-control"
                              onChange={(e)=>{
                                products = e.currentTarget.value;
                              }}>
                              <option value="" selected>
                            See All</option>
                              {
                                stock.map((stock, index) => (
                                    <>
                                    <option key ={index}
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
                            {/* <th>Stock</th> */}
                            <th>Addition</th>
                            <th>Balance</th>
                            <th>Date Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stockList.map((stock, index) => (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{stock.stock.name}</td>
                              <td>{stock.quantity}</td>
                              <td>{stock.balance}</td>
                              <td>
                                {stock.created_at}</td>
                            </tr>
                          ))}
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
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="info-icon11">
                        <h4 className="subhead-title">Add Dipping</h4>
                        <h5 className="subhead-title-2"></h5>
                      </div>
                      <button type="button" className="close"
                        data-dismiss="modal">&times;</button>
                    </div>
                    {/* <div className="modal-body"> */}
                    <div className="col-lg-12">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        StockModel.stockList.addStock({
                          'stock-id': products,
                          quantity,
                          'type': 'addition',
                        }
                        ) .then(() => {
                          StockModel.dippingList.fetch().then(() => {
                            setDippingList(StockModel.dippingList.stocks);
                            setIntit(true);
                          });
                        });
                      }}>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Product</label>
                            <select name="products" className="form-control"
                              onChange={(e)=>{
                                products = e.currentTarget.value;
                              }}>
                              <option value="" disabled selected>
                                Products</option>
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
                            <label>Quantity In Stock</label>
                            <input type="text" name="quantity"
                              onChange={(e) => {
                                quantity = e.target.value;
                              }}
                              placeholder="In Litres"
                              className="form-control" />
                          </div>
                        </div>
                        <input type="submit"
                          id="buttonSave"
                          className="btn btn-success pull-right"
                          type="submit"
                          value="SAVE"
                          // data-dismiss="modal"
                        />
                      </form>
                    </div>
                    {/* </div> */}
                    <div className="modal-footer">
                      <input className="btn btn-danger pull-left"
                        type="button"
                        value="CANCEL"
                        data-dismiss="modal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
  );
};

export default Stocks;
