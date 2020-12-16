import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
  if (!props.user) {
    return (
      <nav className="navbar__no_user">
        {/* Button menu */}
        <Link className="nav_home" to="/">
          <div className="main-nav__icon menu_top">
            <i className="fas fa-bars"></i>
          </div>
        </Link>
      </nav>
    )
  }

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
        {/* <li> 
          <Link className="nav_linkHeader" to='/dashboard'> 
            <div className="main-nav__icon">
               <i className="fas fa-columns"></i>
            </div>
            <div className="main-nav__menu">
              dashboard
            </div>
            </Link>
        </li> */}

        <li> 
          <Link className="nav_linkHeader" to='/plants'> 
            <div className="main-nav__icon">
               <i className="fas fa-columns"></i>
            </div>
            <div className="main-nav__menu">
              all plants
            </div>
            </Link>
        </li>

        <li>
          <Link className="nav_linkHeader" to='/dashboard/your-plants'> 
            <div className="main-nav__icon">
               <i className="fas fa-leaf"></i>
            </div>
            <div className="main-nav__menu">
              your plants
            </div>
            </Link>
        </li>

        <li>
          <Link className="nav_linkHeader" to='/dashboard/favorite-plants'> 
            <div className="main-nav__icon">
               <i className="far fa-heart"></i>
            </div>
            <div className="main-nav__menu">
              your wishlist
            </div>
            </Link>
        </li>


        <li>
          <Link className="nav_linkHeader" to='/dashboard/account'> 
            <div className="main-nav__icon">
               <i className="far fa-user"></i>
            </div>
            <div className="main-nav__menu">
              account
            </div>
            </Link>
        </li>
      </ul>

      
      <button onClick={props.handleLogout} className="logout-btn">
        <div className="main-nav__icon">
          <i class="fas fa-sign-out-alt"></i>
        </div>
        <div className="main-nav__menu">
              logout
        </div>
      </button> 

      <div className="nav_logo">
        <p><i class="fas fa-seedling"></i> by Monique </p>
      </div>
      

    </nav>
  );
};

export default Navbar;
