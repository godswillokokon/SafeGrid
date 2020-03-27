import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';

import ContentNavbar from 'pages/branch/components/content-navbar';
import Sidebar from 'pages/branch/components/sidebar';
import Footer from 'pages/branch/components/footer';

import DippingModel from 'models/Dipping';
import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';


const Dipping = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isBranchRep()) {
    return AuthHelper.loginRedirect();
  }


  const [init, setIntit] = useState(false);
  const [dippingList, setDippingList] =
  useState(DippingModel.dippingList.records);
  if (!init) {
    setIntit(true);
    DippingModel.dippingList.init().then(() => {
      setDippingList(DippingModel.dippingList.records);
    });
  }


  const [stockList, setStockId] =
  useState(DippingModel.dippingList.stock);
  if (!init) {
    setIntit(true);
    DippingModel.dippingList.init().then(() => {
      setStockId(DippingModel.dippingList.stock);
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
  let product;
  let products;

  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="col-lg-12">
            <button className="pull-left btn btn-primary "
              data-toggle="modal"
              data-target="#myModal">
              Add Dipping Record
            </button>
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
                      DippingModel.dippingList.addDipping({
                        'stock-id': product,
                        quantity,
                        'type': 'update',
                      }
                      ).then(() => {
                        setIntit(true);
                        DippingModel.dippingList.init().then(() => {
                          setDippingList(DippingModel.dippingList.records);
                        });
                      });
                    }}>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Product</label>
                          <select name="type" className="form-control"
                            onChange={(e)=>{
                              product = e.currentTarget.value;
                            }}>
                            <option value="" disabled selected>
                            Product</option>
                            {
                              stockList.map((stock, index) => (
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
            <br /><br />
            <div className="info-wrapper5">
              <div className="info-icon21">
                <h4 className="subhead-title">Dipping Records</h4>
                <h5 className="subhead-title-2"></h5>
              </div>
              <br /><br />
              <p className="paragraph-label">
                show
                <input type="text" name="" className="entries-field" />
                entries
              </p>
              {/* <p className="paragraph-label"></p> */}
                Search
              <form name="filter" onSubmit={(e) => {
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
                      <label>Product</label>
                      <select name="products" className="form-control"
                        onChange={(e)=>{
                          products = e.currentTarget.value;
                        }}>
                        <option value="" selected>
                            See All</option>
                        {
                          stockList.map((stock, index) => (
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

                <table className="table table-condesnsed
              table-stripped table-hover">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Product</th>
                      <th>Ideal Stock</th>
                      <th>Dipping</th>
                      {/* <th>Transaction Type</th> */}
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dippingList.map((records, index) => (
                        <tr key={index} >
                          <td>{index}</td>
                          <td>{records.stock.name}</td>
                          <td>{records.previous_balance}</td>
                          <td>{records.balance}</td>
                          <td>{records.created_at}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <button className="btn btn-primary pull-left">PREVIOUS</button>
              <button className="btn btn-primary pull-right">NEXT</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dipping;
