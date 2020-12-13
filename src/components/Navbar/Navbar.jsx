import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
  return (
    <nav className='navbar'>
      
      {/* Button menu */}
      <Link className="nav_home" to="/">
      <div className="main-nav__icon menu_top">
        <i className="fas fa-bars"></i>
      </div>
      </Link>
      
      {/* Menu topics */}
      <ul className="nav_links">
        <li> 
          <Link className="nav_linkHeader" to='/'> 
            <div className="main-nav__icon">
               <i className="fas fa-columns"></i>
            </div>
            <div className="main-nav__menu">
              dashboard
            </div>
            </Link>
        </li>

        <li>
          <Link className="nav_linkHeader" to='/'> 
            <div className="main-nav__icon">
               <i className="fas fa-leaf"></i>
            </div>
            <div className="main-nav__menu">
              your plants
            </div>
            </Link>
        </li>

        <li>
          <Link className="nav_linkHeader" to='/'> 
            <div className="main-nav__icon">
               <i className="far fa-heart"></i>
            </div>
            <div className="main-nav__menu">
              your wishlist
            </div>
            </Link>
        </li>


        <li>
          <Link className="nav_linkHeader" to='/'> 
            <div className="main-nav__icon">
               <i className="far fa-user"></i>
            </div>
            <div className="main-nav__menu">
              account
            </div>
            </Link>
        </li>
      </ul>

      <button onClick={props.handleLogout}> Logout </button> 

      <p>Built with <i className="fas fa-heart"></i> by Matt </p>

    </nav>
  );
};

export default Navbar;
