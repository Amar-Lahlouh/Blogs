import "./Footer.css";
import { useEffect, useState } from "react";

import axios from "axios";

// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/download.png";
function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // You can set your preferred duration in milliseconds
    });
  }, []);
  return (
    <div className="footer" data-aos="fade-right">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="contact">
        <p>
          {" "}
          <span className="material-symbols-outlined">mail</span>
          Email:blog@gmail.com
        </p>
        <p>
          <span className="material-symbols-outlined">call</span> Phone:+9187343
        </p>
      </div>
    </div>
  );
}

export default Footer;
