import React from 'react'
import "./RegisterMall.css"
import images from '../../constants/images';

const RegisterMall = () => {
  return (
    <div className="main_wrapp registermall_main_wrapp">
      <div className="container registermall_base_wrapp">
        <div className="registermall_sec1">
          <h2 className="h2">
            Register Your Mall,
            <br /> Your First Year Is Free!
          </h2>
          <p>
            Malls who register stores within their first year receives{" "}
            <span>FREE MARKETING</span> and store/brand owners will be able to
            purchase anual analytic data after the first year.
          </p>
          {/* <button>Sign up to In-store</button> */}
          <div className="apps_logos_wrapp">
            <img src={images.play_store_logo} alt="play store logo" />
            <img src={images.app_store_logo} alt="app store logo" />
          </div>
        </div>
        <div className="registermall_sec2">
          <img src={images.registermall} alt="" />
          <img
            src={images.registermall_vector}
            alt=""
            className="registermall_sec2_vector"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterMall