import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";


function NavbarLarge(props) {
  let cart_items_no=useSelector((state) => state.cartProducts.cartNumber);
  const [tabs] = useState(props.tabs);
  const socialIcons =[
    ...props.socialIcons,
    <div className="nav-top--login-cart">
      <div>
        <Link className="login" to="/Auth/Login">
          Log In
        </Link>
      </div>
      <Link className="cart" to="/Checkout">
        Cart({cart_items_no?cart_items_no:cart_items_no})
      </Link>
    </div>,
    ,
  ];

  const showHideNav = () => {
    var prevY = window.pageYOffset;
    window.onscroll = function () {
      var currentY = window.pageYOffset;
      //show on scroll up
      if (prevY > currentY) {
        document.getElementById("nav-section").style.top = "0px";
      }
      //hide on scroll down
      else {
        document.getElementById("nav-section").style.top = "-1000px";
      }
      prevY = currentY;
    };
  };
  useEffect(() => {
    showHideNav();
  }, []);
  return (
    <div id="nav-section">
      <div className="row nav-top">
        <div className="col-lg-4 col-12 mb-4">
          <form className="search-box">
            <span className="search-icon">
              <FiSearch />
            </span>
            <input className="search" type="search" placeholder="Search..." />
          </form>
        </div>
        <div className="col-lg-3 col-2 nav-brand">Belle.</div>
        <div className="col-lg-5 col-10">
          <ul className="navbar-nav--head">
            {socialIcons.map((element) => {
              return (
                <li key={Math.random() * 1000} className="nav-item--top">
                  <span className="nav-link--top">{element}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <nav className="navbar navbar-expand">
        <div className=" navbar-collapse" id="navbar">
          <ul className="navbar-nav">
            {tabs.map((tab) => {
              return (
                <li
                  id={tab.url}
                  key={Math.random() * 1000}
                  className="nav-item"
                >
                  <Link className={`${"nav-link"}`} to={`/${tab.url}`}>
                    {tab.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarLarge;
