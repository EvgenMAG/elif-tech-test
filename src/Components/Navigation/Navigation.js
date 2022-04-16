import React from 'react';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { selectorsAuth } from '../../redux/auth';
import s from './Navigation.module.css';

export default function Navigation() {

//   const isAuthenticated = useSelector(selectorsAuth.getToken);

  return (
    <nav className = {s.header}>
      <NavLink to="/"  className={navData => navData.isActive ? s.activeLink: s.link }>
        Home
      </NavLink>
        <NavLink
          to="/calc"   
          className={navData => navData.isActive ? s.activeLink: s.link }
        >
          Calculator
        </NavLink>
     
    </nav>
  );
}