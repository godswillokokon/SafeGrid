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
        } to="/admin/" className="sidebar-nav2">
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
        } to="/admin/users" className="sidebar-nav2">
          <span className="fa fa-user-plus icon"> </span>
          Admins
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
        } to="/admin/profile" className="sidebar-nav2">
          <span className="glyphicon glyphicon-user icon"> </span>
          Profile
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
        } to="/admin/companies" className="sidebar-nav2">
          <span className="fa fa-line-chart icon"> </span>
          Companies
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
