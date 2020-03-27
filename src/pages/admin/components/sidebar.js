import React from 'react';

import {NavLink} from 'react-router-dom';
import Logo from 'assets/img/logo.jpg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-image">
        <img src={Logo} width="100"></img>
      </div>
      <hr />
      <div className="sidebar-wrap">
        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/" className="sidebar-nav2">
          <span className="fa fa-tachometer icon"></span>
          Dashboard
        </NavLink>

        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/branches" className="sidebar-nav2">
          <span className="fa fa-bank icon"> </span>
          Branches
        </NavLink>

        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/create-supervisor" className="sidebar-nav2">
          <span className="fa fa-user icon"> </span>
          Create Supervisor
        </NavLink>

        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/invoice-report" className="sidebar-nav2">
          <span className="fa fa-address-card icon"> </span>
          Invoice Report
        </NavLink>


        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/stock-report" className="sidebar-nav2">
          <span className="fa fa-address-card icon"> </span>
          Stock Report
        </NavLink>

        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/stock-audit" className="sidebar-nav2">
          <span className="fa fa-line-chart icon"> </span>
          Stock Audit
        </NavLink>

        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/statistics" className="sidebar-nav2">
          <span className="fa fa-line-chart icon"> </span>
          Statistics
        </NavLink>

        <NavLink exact activeStyle={
          {
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
            background: 'linear-gradient(to bottom left, skyblue, rgb(30, 144, 255))',
            boxShadow: '0px 4px 15px rgba(30, 144, 255, .5)',
          }
        } to="/receivables" className="sidebar-nav2">
          <span className="fa fa-chevron-circle-down icon"> </span>
          File Storage
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
