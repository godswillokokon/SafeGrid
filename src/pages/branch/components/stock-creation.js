import React, {useState} from 'react';
// import React from 'react';
import ContentNavbar from 'pages/branch/components/content-navbar';
import Sidebar from 'pages/branch/components/sidebar';
import Footer from 'pages/branch/components/footer';

import StockModel from 'models/StockCreation';
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

  let name;
  let unit;
  let description;


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
                            CREATE STOCKS
                  </button>
                  <br />
                  <br />
                  <div className="info-wrapper5">
                    <div className="info-icon21">
                      <h4 className="subhead-title"> Stocks</h4>
                      <h5 className="subhead-title-2" />
                    </div>
                    <br />
                    <br />
                    <div className="horizontal-rule1 table-responsive">
                      <table
                        className="table table-condesnsed
              table-stripped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Stock ID</th>
                            <th>Stock Name</th>
                            <th>Date Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stockList.map((stock, index) => (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{stock.id}</td>
                              <td>{stock.name}</td>
                              <td>
                                {new Date(stock.created_at).toDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              </div>
              <Footer />

              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="info-icon11">
                        <h4 className="subhead-title">Create Stock</h4>
                        <h5 className="subhead-title-2"></h5>
                      </div>
                      <button type="button" className="close"
                        data-dismiss="modal">&times;</button>
                    </div>
                    {/* <div className="modal-body"> */}
                    <div className="col-lg-12">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        StockModel.stockList.createStock({
                          name,
                          unit,
                          description,
                          'branch-id': UserModel.getBranch().id,
                        }
                        );
                        // .then(() => {
                        //   StockModel.dippingList.fetch().then(() => {
                        //     setDippingList(StockModel.dippingList.stocks);
                        //     setIntit(true);
                        //   });
                        // });
                      }}>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name"
                              onChange={(e) => {
                                name = e.target.value;
                              }}
                              placeholder="Name of Stock"
                              className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Unit</label>
                            <input type="text" name="unit"
                              onChange={(e) => {
                                unit = e.target.value;
                              }}
                              placeholder="In Litres"
                              className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description"
                              onChange={(e) => {
                                description = e.target.value;
                              }}
                              placeholder="Short Description"
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
