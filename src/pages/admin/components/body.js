import React, {useState} from 'react';
import {
  Redirect,
} from 'react-router-dom';
import ContentNavbar from 'pages/admin/components/content-nav';
import Sidebar from 'pages/admin/components/sidebar';
import Footer from 'pages/admin/components/footer';
import Branch from 'models/Branch';
import UserModel from 'models/User';
import InvoiceModel from 'models/BranchInvoiceReport';
import stockModel from 'models/Stock';
import AuthHelper from 'helpers/auth';

const Body = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isAdmin()) {
    return AuthHelper.loginRedirect();
  }

  const [init, setIntit] = useState(false);

  let [branch, setBranchStock] = useState(branch);


  const [stock, setStockId] =
  useState(InvoiceModel.invoiceList.stock);
  if (!init) {
    setIntit(true);
    InvoiceModel.invoiceList.admin().then(() => {
      setStockId(InvoiceModel.invoiceList.stock);
    });
  }

  const [balance, setBalance] =
  useState(stockModel.stockList.stocksBalance);
  if (!init) {
    setIntit(true);
    stockModel.stockList.adminFilter().then(() => {
      setBalance(stockModel.stockList.stocksBalance);
    });
  }

  const products = [];

  const [branchList, setBranchList] = useState(Branch.branchList.branchs);
  if (!init) {
    Branch.branchList.fetch().then(() => {
      setBranchList(Branch.branchList.branchs);
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
            <form name="filter" onSubmit={(e) => {
              e.preventDefault();
              {
                stock.map((stock) => (
                  <>
                  {
                    (branch && (stock.branch_id == branch)) &&
                       products.push(stock.id)
                   ||
               ''
                  }
            </>
                ));
              }
              stockModel.stockList.adminFilter({
                'stock-ids': products,
              }
              )
                .then(() => {
                  setIntit(true);
                  setBalance(stockModel.stockList.stocksBalance);
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
                            Branches Tank Balance</option>
                      {
                        branchList.map((branch) => (
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
                    <input type="submit"
                      value="Update"
                      className="btn btn-success" />
                  </div>
                </div>
              </div>
            </form>
            {
              balance.map((bal) => (
                (bal == null) &&
                <div className="col-lg-4">
                  <div className="info-wrapper">
                    <div className="info-icon1">
                      <span className="fa fa-users"></span>
                    </div>
                    <p className="text-default pull-right">
                       Tank Balance</p>
                    <h3 className="shift-right
                         text-primary pull-right">
                    No Balance Recorded Yet</h3>
                  </div>
                </div>
                  ||
                  <div className="col-lg-4">
                    <div className="info-wrapper">
                      <div className="info-icon1">
                        <span className="fa fa-users"></span>
                      </div>
                      <p className="text-default pull-right">
                        {bal.stock.name} Tank Balance</p>
                      <h3 className="shift-right
                            text-primary pull-right">
                        {bal.balance}</h3>
                    </div>
                  </div>
              ))
            }
            <br />
            <br />

            <div className="col-lg-12">
              <div className="info-wrapper3">
                <div className="info-icon11">
                  <h4 className="subhead-title">Profitable Branches</h4>
                </div>

                <div className="horizontal-rule1 table-responsive">

                  <table
                    className="table table-condesnsed
                    table-stripped table-hover"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Branch Name</th>
                        <th>Created On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        branchList.map((user, index) => {
                          {/* supervisorNames[index]; */}
                          return <tr key={index} >
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{new Date(user.created_at)
                              .toDateString()}</td>
                          </tr>;
                        })
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
