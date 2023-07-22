import React from 'react'
import "./WelcomeCard.css";
import { BsArrowRight } from 'react-icons/bs';

const WelcomeCard = ({ img1, h3, h4, color, wc_btn }) => {
  return (
    <div className="wc_card_main_wrapp" style={{ background: color, margin: "0px" }}>
      <img src={img1} alt="" className="wc_bottom_img" />
      {/* <div className="wc_top_dot"></div> */}
      <div className="wc_text_wrapp">
        <h3 className="h3" style={{ fontWeight: "800", paddingTop: "2rem" }}>
          {h3}
        </h3>
        {/* <h4 className="h4">{h4}</h4> */}
        <h4
          className="h4"
          dangerouslySetInnerHTML={{
            __html: h4,
          }}
        ></h4>
        {wc_btn &&
          <button className="wc_btn_wrapp">
            <p>{wc_btn}</p>
            <BsArrowRight size={26} color="#fff" />
          </button>}
      </div>
    </div>
  );
};

export default WelcomeCard