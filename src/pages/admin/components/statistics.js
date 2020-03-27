import React, {useState} from 'react';

import ContentNavbar from 'pages/admin/components/content-nav';
import Sidebar from 'pages/admin/components/sidebar';
import Footer from 'pages/admin/components/footer';
import Branch from 'models/Branch';
import UserModel from 'models/User';
import InvoiceModel from 'models/BranchInvoiceReport';
import Invoice from 'models/Invoice';
// import stockModel from 'models/Stock';
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

  const [revenue, setRevenue] =
  useState(Invoice.invoiceList.revenue);
  if (!init) {
    setIntit(true);
    Invoice.invoiceList.fetchRevenue().then(() => {
      setRevenue(Invoice.invoiceList.revenue);
    });
  }

  const [stockID, setstockID] =
  useState(Invoice.invoiceList.stockIDs);
  if (!init) {
    setIntit(true);
    Invoice.invoiceList.fetch().then(() => {
      setstockID(Invoice.invoiceList.stockIDs);
    });
  }


  const [branchList, setBranchList] = useState(Branch.branchList.branchs);
  if (!init) {
    Branch.branchList.fetch().then(() => {
      setBranchList(Branch.branchList.branchs);
      setIntit(true);
    });
  }

  //   console.log(Invoice.invoiceList.stockIDs);

  let endDate = new Date();
  const dd = String(endDate.getDate()).padStart(2, '0');
  const mm = String(endDate.getMonth() + 1).padStart(2, '0');
  const yyyy = endDate.getFullYear();

  endDate = yyyy + '-' + mm + '-' + dd;


  let startDate = new Date();
  const ddd = String(startDate.getDate()).padStart(2, '0');
  const mmm = String(startDate.getMonth() - 0).padStart(2, '0');
  const yyyyy = startDate.getFullYear();

  startDate = yyyyy + '-' + mmm + '-' + ddd;

  let products;

  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />
          <div className="row">
            <form name="filter" onSubmit={(e) => {
              e.preventDefault();
              if (branch == '') {
                products = stockID;
              } else {
                products = [];
              }

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
              Invoice.invoiceList.fetchRevenue({
                'stock-ids': products,
                'start-date': startDate,
                'end-date': endDate,
              }
              )
                .then(() => {
                  setIntit(true);
                  setRevenue(Invoice.invoiceList.revenue);
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
                      <option value={stockID}
                      >
                            See All Balance</option>
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
                    <input type="date" name="endDate"
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])
                        -(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])
                        -(?:30))|(?:(?:0[13578]|1[02])-31))"
                      onChange={(e) => {
                        endDate = e.currentTarget.value;
                      }}
                      placeholder="End Date"
                      className="form-control" />
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
            <div className="col-lg-12">
              <div className="info-wrapper">
                <div className="info-icon1">
                  <span className="fa fa-money"></span>
                </div>
                <p className="text-default pull-right">
                       Tank Balance</p>
                <h3 className="shift-right
                             text-primary pull-right">
                  {revenue.data}</h3>
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
