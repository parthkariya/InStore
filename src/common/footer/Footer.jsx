import React from 'react'
import "./Footer.css";
import { Link } from 'react-router-dom';
import images from '../../constants/images';

const Footer = () => {
  return (
    <div className="footer_main_wrapp">
      <div className="footer_base_wrapp">
        <div className="footer_sec1">
          <img src={images.logo_white} alt="" />
        </div>
        <div className="footer_sec2">
          <Link>Contact In-Store</Link>
          <div className="foo_vl"></div>
          <Link>FAQ’s</Link>
          <div className="foo_vl"></div>
          <Link>Return Policy</Link>
          <div className="foo_vl"></div>
          <Link>T&C’s</Link>
          <div className="foo_vl"></div>
          <Link>Responsible Disclosure</Link>
          <div className="foo_vl"></div>
          <Link>Corporate T&C’s</Link>
          <div className="foo_vl"></div>
          <Link>Privacy Policy</Link>
        </div>
        <div className="footer_sec3">
          <p>© 2024 in-Store App. All Rights Reserved.</p>
          <p>
            App & Website Design by <span>KNOWN</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer