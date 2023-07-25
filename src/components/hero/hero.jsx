import React from "react";
import "./hero.css";
import bannerimage from "../../assest/banner-girl.png";
import { Link } from "react-router-dom";
export default function Hero({ whichPage, herotitle, heroimg }) {
  const imgpath = whichPage === "home" ? bannerimage : heroimg;

  return (
    <div className="heroContainer">
      <div className="hero">
        {whichPage === "home" ? (
          <div className="heroContent">
            <div className="heroTitle">
              <span className="heroTitle_bold">See</span>

              <span> everything with </span>
              <span className="heroTitle_bold">Clarity</span>
            </div>
            <div className="subtTitle">
              Buying eyewear should leave you happy and good-looking, with money
              in your pocket. Glasses, sunglasses, and contacts—we’ve got your
              eyes covered.
            </div>
            <Link to="/shop" style={{ textDecoration: "none", color: "white" }}>
              <button className="shopNow">
                <span>Shop Now</span>

                <svg
                  t="1686778918486"
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2338"
                  width="20"
                  height="20"
                >
                  <path
                    d="M729.6 448H128v85.333333h601.6L597.333333 665.6l59.733334 59.733333 234.666666-234.666666L661.333333 256l-59.733333 59.733333 128 132.266667z"
                    fill="#ffffff"
                    p-id="2339"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        ) : (
          <div className="heroContent">
            <h1 className="heroTitle_featured">{herotitle}</h1>
          </div>
        )}

        <div className="heroImg">
          <img src={imgpath} alt="bannergril" className="bannergril" />
          {/* <div className="bannergril"></div> */}
        </div>
      </div>
    </div>
  );
}
