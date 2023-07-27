import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <p className="text-center mt3">
        <Link to="/about">About Us</Link>|<Link to="/contact">Contact Us</Link>|
        <Link to="/policy">Privacy & Policy</Link>|
        <Link to="/terms">Terms & Conditions</Link>
      </p>
      <h6 className="text-center">
        Copyrights &copy;
        {new Date().getFullYear()} <span className="text-danger">|</span>{" "}
        FURNI-HUB <span className="text-danger">|</span> All Right Reserved
      </h6>
    </div>
  );
}

export default Footer;
