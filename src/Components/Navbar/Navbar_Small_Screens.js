import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

function NavbarSmall(props) {
  let cart_items_no=useSelector((state) => state.cartProducts.cartNumber);
  const [tabs] = useState(props.tabs);
  const {socialIcons} = props;
  const [expandNav, setExpand] = useState(0);
  const toggleExpand = () => {
    setExpand(!expandNav);
  };

  const showHideNav = () => {
    var prevY = window.pageYOffset;
    window.onscroll = function () {
      var currentY = window.pageYOffset;
      //show on scroll up
      if (prevY > currentY) {
        document.getElementById("nav-small").style.top = "0px";
      }
      //hide on scroll down
      else {
        document.getElementById("nav-small").style.top = "-1000px";
      }
      prevY = currentY;
    };
  };
  useEffect(() => {
    showHideNav();
  }, []);
  return (
    <div id="nav-small">
      {expandNav ? (
        <div className="nav-small-list">
          <>
            <div className={`nav-opened__top`}>
              <Link className="login" to="/Auth/Login">
                <span className="login__icon">
                  <FaUserCircle />
                </span>
                Log In
              </Link>
              <span onClick={toggleExpand} className="close-icon">
                <AiOutlineClose />
              </span>
            </div>

            <div className="nav-opened__centerd-search">
              <form className="search-box--small">
                <span className="search-icon">
                  <FiSearch />
                </span>
                <input
                  className="search"
                  type="search"
                  placeholder="Search..."
                />
              </form>
            </div>
            <ul className="navbar-nav navbar-nav--small">
              {tabs.map((tab) => {
                return (
                  <li
                    id={tab.url}
                    key={Math.random() * 1000}
                    className="nav-item"
                  >
                    <Link className={`${"nav-link"}`} to={`/${tab.url}`} onClick={toggleExpand}>
                      {tab.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        </div>
      ) : (
        <>
          <div className="row nav-small-closed mx-0 py-2">
            <ul className="col-6 navbar-nav--social--small">
              {socialIcons?.map((element) => {
                return (
                  <li key={Math.random() * 1000} className="nav-item--top">
                    <span className="nav-link--top">{element}</span>
                  </li>
                );
              })}
            </ul>
            <div className="col-3">
              <Link className="cart" to="/Checkout">
                Cart({cart_items_no})
              </Link>
            </div>
            <div className="col-3 text-end">
              <button
                className="toggle-nav toggle-nav-closed"
                onClick={toggleExpand}
              >
                <AiOutlineBars />
              </button>
            </div>
          </div>
          <div className="nav-brand">Belle.</div>
        </>
      )}
    </div>
  );
}

export default NavbarSmall;
