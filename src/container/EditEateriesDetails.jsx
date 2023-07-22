import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ACCEPT_HEADER, mall_update_eatery } from "../utils/Constant";
import axios from "axios";
import { useMallContext } from "../context/mall_context";

const EditEateriesDetails = ({ getsingleStoreData, getstore_is, setTab }) => {
  console.log("abc", getstore_is);
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const { UpdateEateriesMall } = useMallContext();
  const [files, setFiles] = useState([]);
  const [time, setTime] = useState("");

  console.log("getsingleStoreData", getsingleStoreData);

  const [getstoreName, setStoreName] = useState(
    getsingleStoreData.name ? getsingleStoreData.name : ""
  );
  const [getstoreNo, setStoreNo] = useState(
    getsingleStoreData.store_no ? getsingleStoreData.store_no : ""
  );
  const [getcontactNo, setContactNo] = useState(
    getsingleStoreData.number ? getsingleStoreData.number : ""
  );
  const [getstoreLevel, setStoreLevel] = useState(
    getsingleStoreData.store_level ? getsingleStoreData.store_level : ""
  );
  const [getemail, setEmail] = useState(
    getsingleStoreData.email ? getsingleStoreData.email : ""
  );
  const [getstoreDes, setStoreDes] = useState(
    getsingleStoreData.description ? getsingleStoreData.description : ""
  );
  const [monFromTime, setMonFromTime] = useState(
    getsingleStoreData.mon_fri_from_time
      ? getsingleStoreData.mon_fri_from_time
      : ""
  );
  const [monToTime, setMonToTime] = useState(
    getsingleStoreData.mon_fri_to_time ? getsingleStoreData.mon_fri_to_time : ""
  );
  const [satFromTime, setSatFromTime] = useState(
    getsingleStoreData.sat_from_time ? getsingleStoreData.sat_from_time : ""
  );
  const [satToTime, setSatToTime] = useState(
    getsingleStoreData.sat_to_time ? getsingleStoreData.sat_to_time : ""
  );
  const [sunFromTime, setSunFromTime] = useState(
    getsingleStoreData.sun_from_time ? getsingleStoreData.sun_from_time : ""
  );
  const [sunToTime, setSunToTime] = useState(
    getsingleStoreData.sun_to_time ? getsingleStoreData.sun_to_time : ""
  );
  const [holidayFromTime, setHolidayFromTime] = useState(
    getsingleStoreData.holiday_from_time
      ? getsingleStoreData.holiday_from_time
      : ""
  );
  const [holidayToTime, setHolidayToTime] = useState(
    getsingleStoreData.holiday_to_time ? getsingleStoreData.holiday_to_time : ""
  );
  const [termsCond, setTermsCond] = useState(1);

  const onHandleEmailChange = (e) => {
    let email = e.target.value;
    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  // const onHandleNumberChange = (e) => {
  //   let number = e.target.value;
  //   if (number === "" || re.test(number)) {
  //     setContactNo(number);
  //   } else {
  //     return;
  //   }
  // };

  const editEateries = async () => {
    console.log("eatery id is", getstore_is);
    const formdata = await new FormData();
    await formdata.append("eatery_id", getstore_is);
    await formdata.append("name", getstoreName);
    await formdata.append("store_no", getstoreNo);
    await formdata.append("store_level", getstoreLevel);
    await formdata.append("number", getcontactNo);
    await formdata.append("email", getemail);
    await formdata.append("mon_fri_from_time", monFromTime);
    await formdata.append("mon_fri_to_time", monToTime);
    await formdata.append("sat_from_time", satFromTime);
    await formdata.append("sat_to_time", satToTime);
    await formdata.append("sun_from_time", sunFromTime);
    await formdata.append("sun_to_time", sunToTime);
    await formdata.append("holiday_from_time", holidayFromTime);
    await formdata.append("holiday_to_time", holidayToTime);
    await formdata.append("description", getstoreDes);
    if (files[0] !== undefined) {
      await formdata.append("store_logo", files[0]);
    } else {
    }

    console.log("==>", formdata);

    const data = await UpdateEateriesMall(formdata);
    if (data) {
      if (data.success === 1) {
        console.log("mall-data", data);
        setTab(4);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
      if (acceptedFiles.length === 0) {
        window.location.reload(true);
      }
    },
  });

  const thumbs = files.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%", maxHeight: "175px" }}
      className="img-fluid"
      alt="file"
    />
  ));

  console.log("test", getstoreName);

  return (
    <div className="mm_main_wrapp">
      {/* mall management name start */}
      <div className="mall_name_wrapp">
        <p className="mall_name_heading">V&A Waterfront Mall:</p>
        <span>Edit Eatery </span>
      </div>
      <div className="mm_horizontal_line"></div>
      {/* mall management name end */}

      {/* mall management form start */}
      <div className="mm_form_wrapp">
        {/* text-input wrapp start */}
        <div className="mm_form_input_wrapp">
          {/* single text-input */}
          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "140px" }}>Store Name</label>
            <input
              type="text"
              value={getstoreName}
              onChange={(e) => setStoreName(e.target.value)}
              name=""
              id=""
              className="input_box"
            />
          </div>
          {/* single text-input */}
          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "140px" }}>Store Number</label>
            <input
              type="number"
              value={getstoreNo}
              onChange={(e) => setStoreNo(e.target.value)}
              name=""
              id=""
              className="input_box"
            />
          </div>
          {/* single text-input */}
          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "140px" }}>Store Level</label>
            <input
              type="text"
              value={getstoreLevel}
              onChange={(e) => setStoreLevel(e.target.value)}
              name=""
              id=""
              className="input_box"
            />
          </div>
          {/* single text-input */}
          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "140px" }}>Contact Number</label>
            <input
              type="number"
              value={getcontactNo}
              onChange={(e) => setContactNo(e.target.value)}
              name=""
              id=""
              className="input_box"
            />
          </div>
          {/* single text-input */}
          <div className="mm_form_single_input">
            <label htmlFor="" style={{ minWidth: "140px" }}>Email Address</label>
            <input
              type="email"
              onChange={(e) => onHandleEmailChange(e)}
              value={getemail}
              name=""
              id=""
              className="input_box"
            />
          </div>

          {/* tranding sec start */}
          <div className="mm_tranding_wrapp">
            <label
              style={{ fontSize: "16px", fontWeight: "400", minWidth: "140px" }}
              htmlFor=""
            >
              Trading Hours
            </label>
            <div className="tranding_times_wrapp">
              {/* single time */}
              <div className="tranding_times_wrapp_sec">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    minWidth: "140px",
                  }}
                  htmlFor=""
                >
                  Monday - Friday
                </label>
                <div className="tranding_sigle_time_wrapp">
                  {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
                  <input
                    type="time"
                    name=""
                    value={monFromTime}
                    onChange={(e) => setMonFromTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    AM
                  </p>
                </div>
                <div className="tranding_sigle_time_wrapp">
                  {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
                  <input
                    type="time"
                    name=""
                    value={monToTime}
                    onChange={(e) => setMonToTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    PM
                  </p>
                </div>
              </div>
              {/* single time */}
              <div className="tranding_times_wrapp_sec">
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    minWidth: "140px",
                  }}
                  htmlFor=""
                >
                  Saturday
                </label>
                <div className="tranding_sigle_time_wrapp">
                  {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
                  <input
                    type="time"
                    name=""
                    value={satFromTime}
                    onChange={(e) => setSatFromTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    AM
                  </p>
                </div>
                <div className="tranding_sigle_time_wrapp">
                  <input
                    type="time"
                    name=""
                    value={satToTime}
                    onChange={(e) => setSatToTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    PM
                  </p>
                </div>
              </div>
              {/* single time */}
              <div className="tranding_times_wrapp_sec">
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    minWidth: "140px",
                  }}
                  htmlFor=""
                >
                  Sunday
                </label>
                <div className="tranding_sigle_time_wrapp">
                  <input
                    type="time"
                    name=""
                    value={sunFromTime}
                    onChange={(e) => setSunFromTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    AM
                  </p>
                </div>
                <div className="tranding_sigle_time_wrapp">
                  <input
                    type="time"
                    name=""
                    value={sunToTime}
                    onChange={(e) => setSunToTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    PM
                  </p>
                </div>
              </div>
              {/* single time */}
              <div className="tranding_times_wrapp_sec">
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    minWidth: "140px",
                  }}
                  htmlFor=""
                >
                  Public Holidays
                </label>
                <div className="tranding_sigle_time_wrapp">
                  <input
                    type="time"
                    name=""
                    value={holidayFromTime}
                    onChange={(e) => setHolidayFromTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    AM
                  </p>
                </div>
                <div className="tranding_sigle_time_wrapp">
                  <input
                    type="time"
                    name=""
                    value={holidayToTime}
                    onChange={(e) => setHolidayToTime(e.target.value)}
                    id=""
                    className="input_box"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* tranding sec end */}

          {/* text-area sec start */}
          <div
            className="mm_form_single_input"
            style={{ alignItems: "flex-start" }}
          >
            <label htmlFor="" style={{ minWidth: "140px" }}>Store Description</label>
            <textarea
              type="text"
              value={getstoreDes}
              onChange={(e) => setStoreDes(e.target.value)}
              name=""
              id=""
              className="input_box"
              rows={8}
            />
          </div>
          {/* text-area sec end */}
        </div>
        {/* text-input wrapp end */}

        {/* upload images wrapp start */}
        <div className="mm_img_upload_wrapp">
          {/* single upload image */}
          <div className="myprofile_inner_sec2">
            <h4 style={{ marginBottom: "10px" }}>Upload the eatery logo <br />
              (200 x 150 pixels)</h4>
            {files && files.length > 0 ? (
              <div className="myprofile_inner_sec2_img_upload">{thumbs}</div>
            ) : (
              <div
                style={{ width: "100%" }}
                {...getRootProps({ className: "dropzone" })}
              >
                <div className="myprofile_inner_sec2_img_upload">
                  <AiOutlineCloudUpload
                    style={{
                      width: "60px",
                      height: "60px",
                      color: "var(--color-orange)",
                      marginBottom: "10px",
                    }}
                  />
                  <h4>.PDF .JPG .PNG</h4>
                  <p>You can also upload file by</p>
                  <input
                    {...getInputProps()}
                    accept="image/jpeg, image/jpg, image/png, image/eps"
                  />
                  <button type="button" className="click_upload_btn">
                    clicking here
                  </button>
                  {/* <a href="">clicking here</a> */}
                </div>
                <div className="btnn-main">
                  <button
                    className="btn btn-orange"
                    type="button"
                    onClick={() => {
                      // setFiles([]);
                    }}
                  >
                    Upload File
                  </button>
                </div>
              </div>
            )}
            {/* <div className="myprofile_upload_img_btn_wrapp"> */}
            <button className="btn btn-blue" onClick={() => setFiles([])}>
              Cancel
            </button>
            {/* </div> */}
          </div>
        </div>
        {/* upload images wrapp end */}
      </div>
      <button
        style={{ marginTop: "20px", width: "25%" }}
        className="btn btn-orange"
        onClick={() => {
          // addEateries();
          editEateries();
          console.log("smnbsmdb");
        }}
      >
        Submit
      </button>
      {/* mall management form end */}
    </div>
  );
};

export default EditEateriesDetails;