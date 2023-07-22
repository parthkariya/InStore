import React from "react";
import "./MallEventCard.css";
import moment from "moment";
import images from "../../constants/images";
import { useMallContext } from "../../context/mall_context";

const MallEventCard = ({
  id,
  img,
  name,
  location,
  start_date,
  end_date,
  description,
  edit_btns,
  setTab,
  EventApi,
}) => {

  const { get_mall_auth_data, get_mall_store_data, DeleteEventApi } = useMallContext();
  // Delete Mall Event Api Call

  const DeleteMallEventData = async () => {
    {
      const formdata = await new FormData();
      await formdata.append("event_id", id)


      console.log("-=-=-=->", formdata);
      const data = await DeleteEventApi(formdata);
      if (data) {
        if (data.success === 1) {
          console.log("mall-data", data);
          setTab(5);
          EventApi();
        }
      }
    }
  };

  return (
    <ul className="event_main_wrapp">
      {/* edit buttons start*/}
      {edit_btns && (
        <div className="stored_card_edit_wrapp">
          <button className="stored_card_edit_btn">
            <img src={images.card_edit} alt="" />
          </button>
          <button className="stored_card_edit_btn" onClick={() => DeleteMallEventData()}>
            <img src={images.card_cancle} alt="" />
          </button>
        </div>
      )}
      {/* edit buttons end */}
      <div className="event_single_wrapp">
        <img src={img} alt="" />
        <div className="event_single_inner_text_wrapp">
          <h4 style={{ textTransform: 'capitalize' }}>{name}</h4>
          <h6>
            {moment(start_date).format("DD MMM YY")} &nbsp;&nbsp;
            {end_date === "" ? "" : moment(end_date).format("DD MMM YY")}
          </h6>
          <p>{description}</p>
          <div className="event_location_wrapp">
            <h5 className="event_single_span">Location:</h5>
            <p className="event_location_name">{location}</p>
          </div>
        </div>
      </div>
    </ul >
  );
};

export default MallEventCard;
