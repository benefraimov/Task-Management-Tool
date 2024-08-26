import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/Footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        {/* Company Information */}
        <div className={classes.companyInfo}>
          <h2>Taskify</h2>
          <p>Leading Task Management Solution for Professionals.</p>
        </div>

        {/* Quick Links */}
        <div className={classes.quickLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/dashboard">About Us</Link>
            </li>
            <li>
              <Link to="/dashboard">Services</Link>
            </li>
            <li>
              <Link to="/dashboard">Contact</Link>
            </li>
            <li>
              <Link to="/dashboard">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className={classes.socialMedia}>
          <h3>Follow Us</h3>
          <div className={classes.icons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={classes.copyright}>
        <p>&copy; 2024 Taskify, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
