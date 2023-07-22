import React, { useEffect, useState } from "react";
import "./ProfileAccountSetting.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { async } from "@firebase/util";
import { useCustomerContext } from "../../context/customer_context";
import { useAuthContext } from "../../context/auth_context";

const ProfileAccountSetting = () => {
  const { setCustomerUpdate, get_customer_loading, get_customer_data } =
    useCustomerContext();

  const { region_data } = useAuthContext();
  const [files, setFiles] = useState([]);
  const [fristname, SetFristName] = useState(
    get_customer_data.first_name ? get_customer_data.first_name : ""
  );
  const [lastname, SetLastName] = useState(
    get_customer_data.last_name ? get_customer_data.last_name : ""
  );
  const [regionid, SetRegionId] = useState(
    get_customer_data.region_id ? get_customer_data.region_id : ""
  );
  const [email, SetEmail] = useState(
    get_customer_data.email ? get_customer_data.email : ""
  );
  const [number, SetNumber] = useState(
    get_customer_data.number ? get_customer_data.number : ""
  );
  const [password, SetPassword] = useState(
    get_customer_data.showpassword ? get_customer_data.showpassword : ""
  );
  const [password1, SetPassword1] = useState(
    get_customer_data.showpassword ? get_customer_data.showpassword : ""
  );
  const [tram, SetTram] = useState(
    get_customer_data.terms_condition ? get_customer_data.terms_condition : ""
  );
  const [image, SetImage] = useState("");

  // logo dropzon

  const handleImage = (e) => {
    const file = e.target.files[0];

    SetImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        // console.log("acceptedFiles", acceptedFiles[0].File);
      }
      if (acceptedFiles.length === 0) {
        window.location.reload(true);
      }
    },
  });

  const thumbs = files.map((file) => (
    <>
      <img
        src={file.preview}
        style={{ width: "100%", height: "100%", maxHeight: "175px" }}
        className="img-fluid"
        alt="file"
      />
    </>
  ));

  const UpdateProfile = async () => {
    const formdata = await new FormData();

    await formdata.append("first_name", fristname);
    await formdata.append("last_name", lastname);
    await formdata.append("region_id", Number(regionid));
    await formdata.append("email", email);
    await formdata.append("password", password);

    await formdata.append("terms_condition", tram === "on" ? 1 : 0);
    if (files.length > 0) {
      await formdata.append("cus_profile", files[0]);
    } else {
      null;
    }
    console.log("formdata", formdata);

    const data = await setCustomerUpdate(formdata);
    if (data) {
      if (data.success === 1) {
        console.log("mall-data", data);
      } else {
        console.log("velidation");
      }
    }
  };

  return (
    <div className="mm_main_wrapp">
      {get_customer_loading === true ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loader"></div>
        </div>
      ) : null}
      {/* mall management name start */}
      <div className="mall_name_wrapp">
        <h4
          className="h3 cust-profile-heading"
          style={{ fontWeight: "800", marginBottom: "20px" }}
        >
          Account Settings
        </h4>
        {/* <span>Account Settings</span> */}
      </div>
      {/* <div className="mm_horizontal_line"></div> */}
      {/* mall management name end */}

      <div className="cus-profile-acc-setting-form-flex">
        {/* mall management form start */}
        <div className="mm_form_wrapp-customer-acc-setting">
          {/* text-input wrapp start */}
          <div className="mm_form_input_wrapp-customer-acc-setting">
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "135px" }}>
                First name
              </label>
              <input
                type="text"
                value={fristname}
                placeholder="Enter Your Frist Name"
                onChange={(e) => SetFristName(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "135px" }}>
                Last name
              </label>
              <input
                type="text"
                value={lastname}
                placeholder="Enter Your Last Name"
                onChange={(e) => SetLastName(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label
                className="leaderboard-card-lbl"
                style={{ minWidth: "135px" }}
              >
                Region
              </label>
              <select
                className="leaderboard-card-inp"
                onChange={(e) => SetRegionId(e.target.value)}
              >
                <option selected disabled value="">
                  Select region
                </option>
                {region_data &&
                  region_data.map((item, index) => {
                    return (
                      <>
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>

            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "135px" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                placeholder="Enter Your Email address"
                onChange={(e) => SetEmail(e.target.value)}
                name=""
                id=""
                style={{ minWidth: "135px" }}
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "135px" }}>
                Contact number
              </label>
              <input
                type="number"
                placeholder="Enter Mobile Number"
                value={number}
                onChange={(e) => SetNumber(e.target.value)}
                name=""
                id=""
                className="input_box"
                style={{ minWidth: "135px" }}
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "135px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter Your Password"
                onChange={(e) => SetPassword(e.target.value)}
                name=""
                id=""
                className="input_box"
                style={{ minWidth: "135px" }}
              />
            </div>

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "135px" }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter Your Password"
                onChange={(e) => SetPassword(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
          </div>
          {/* text-input wrapp end */}

          {/* upload images wrapp start */}
          <div className="profile-setting_img_upload_wrapp">
            {/* single upload image */}
            <div className="myprofile_inner_sec2">
              <h4 style={{ marginBottom: "10px" }}>Upload profile pricture
                (200 x 200 pixels)</h4>
              {/* {get_customer_data && get_customer_data.cus_profile_path ? (
                <div className="myprofile_inner_sec2_img_upload">
                  <img
                    src={get_customer_data.cus_profile_path}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "175px",
                    }}
                    className="img-fluid"
                    alt="file"
                  />
                </div>
              ) : */}
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
                    {/* <input type="file" name="file" onChange={handleImage} /> */}
                    <input
                      {...getInputProps()}
                      accept="image/jpeg, image/jpg, image/png, image/eps"
                      type="file"
                      name="photos"
                    // onChange={handleImage}
                    />
                    <button type="button" className="click_upload_btn">
                      clicking here
                    </button>
                    {/* <a href="">clicking here</a> */}
                  </div>
                  <div className="">
                    <button
                      className="btn btn-orange mb_8"
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

        {/* customer profile account form last part start */}
        <div className="cust-profile-acc-setting-last-part-flex">
          {/* mm terms condition wrapp */}
          <div className="mm_form_single_input">
            <label htmlFor=""></label>
            <div className="signup_terms_wrapp">
              <input
                type="checkbox"
                value={tram}
                onChange={(e) => SetTram(e.target.value)}
              />
              <p className="fs-des">
                I have read and agree to the{" "}
                <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                <a className="signup_terms_link">Privacy Policy</a>
              </p>
            </div>
          </div>

          {/* upload button */}
          <div className="mm_form_single_input">
            <label htmlFor=""></label>
            <div className="mall_upload_btn_wrapp mall_upload_btn_wrapp-customer-acc-setting">
              <button
                className="btn btn-orange"
                onClick={() => UpdateProfile()}
              >
                Update
              </button>
              <button className="btn btn-blue">Cancel</button>
            </div>
          </div>
        </div>

        {/* customer profile account form last part end */}
      </div>
      {/* mall management form end */}
    </div>
  );
};

export default ProfileAccountSetting;