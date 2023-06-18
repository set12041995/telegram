import React from 'react';
import style from "./style.css";
import images from "../../assets/img";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <a className="logo_redirect" href="./index.html" alt="">
        <img className="logo_img" src={images.logo} alt="Logo" />
        </a>
      </div>

      <div className="right_block">
        <div className="login_block">
          <a className="login" href="./login.html" alt="">Hi, Log in</a>
        </div>

        <div className="shopping_block">
          <a className="shopping_cart" href="./login.html">
            <img src={images["shopping-cart"]} alt="Shopping Cart" />
          </a>
          <div className="cart_counter">0</div>
        </div>

        <div className="logOutBlock">
          <a className="logOut" href="./index.html" alt="">Log out</a>
        </div>
      </div>
    </header>
  );
}
