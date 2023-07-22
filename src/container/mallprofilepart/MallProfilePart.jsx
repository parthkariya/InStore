import React from "react";
import "./MallProfilePart.css";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import { MallHeroEdit } from "../../components";

const MallProfilePart = ({ setTab, get_mall_auth_data, sidebaropen }) => {
  return (
    <>
      <MallHeroEdit get_mall_auth_data={get_mall_auth_data} sidebaropen={sidebaropen} />
      <div className="mallpp_main_wrapp">
        <div className="mallpp_part1">
          <p className="mall_part_1_heading">
            Welcome{" "}
            {get_mall_auth_data &&
              get_mall_auth_data.name &&
              get_mall_auth_data.name}
            !
          </p>
          <h5 className="h5 mb_10">
            Let’s start by setting up your account profile:
          </h5>

          <ul>
            <li className="mallpp_sigle_list">
              Populate your profile to introduce your shopping center/mall on
              In-store under{" "}
              <button onClick={() => setTab(2)} style={{ fontWeight: "600" }}>Account Settings</button>
            </li>
            <li className="mallpp_sigle_list">
              Advertise your collection of retailers in your mall under{" "}
              <button onClick={() => setTab(3)} style={{ fontWeight: "600" }}> Mall Retailers</button>
            </li>
            <li className="mallpp_sigle_list">
              Upload the
              <button onClick={() => setTab(4)} style={{ fontWeight: "600" }}>&nbsp;Eateries</button> in your Mall
            </li>
            <li className="mallpp_sigle_list">
              Update and promote
              <button onClick={() => setTab(5)} style={{ fontWeight: "600" }}>&nbsp;Events</button> in your Mall
            </li>
            <li className="mallpp_sigle_list">
              List your Mall's
              <button onClick={() => setTab(6)} style={{ fontWeight: "600" }}>&nbsp;Facilities</button>
            </li>
          </ul>
        </div>

        {/* profile cards wrapp start */}
        <div className="mallpp_part2 mallpp_part2-mall-side-max-width" >
          {/* single cards start */}
          <div
            className="mallpp_part2_card"
            style={{
              backgroundImage: `url(${images.home_card_bg_1})`,
              backgroundPosition: "center",
            }}
          >
            <h5 className="mallpp_part2_card_heading">100% Native</h5>
            <p className="mallpp_part2_card_description">
              In-Store’s unique marketing adds respembles the experience of
              stores in a mall
            </p>
          </div>
          <div
            className="mallpp_part2_card"
            style={{
              backgroundImage: `url(${images.home_card_bg_2})`,
              backgroundPosition: "center",
            }}
          >
            <h5 className="mallpp_part2_card_heading">Fulfillment</h5>
            <p className="mallpp_part2_card_description">
              One buying journey, multiple fulfillment options with preference
              for in-store.
            </p>
          </div>
          <div
            className="mallpp_part2_card"
            style={{
              backgroundImage: `url(${images.home_card_bg_3})`,
              backgroundPosition: "center",
            }}
          >
            <h5 className="mallpp_part2_card_heading">Unified</h5>
            <p className="mallpp_part2_card_description">
              Unified channel for retail brands to bring together consumers,
              marketing & products
            </p>
          </div>
          <div
            className="mallpp_part2_card"
            style={{
              backgroundImage: `url(${images.home_card_bg_2})`,
              backgroundPosition: "center",
            }}
          >
            <h5 className="mallpp_part2_card_heading">Personalised</h5>
            <p className="mallpp_part2_card_description">
              The In-Store platform takes personalised content advertising to a
              whole new level
            </p>
          </div>
          <div
            className="mallpp_part2_card"
            style={{
              backgroundImage: `url(${images.home_card_bg_3})`,
              backgroundPosition: "center",
            }}
          >
            <h5 className="mallpp_part2_card_heading">
              Intergrated Publishing
            </h5>
            <p className="mallpp_part2_card_description">
              Digital brand marketing/ advertising
            </p>
          </div>
          <div
            className="mallpp_part2_card"
            style={{
              backgroundImage: `url(${images.home_card_bg_1})`,
              backgroundPosition: "center",
            }}
          >
            <h5 className="mallpp_part2_card_heading">Simplified</h5>
            <p className="mallpp_part2_card_description">
              The In-Store platform offers small business and enterprise
              solutions
            </p>
          </div>
          {/* single cards end */}
        </div>
        {/* profile cards wrapp end */}
      </div>
    </>
  );
};

export default MallProfilePart;
