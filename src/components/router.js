import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Login from 'pages/login';

import AdminBody from 'pages/admin/components/body';
import AdminStatistics from 'pages/admin/components/statistics';
import AdminReceivables from 'pages/admin/components/receivables';
import AdminStockAudit from 'pages/admin/components/stock-audit';
import AdminInvoiceReport from 'pages/admin/components/invoice-report';
import AdminStockReport from 'pages/admin/components/stock-report';
import AdminBranches from 'pages/admin/components/branches';
import AdminCreateSupervisor from 'pages/admin/components/create-supervisor';


import SuperAdminBody from 'pages/super-admin/components/body';
import SuperAdminProfile from 'pages/super-admin/components/profile';
import SuperAdminCompanies from 'pages/super-admin/components/companies';
import SuperAdminAddUser from 'pages/super-admin/components/add-user';
import SuperAdminUsers from 'pages/super-admin/components/users';

import BranchBody from 'pages/branch/components/body';
import BranchProfile from 'pages/branch/components/profile';
import BranchCustomers from 'pages/branch/components/customers';
import BranchStockAddition from 'pages/branch/components/stock-addition';
import BranchStockCreation from 'pages/branch/components/stock-creation';
import BranchFuelStock from 'pages/branch/components/dipping';
import BranchInvoices from 'pages/branch/components/invoices';

const RouterComponent = () => {
  return (
    <>
      <Router>
        <Switch>

          <Route exact path="/" component={AdminBody} />
          <Route exact path="/receivables" component={AdminReceivables} />
          <Route exact path="/stock-report"
            component={AdminStockReport} />
          <Route exact path="/invoice-report" component={AdminInvoiceReport} />
          <Route exact path="/stock-audit" component={AdminStockAudit} />
          <Route exact path="/branches" component={AdminBranches} />
          <Route exact path="/create-supervisor"
            component={AdminCreateSupervisor} />
          <Route exact path="/statistics"
            component={AdminStatistics} />


          <Route exact path="/admin" component={SuperAdminBody} />
          <Route exact path="/admin/profile" component={SuperAdminProfile} />
          <Route exact path="/admin/users" component={SuperAdminUsers} />
          <Route exact path="/admin/companies"
            component={SuperAdminCompanies} />
          <Route exact path="/admin/add-user" component={SuperAdminAddUser} />


          <Route exact path="/branch" component={BranchBody} />
          <Route exact path="/branch/profile" component={BranchProfile} />
          <Route exact path="/branch/customers" component={BranchCustomers} />
          <Route exact path="/branch/invoices" component={BranchInvoices} />
          <Route exact path="/branch/stock-addition"
            component={BranchStockAddition} />
          <Route exact path="/branch/stock-creation"
            component={BranchStockCreation} />
          <Route exact path="/branch/dipping" component={BranchFuelStock} />

          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
};

export default RouterComponent;
