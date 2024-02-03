import "./Navbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/download.png";
import { AuthContext } from "../../../context/authContext";
function Navbar() {
  useEffect(() => {
    console.log("Navbar");
    AOS.init({
      duration: 1500, // You can set your preferred duration in milliseconds
    });
  }, []);
  const { currentUser, logout } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo" data-aos="fade-left">
          <Link to="/">
            {" "}
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links" data-aos="fade-right">
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link to="/write">Write</Link>
          </span>
        </div>
        <div className={`${menu ? " responsive" : " first-links"}`}>
          {" "}
          <Link className="link" to="/?cat=art" value="art" onClick={closeMenu}>
            <h3>Art</h3>
          </Link>
          <Link className="link" to="/?cat=science" onClick={closeMenu}>
            <h3>Science</h3>
          </Link>
          <Link className="link" to="/?cat=cinema" onClick={closeMenu}>
            <h3>Cinema</h3>
          </Link>
          <Link className="link" to="/?cat=design" onClick={closeMenu}>
            <h3>Design</h3>
          </Link>
          <Link className="link" to="/?cat=food" onClick={closeMenu}>
            <h3>Food</h3>
          </Link>
        </div>
        <div className="bar">
          {!menu ? (
            <span
              onClick={toggleMenu}
              className="material-symbols-outlined"
              style={{ fontSize: "30px" }}
            >
              menu
            </span>
          ) : (
            <span onClick={toggleMenu} className="material-symbols-outlined">
              close
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
