import React, { useEffect, useState } from "react";
import "./BrandAccountSetting.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useMallContext } from "../../context/mall_context";
import { useStoreContext } from "../../context/store_context";
import images from "../../constants/images";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { ACCEPT_HEADER, get_mall, get_retailer } from "../../utils/Constant";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const animatedComponents = makeAnimated();

const BrandAccountSetting = ({ get_mall_auth_data, sidebaropen }) => {
  const [getmallmasterid, setmallmasterid] = useState("");

  const [getbrandData, setBrandData] = useState(
    get_mall_auth_data && get_mall_auth_data
  );
  const { UpdateMall, get_brand_data, get_mall_data, getBrand } =
    useMallContext();
  const {
    retailer_data,
    UpdateStore,
    multiple_week_data,
    getRetailerApi,
    getMultipleMall,
  } = useStoreContext();

  useEffect(() => {
    getMultipleMall();
  }, []);
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);

  const [mallsOption, setMallsOption] = useState([]);

  const [mallWebsite, setMallWebsite] = useState(
    getbrandData.website ? getbrandData.website : ""
  );
  const [getbrand, SetBrand] = useState(
    getbrandData.brand_email ? getbrandData.brand_email : ""
  );
  const [mallInsta, setMallInsta] = useState(
    getbrandData.insta ? getbrandData.insta : ""
  );

  const [retailertype, setRetailertype] = useState(
    getbrandData.retailer_id && getbrandData.retailer_id
  );

  const [mallfb, setMallfb] = useState(getbrandData.fb ? getbrandData.fb : "");

  const [mallTwitter, setMallTwitter] = useState(
    getbrandData.tweet ? getbrandData.tweet : ""
  );

  const [contactPerson, setContactPerson] = useState(
    getbrandData.number && getbrandData.number
  );

  const [contactNumber, setContactNumber] = useState(
    getbrandData.email && getbrandData.email
  );

  const [secondryemail, SetSecondryEmail] = useState(
    getbrandData.secondary_email ? getbrandData.secondary_email : ""
  );

  const [scondrycontect, SetScondryContect] = useState(
    getbrandData.secondary_contact && getbrandData.secondary_contact
  );

  const [getmode, setMode] = useState(1);

  const [getmallname, setMallname] = useState(
    getbrandData.brand_id && getbrandData.brand_id
  );

  const [isAcceptTerm, setIsAcceptTerm] = useState(false);

  const [brandadd, SetBrandAdd] = useState(
    getbrandData.address ? getbrandData.address : ""
  );

  const [brandadd2, SetBrandAdd2] = useState(
    getbrandData.address_2 ? getbrandData.address_2 : ""
  );

  const [brandadd3, SetBrandAdd3] = useState(
    getbrandData.address_3 ? getbrandData.address_3 : ""
  );
  const [malldrop, SetMallDrop] = useState(
    getbrandData.mall_id ? getbrandData.mall_id : ""
  );

  const [mainName, setMainName] = useState(
    get_mall_auth_data &&
      get_mall_auth_data.retailers &&
      get_mall_auth_data.retailers.name !== null
      ? get_mall_auth_data.retailers.name
      : ""
  );

  const [getcondation, SetCondation] = useState(false);
  const [getcondation1, SetCondation1] = useState(false);
  const [getmallarray, SetMallArray] = useState([]);

  useEffect(() => {
    console.log("files", files);
    console.log("check getbrandData", getbrandData);
  }, [files]);

  const onHandleEmailChange = (e) => {
    let email = e.target.value;
    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  const onHandleMallEmailChange = (e) => {
    let mallEmail = e.target.value;
    if (mallEmail === "" || regEx.test(mallEmail)) {
      setMallEmail(mallEmail);
    } else {
      return;
    }
  };

  const handleTermChange = (event) => {
    setIsAcceptTerm((current) => !current);
  };

  // logo dropzon

  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        console.log("file type", files[0]);
        console.log("acceptedFiles", acceptedFiles[0].File);
        SetCondation(true);
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

  // map dropzon

  const { getRootProps: getRootMapProps, getInputProps: getInputMapProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        console.log("acceptedFiles", acceptedFiles);
        SetCondation1(true);
        {
          setFiles2(
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

  // banner dropzon

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      {
        setFiles3(
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

  const thumbs2 = files2.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%", maxHeight: "175px" }}
      className="img-fluid"
      alt="file"
    />
  ));

  const thumbs3 = files3.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%", maxHeight: "175px" }}
      className="img-fluid"
      alt="file"
    />
  ));

  // update mall api

  const UpdateMallData = async () => {
    {
      const data = await new FormData();
      await data.append("retailer_id", Number(retailertype));
      await data.append("store_type", getmode);
      await data.append("brand", getmallname);
      await data.append("address", brandadd);
      await data.append("address_2", brandadd2);
      await data.append("address_3", brandadd3);
      await data.append("mall_id", malldrop);
      await data.append("website", mallWebsite);
      await data.append("brand_email", getbrand);
      await data.append("insta", mallInsta);
      await data.append("fb", mallfb);
      await data.append("tweet", mallTwitter);
      await data.append("number", contactPerson);
      await data.append("email", contactNumber);
      await data.append("secondary_contact", scondrycontect);
      await data.append("secondary_email", secondryemail);
      for (var i = 0; i < mallsOption.length; i++) {
        await data.append("mall_id[" + i + "]", mallsOption[i].value);
      }
      await data.append("terms_condition", isAcceptTerm === true ? 1 : 0);
      if (files[0] !== undefined) {
        await data.append("store_logo", files[0]);
      } else {
      }
      if (files2[0] !== undefined) {
        await data.append("banner_store", files2[0]);
      } else {
      }
      if (files3[0] !== undefined) {
        await data.append("store_brand", files3[0]);
      } else {
      }
      console.log("-=-=-=->brand-update", data);
      const data1 = await UpdateStore(data);
      if (data1) {
        if (data1.success === 1) {
          console.log("mall-data", data1);
        }
      }
    }
  };

  useEffect(() => {
    console.log("get mall store data", multiple_week_data);
  });

  // get mall master

  useEffect(() => {
    getMallMaster();
  }, []);

  const [getmall, SetMall] = useState("");

  const getMallMaster = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetMallArray(res.data.data);
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  return (
    <>
      <div>
        <div className="brand-hero-edit-main-wrapp" {...getRootMapProps()}>
          <input
            {...getInputMapProps()}
            accept="image/jpeg, image/jpg, image/png, image/eps"
          />

          {getcondation1 === true ? (
            <>
              {files2 && files2.length > 0 ? (
                thumbs2
              ) : (
                <button type="button">
                  <img
                    src={images.card_edit}
                    className="brand-hero-edit-icon"
                  />
                </button>
              )}
            </>
          ) : (
            <img
              src={get_mall_auth_data.store_banner_path}
              style={{ width: "100%", height: "100%" }}
              className="img-fluid"
            />
          )}
        </div>

        {/* logo wrapp */}
        <div
          className="band-inn-logo-wrapp"
          style={{ left: sidebaropen === false ? "5%" : "" }}
          {...getRootlogoProps()}
        >
          {/* <div style={{ width: '100%' }} {...getRootlogoProps()}> */}
          <input
            {...getInputlogoProps()}
            accept="image/jpeg, image/jpg, image/png, image/eps"
          />
          {getcondation === true ? (
            <>
              {files && files.length > 0 ? (
                thumbs
              ) : (
                <button type="button">
                  <img
                    src={images.card_edit}
                    className="brand-hero-logo-edit-icon"
                  />
                </button>
              )}
            </>
          ) : (
            <img
              src={get_mall_auth_data.store_logo_path}
              style={{ width: "100%", height: "100%", maxHeight: "175px" }}
              className="img-fluid"
            />
          )}
          {/* </div> */}
        </div>
      </div>
      <div className="mm_main_wrapp">
        {/* mall management name start */}
        <div className="mall_name_wrapp">
          <p className="mall_name_heading">{mainName}:</p>
          <span>Account Settings</span>
        </div>
        <div className="mm_horizontal_line"></div>
        {/* mall management name end */}

        {/* mall management form start */}
        <div className="mm_form_wrapp">
          {/* text-input wrapp start */}
          <div className="mm_form_input_wrapp">
            <div className="mm_form_single_input">
              <label htmlFor="mall">Mall Name</label>
              <select
                className="leaderboard-card-inp"
                onChange={(e) => {
                  setmallmasterid(e.target.value);
                  getRetailerApi(e.target.value);

                  console.log(e.target.value);
                }}
              >
                {getmallarray &&
                  getmallarray.map((item, index) => {
                    return (
                      <>
                        {/* <option selected disabled value=""></option> */}
                        <option value={item.id} key={index}>
                          {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                          {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Retailer</label>
              <select
                className="leaderboard-card-inp"
                onChange={(e) => {
                  setRetailertype(e.target.value);

                  getBrand(e.target.value);
                  console.log(e.target.value);
                  console.log("==>", retailertype);
                }}
              >
                <option defaultValue value=""></option>
                {retailer_data &&
                  retailer_data.map((item, index) => {
                    return (
                      <>
                        {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Retailer type</label>
              <div className="radio-btn-flex-brand">
                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="Online"
                    name="gender"
                    onChange={(e) => setMode(1)}
                    value={getmode}
                  />
                  <label className="course-form-txt" for="male">
                    Independent Retailer
                  </label>
                </div>

                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="In-Person"
                    name="gender"
                    value={getmode}
                    onChange={(e) => setMode(2)}
                  />
                  <label className="course-form-txt" for="specifyColor">
                    Group Retailer
                  </label>
                </div>
              </div>
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">
                Your Brands <br /> <span>If applicable</span>
              </label>
              <select
                className="leaderboard-card-inp"
                onChange={(e) => {
                  console.log("rrr", e.target.value);
                  setMallname(e.target.value);
                }}
              >
                <option value="">Select</option>
                {get_brand_data &&
                  get_brand_data.map((item, index) => {
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
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Brand Address</label>
              <input
                type="text"
                value={brandadd}
                onChange={(e) => SetBrandAdd(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor=""></label>
              <input
                type="text"
                value={brandadd2}
                onChange={(e) => SetBrandAdd2(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor=""></label>
              <input
                type="text"
                value={brandadd3}
                onChange={(e) => SetBrandAdd3(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Select My Malls</label>
              {/* <select
                className="leaderboard-card-inp"
                onChange={(e) => {
                  SetMallDrop(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {get_mall_data &&
                  get_mall_data.map((item, index) => {
                    return (
                      <>
                        <option selected disabled value="">
                      Auto-fill from database
                    </option>
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </select> */}

              <Select
                value={mallsOption}
                styles={{ width: "100%", padding: "0px" }}
                className="leaderboard-card-inp"
                closeMenuOnSelect={false}
                components={animatedComponents}
                // defaultValue={[colourOptions[4], colourOptions[5]]}

                isMulti
                options={multiple_week_data}
                onChange={setMallsOption}
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Website URL</label>
              <input
                type="text"
                value={mallWebsite}
                onChange={(e) => setMallWebsite(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Brand Email</label>
              <input
                type="text"
                value={getbrand}
                onChange={(e) => SetBrand(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>

            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Instagram</label>
              <input
                type="text"
                value={mallInsta}
                onChange={(e) => setMallInsta(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Facebook</label>
              <input
                type="text"
                value={mallfb}
                onChange={(e) => setMallfb(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Twitter</label>
              <input
                type="text"
                value={mallTwitter}
                onChange={(e) => setMallTwitter(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Main Contact</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Main Email</label>
              <input
                type="email"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Secondary Contact</label>
              <input
                type="number"
                value={scondrycontect}
                onChange={(e) => SetScondryContect(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="">Secondary Email</label>
              <input
                type="email"
                value={secondryemail}
                onChange={(e) => SetSecondryEmail(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* mm terms condition wrapp */}
            <div className="mm_form_single_input">
              <label htmlFor=""></label>
              <div className="signup_terms_wrapp">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
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
              <div className="mall_upload_btn_wrapp">
                <button
                  className="btn btn-orange"
                  onClick={() => UpdateMallData()}
                >
                  Update
                </button>
                <button className="btn">Reset</button>
              </div>
            </div>
          </div>
          {/* text-input wrapp end */}

          {/* upload images wrapp start */}
          <div className="mm_img_upload_wrapp">
            {/* single upload image */}
            <div className="myprofile_inner_sec2">
              <h4 style={{ marginBottom: "10px" }}>
                Upload the Brand logo (200 x 150 pixels)
              </h4>
              {files && files.length > 0 ? (
                <div className="myprofile_inner_sec2_img_upload">{thumbs}</div>
              ) : (
                <div style={{ width: "100%" }} {...getRootlogoProps()}>
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
                      {...getInputlogoProps()}
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
                      style={{ marginBottom: "10px" }}
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
            {/* single upload image */}
            <div className="myprofile_inner_sec2">
              <h4 style={{ marginBottom: "10px" }}>
                Upload the Brand Banner (max 400kb)
              </h4>
              {files2 && files2.length > 0 ? (
                <div className="myprofile_inner_sec2_img_upload">{thumbs2}</div>
              ) : (
                <div style={{ width: "100%" }} {...getRootMapProps()}>
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
                      {...getInputMapProps()}
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
                      style={{ marginBottom: "10px" }}
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              )}
              {/* <div className="myprofile_upload_img_btn_wrapp"> */}
              <button className="btn btn-blue" onClick={() => setFiles2([])}>
                Cancel
              </button>
              {/* </div> */}
            </div>
            {/* single upload image */}
            <div className="myprofile_inner_sec2">
              <h4 style={{ marginBottom: "10px" }}>
                Upload the Brand in Mall (max 400kb)
              </h4>
              {files3 && files3.length > 0 ? (
                <div className="myprofile_inner_sec2_img_upload">{thumbs3}</div>
              ) : (
                <div style={{ width: "100%" }} {...getRootBannerProps()}>
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
                      {...getInputBannerProps()}
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
                      style={{ marginBottom: "10px" }}
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              )}
              {/* <div className="myprofile_upload_img_btn_wrapp"> */}
              <button className="btn btn-blue" onClick={() => setFiles2([])}>
                Cancel
              </button>
              {/* </div> */}
            </div>
          </div>
          {/* upload images wrapp end */}
        </div>
        {/* mall management form end */}
      </div>
    </>
  );
};

export default BrandAccountSetting;
