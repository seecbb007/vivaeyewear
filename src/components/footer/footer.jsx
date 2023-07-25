import React from "react";
import "./footer.css";
import logo from "../../assest/eyecare.png";
export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footerContainer">
          <div className="developed">
            Developed by
            <a href="https://www.google.com/" className="author">
              {" "}
              Eris X
            </a>
          </div>
          <div className="footer_logo">
            <img src={logo} alt="eyewearLogo" className="footerlogo" />
            <h5>&copy; 2023</h5>
          </div>
          <div className="fork">
            Fork this project{" "}
            <a href="https://www.google.com/" className="here">
              HERE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
