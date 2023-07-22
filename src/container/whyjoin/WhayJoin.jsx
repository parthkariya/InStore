import React from "react";
import "./WhayJoin.css";
import images from "../../constants/images";

const WhayJoin = () => {


  return (
    <div className="main_wrapp">
      <div className="container whayjoin_wrapp">
        <h2 className="h2" style={{ marginBottom: "15px" }}>Why Join In-Store?</h2>
        <p>Here are some benefits of using our online marketing platform.</p>
        <div className="whyjoin_grid">
          <div className="whyjoin_grid_item">
            <img src={images.home_eye} alt="" />
            <p>
              Shopping centre/Mall, promotions and activities are displayed
              first in the user experience.
            </p>
          </div>
          <div className="whyjoin_grid_item">
            <img src={images.home_location} alt="" />
            <p>Users can view the shopping centre/Mall from anywhere</p>
          </div>
          <div className="whyjoin_grid_item">
            <img src={images.home_shapes} alt="" />
            <p>
              Multiple marketing initiatives, promo events, competitions can be
              featured simultaneously on the platform.
            </p>
          </div>
          <div className="whyjoin_grid_item">
            <img src={images.home_archive} alt="" />
            <p>
              Shopping centre/Mall can engage with users via notifications for
              specials, sales, or events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhayJoin;
