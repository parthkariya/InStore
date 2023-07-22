import React from "react";
import "./StoreDCard.css";
import images from "../../constants/images";

const StoreDCard = ({ img, setIsOpen, itm, setSingleStoreData }) => {
  return (
    <button
      onClick={() => {
        setSingleStoreData(itm);
        setIsOpen(true);
      }}
      className="stored_card_wrapp"
    >
      <div className="stored_card_edit_wrapp">
        <button className="stored_card_edit_btn">
          <img src={images.card_edit} alt="" />
        </button>
        <button className="stored_card_edit_btn">
          <img src={images.card_cancle} alt="" />
        </button>
      </div>
      <img src={img} alt="" className="stored_card_img" />
    </button>
  );
};

export default StoreDCard;