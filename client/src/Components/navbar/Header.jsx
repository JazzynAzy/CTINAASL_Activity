import React from "react";
import "../styles/Header.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView();
      } else {
        window.scrollTo({ top: 0 });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <>
      <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button
              class="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span class="icon icon-bar"></span>
              <span class="icon icon-bar"></span>
              <span class="icon icon-bar"></span>
            </button>

            <a href="index.html" class="navbar-brand">Soft Landing</a>
          </div>

          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#feature">Features</Link></li>
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
