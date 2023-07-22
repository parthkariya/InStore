import React from 'react';
import "./HomeHero.css";
import images from '../../constants/images';

const HomeHero = ({ img }) => {
  return (
    <div
      className="homehero_main_wrapp"
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'revert-layer'
      }}
    >
      {/* <img src={images.hero_banner} alt="" /> */}
      <div className="homehero_text_main">
        <div className="homehero_text_base">
          <img src={images.hero_logo} alt="" />
          <p>
            A marketing platform for integrated <br />
            shopping solutions and better results
          </p>
          <div className="apps_logos_wrapp">
            <img src={images.play_store_logo} alt="play store logo" />
            <img src={images.app_store_logo} alt="app store logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero