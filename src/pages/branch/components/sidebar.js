import React from 'react';

import {NavLink} from 'react-router-dom';
import Logo from 'assets/img/logo.jpg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-image">
        <img src={Logo} width="100" />
      </div>
      <hr />
      <div className="sidebar-wrap">
        {/* <NavLink
          exact
          activeStyle={{
            color: 'red',
            height: '50px',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#fafafa',
            paddingTop: '16px',
            display: 'block',
            paddingLeft: '10px',
            // eslint-disable-next-line max-len
            background:
              'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }}
          to="/branch"
          className="sidebar-nav2"
        >
          <span className="fa fa-tachometer icon" />
          Dashboard
        </NavLink> */}

        <NavLink
          exact
          activeStyle={{
            color: 'red',
            height: '50px',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#fafafa',
            paddingTop: '16px',
            display: 'block',
            paddingLeft: '10px',
            // eslint-disable-next-line max-len
            background:
              'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }}
          to="/branch/invoices"
          className="sidebar-nav2"
        >
          <span className="fa fa-money icon"> </span>
          Invoice
        </NavLink>
        <NavLink
          exact
          activeStyle={{
            color: 'red',
            height: '50px',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#fafafa',
            paddingTop: '16px',
            display: 'block',
            paddingLeft: '10px',
            // eslint-disable-next-line max-len
            background:
              'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }}
          to="/branch/dipping"
          className="sidebar-nav2"
        >
          <span className="fa fa-money icon"> </span>
          Dipping
        </NavLink>
        <NavLink
          exact
          activeStyle={{
            color: 'red',
            height: '50px',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#fafafa',
            paddingTop: '16px',
            display: 'block',
            paddingLeft: '10px',
            // eslint-disable-next-line max-len
            background:
              'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }}
          to="/branch/stock-addition"
          className="sidebar-nav2"
        >
          <span className="fa fa-money icon"> </span>
          Stock Addition
        </NavLink>

        <NavLink
          exact
          activeStyle={{
            color: 'red',
            height: '50px',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#fafafa',
            paddingTop: '16px',
            display: 'block',
            paddingLeft: '10px',
            // eslint-disable-next-line max-len
            background:
              'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }}
          to="/branch/stock-creation"
          className="sidebar-nav2"
        >
          <span className="fa fa-money icon"> </span>
          Create Stock
        </NavLink>

        <NavLink
          exact
          activeStyle={{
            color: 'red',
            height: '50px',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#fafafa',
            paddingTop: '16px',
            display: 'block',
            paddingLeft: '10px',
            // eslint-disable-next-line max-len
            background:
              'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }}
          to="#"
          className="sidebar-nav2"
        >
          <span className="glyphicon glyphicon-user icon"> </span>
          File Protection
        </NavLink>


      </div>
    </div>
  );
};

export default Sidebar;
