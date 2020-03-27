import React from 'react';
import {
  Redirect,
} from 'react-router-dom';

import Sidebar from 'pages/admin/components/sidebar';
import ContentNavbar from 'pages/admin/components/content-nav';
import Footer from 'pages/admin/components/footer';

import UserModel from 'models/User';
import AuthHelper from 'helpers/auth';

const Receivables = () => {
  if (!AuthHelper.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!UserModel.isAdmin()) {
    return AuthHelper.loginRedirect();
  }

  return (
    <>
      <div className="row">
        <div className="body">
          <Sidebar />
          <ContentNavbar />

        </div>
        <Footer />
      </div>
    </>
  );
};

export default Receivables;
