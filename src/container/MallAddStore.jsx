import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMallContext } from "../context/mall_context";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import Notification from "../utils/Notification"
import {
    ACCEPT_HEADER,
    get_category,
    mall_create_store,
} from "../utils/Constant";
import { MallHero } from "../components";
import { IoChevronBack } from "react-icons/io5";

const MallAddStore = ({
    getsingleStoreData,
    getstore_is,
    get_mall_auth_data,
    setTab,
    getStoreList,
}) => {
    const { UpdateMallStore, get_brand_data, AddMallStore } = useMallContext();
    const [files, setFiles] = useState([]);
    const [files2, setFiles2] = useState([]);
    const regEx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    // update store states
    const [storeName, setStoreName] = useState("");
    const [storeCategory, setStoreCategory] = useState("");
    const [storeContactPersoon, setStoreContactPerson] = useState("");
    const [storeNumber, setStoreNumber] = useState("");
    const [storeLevel, setStoreLevel] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [storeDes, setStoreDes] = useState("");
    const [storeLogo, setStoreLogo] = useState();
    const [retailerType, setRetailerType] = useState(1);

    // trnding hours
    // trnding hours states
    const [monFromTime, setMonFromTime] = useState();
    const [monToTime, setMonToTime] = useState();
    const [satFromTime, setSatFromTime] = useState();
    const [satToTime, setSatToTime] = useState();
    const [sunFromTime, setSunFromTime] = useState();
    const [sunToTime, setSunToTime] = useState();
    const [holidayFromTime, setHolidayFromTime] = useState();
    const [holidayToTime, setHolidayToTime] = useState();

    useEffect(() => {
        files.length > 0 &&
            files.map((item) => {
                setStoreLogo(item);
                console.log("files", item);
            });
    }, [files]);

    useEffect(() => {
        files2.length > 0 &&
            files2.map((item) => {
                setStoreLogo(item);
                console.log("files", item);
            });
    }, [files2]);

    const onHandleEmailChange = (e) => {
        let email = e.target.value;
        if (email === "" || regEx.test(email)) {
            setEmail(email);
        } else {
            return;
        }
    };

    const onHandleNumberChange = (e) => {
        let number = e.target.value;
        if (number === "" || re.test(number)) {
            setNumber(number);
        } else {
            return;
        }
    };

    const handleTermChange = (event) => {
        // setRetailerType((current) => !current);
        if (retailerType == 1) {
            setRetailerType(2);
        } else {
            setRetailerType(1);
        }

        console.log("retailer type is", retailerType);
    };

    // update mall store api

    const AddStoreNallData = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));
        // {
        //   var params = {
        //     store_id: getstore_is,
        //     name: storeName,
        //     store_no: storeNumber,
        //     store_level: storeLevel,
        //     number: number,
        //     email: email,
        //     description: storeDes,
        //     store_logo: storeLogo,

        //     mon_fri_from_time: monFromTime,
        //     mon_fri_to_time: monToTime,
        //     sat_from_time: satFromTime,
        //     sat_to_time: satToTime,
        //     sun_from_time: sunFromTime,
        //     sun_to_time: sunToTime,
        //     holiday_from_time: holidayFromTime,
        //     holiday_to_time: holidayToTime,
        //   };
        // {

        if (storeName == "" || undefined) {
            Notification("error", "Error!", "Please Enter Brand Name!");
            return;
        } else if (storeCategory == "" || undefined) {
            Notification("error", "Error!", "Please Select Store Category!");
            return;
        } else if (storeNumber == "" || undefined) {
            Notification("error", "Error!", "Please Enter Store Number!");
            return;
        } else if (storeLevel == "" || undefined) {
            Notification("error", "Error!", "Please Select Store Level!");
            return;
        } else if (storeContactPersoon == "" || undefined) {
            Notification("error", "Error!", "Please Enter Contact Person Name!");
            return;
        } else if (number == "" || undefined) {
            Notification("error", "Error!", "Please Enter Number!");
            return;
        } else if (number.length < 10 || number.length > 10) {
            // alert("Enter valid mobile number...");
            Notification("error", "Error!", "Enter valid mobile number...");

            return;
        } else if (email == "" || undefined) {
            Notification("error", "Error!", "Please Enter Email!");
            return;
        } else if (regEx.test(email) == false) {
            Notification("error", "Error!", "Please enter valid email id!");
            return;
        } else if (storeDes == "" || undefined) {
            Notification("error", "Error!", "Please Enter some Description!");
            return;
        } else {
            const formdata = await new FormData();
            await formdata.append("name", storeName);
            await formdata.append("category_id", storeCategory);
            await formdata.append("store_no", storeNumber);
            await formdata.append("store_level", storeLevel);
            await formdata.append("contact_person", storeContactPersoon);
            await formdata.append("contact_no", number);
            await formdata.append("email", email);
            await formdata.append("description", storeDes);

            await formdata.append("mon_fri_from_time", monFromTime);
            await formdata.append("mon_fri_to_time", monToTime);
            await formdata.append("sat_from_time", satFromTime);
            await formdata.append("sat_to_time", satToTime);
            await formdata.append("sun_from_time", sunFromTime);
            await formdata.append("sun_to_time", sunToTime);
            await formdata.append("holiday_from_time", holidayFromTime);
            await formdata.append("holiday_to_time", holidayToTime);
            await formdata.append("type", retailerType);
            if (files && files.length > 0) {
                await formdata.append("store_logo", files[0]);

            }

            if (files && files.length > 0) {
                await formdata.append("banner_store", files2[0]);

            }

            // }

            console.log("-=-=-=->", formdata);

            // const data = await AddMallStore(formdata);
            // if (data) {
            //   if (data.success === 1) {
            //     console.log("mall-data", data);
            //     setTab(3);
            //   }
            // }
            // }

            axios
                .post(mall_create_store, formdata, {
                    headers: {
                        Accept: ACCEPT_HEADER,
                        Authorization: "Bearer " + token,
                    },
                })
                .then((res) => {
                    console.log("create_movie", JSON.stringify(res.data, null, 2));
                    if (res.data.success == 1) {
                        Notification("success", "Success!", "Brand Added Successfully!");
                        setTab(3);
                        getStoreList();
                    } else {
                        null;
                    }
                })
                .catch((err) => {
                    console.log("err11", err);
                });
        }

    };

    const { getRootProps: getRootLogoProps, getInputProps: getInputLogoProps } = useDropzone({
        accept: "image/*",
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

    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            console.log("acceptedFiles", acceptedFiles);
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

    useEffect(() => {
        // console.log("get_brand_data", get_brand_data);
        getcat();
    }, []);

    const [catarray, SetArray] = useState([]);

    const getcat = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));

        axios
            .get(get_category, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                // console.log("ggg", JSON.stringify(res.data, null, 2));
                if (res.data.success == 1) {
                    SetArray(res.data.data);
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
            <MallHero get_mall_auth_data={get_mall_auth_data} />


            <div className="mm_main_wrapp">
                <div className='edit-brand-back-iconbox' onClick={() => setTab(3)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>
                {/* mall management name start */}
                <div className="mall_name_wrapp">
                    <p className="mall_name_heading">{get_mall_auth_data.name ? get_mall_auth_data.name : ""}:</p>
                    <span>Add Brand</span>
                </div>
                <div className="mm_horizontal_line"></div>
                {/* mall management name end */}

                {/* mall management form start */}
                <div className="mm_form_wrapp">
                    {/* text-input wrapp start */}
                    <div className="mm_form_input_wrapp">
                        {/* single text-input */}
                        <div className="mm_form_single_input">
                            <label htmlFor="" style={{ minWidth: "140px" }}>Brand Name</label>
                            <input
                                type="text"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />

                            {/* <select className="leaderboard-card-inp" onChange={(e) => {
                            setStoreName(e.target.value);
                            console.log(e.target.value);
                        }}>
                            {get_brand_data && get_brand_data.map((item, index) => {
                                return (
                                    <>
                                        <option selected disabled value="">
                                            Auto-fill from database
                                        </option>
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    </>
                                )
                            })}

                        </select> */}
                        </div>
                        {/* single text-input */}
                        <div className="mm_form_single_input">
                            <label htmlFor="" style={{ minWidth: "140px" }}>Category</label>
                            <select
                                className="leaderboard-card-inp"
                                onChange={(e) => {
                                    setStoreCategory(e.target.value);
                                    console.log(e.target.value);
                                }}
                            >
                                <option defaultValue value=""></option>
                                {catarray &&
                                    catarray.map((item, index) => {
                                        return (
                                            <>
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            </>
                                        );
                                    })}
                            </select>
                            {/* <input
              type="text"
              value={storeCategory}
              //   onChange={(e) => setStoreName(e.target.value)}
              name=""
              id=""
              className="input_box"
              placeholder="Fashion, homeware, audio visual"
            /> */}
                        </div>
                        {/* single text-input */}
                        <div className="mm_form_single_input">
                            <label htmlFor="" style={{ minWidth: "140px" }}>Store Number</label>
                            <input
                                type="text"
                                value={storeNumber}
                                onChange={(e) => setStoreNumber(e.target.value)}
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
                                value={storeLevel}
                                onChange={(e) => setStoreLevel(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        {/* single text-input */}
                        <div className="mm_form_single_input">
                            <label htmlFor="" style={{ minWidth: "140px" }}>Contact Person</label>
                            <input
                                type="text"
                                value={storeContactPersoon}
                                onChange={(e) => setStoreContactPerson(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        {/* single text-input */}
                        <div className="mm_form_single_input">
                            <label htmlFor="" style={{ minWidth: "140px" }}>Contact Number</label>
                            <input
                                type="text"
                                onChange={(e) => onHandleNumberChange(e)}
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
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>

                        {/* tranding sec strat */}
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
                                            fontSize: "16px",
                                            fontWeight: "400",
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
                                        {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
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
                                        {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
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
                                        {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
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
                                        {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
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
                                        {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
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
                            <label htmlFor="">Brand Description</label>
                            <textarea
                                type="text"
                                value={storeDes}
                                onChange={(e) => setStoreDes(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                                rows={8}
                            />
                        </div>

                        <div className="signup_terms_wrapp">
                            <input
                                type="checkbox"
                                value={retailerType}
                                onChange={handleTermChange}
                            // checked={retailerType}
                            />
                            {retailerType == 1 ? <p className="fs-des">
                                Independed Retailer
                                {/* <a className="signup_terms_link">Terms and Conditions</a> &{" "}
              <a className="signup_terms_link">Privacy Policy</a> */}
                            </p> : <p>Group Retailer</p>}

                        </div>
                        {/* text-area sec end */}
                        <div className="mm_form_single_input">
                            <button
                                className="btn btn-orange"
                                onClick={() => AddStoreNallData()}
                                style={{ width: "25%" }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    {/* text-input wrapp end */}
                    <div className="brand-add-img-flex">
                        {/* upload images wrapp start */}
                        <div className="mm_img_upload_wrapp" style={{ width: "100%" }}>
                            {/* single upload image */}
                            <div className="myprofile_inner_sec2">
                                <h4 style={{ marginBottom: "10px" }}>Upload the brand logo <br />
                                    (200 x 200 pixels)</h4>
                                {files && files.length > 0 ? (
                                    <div className="myprofile_inner_sec2_img_upload">{thumbs}</div>
                                ) : (
                                    <div
                                        style={{ width: "100%" }}
                                        {...getRootLogoProps({ className: "dropzone" })}
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
                                                {...getInputLogoProps()}
                                                accept="image/jpeg, image/jpg, image/png, image/eps"
                                                type="file"
                                                name="photos"
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
                                                style={{ marginBottom: "10px" }}
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

                        {/* upload images wrapp start */}
                        <div className="mm_img_upload_wrapp" style={{ width: "100%" }}>
                            {/* single upload image */}
                            <div className="myprofile_inner_sec2">
                                <h4 style={{ marginBottom: "10px" }}>Upload the brand banner <br />
                                    (200 x 200 pixels)</h4>
                                {files2 && files2.length > 0 ? (
                                    <div className="myprofile_inner_sec2_img_upload">{thumbs2}</div>
                                ) : (
                                    <div
                                        style={{ width: "100%" }}
                                        {...getRootBannerProps({ className: "dropzone" })}
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
                                                {...getInputBannerProps()}
                                                accept="image/jpeg, image/jpg, image/png, image/eps"
                                                type="file"
                                                name="photos"
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
                                                style={{ marginBottom: "10px" }}
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
                </div>
                {/* mall management form end */}
            </div>
        </>
    );
};

export default MallAddStore;