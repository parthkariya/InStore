import React, { useEffect, useState } from "react";
import "./StoreCheckout.css";
import { useMallContext } from "../../context/mall_context";
import { IoChevronBack } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import images from "../../constants/images";
import axios from "axios";
import {
    ACCEPT_HEADER,
    get_store_cart,
    store_checkout,
} from "../../utils/Constant";
import { useAuthContext } from "../../context/auth_context";
const AccordionData = [
    {
        id: 1,
        city: "Leaderboard Banners ",
    },
    {
        id: 2,
        city: "Promotional Banners",
    },
    {
        id: 3,
        city: "Product Banners",
    },
    {
        id: 4,
        city: "Product Tiles",
    },
];
const StoreCheckout = ({ get_mall_auth_data, setTab }) => {
    const [isload, SetLoad] = useState(false);
    const [totallead, SetTotalLead] = useState("");
    const [totalpro, SetTotalPro] = useState("");
    const [totalpduct, SetTotalPduct] = useState("");
    const [totalpducttil, SetTotalPducttil] = useState("");
    useEffect(() => {
        Get_cart();
    }, []);

    const Get_cart = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));
        SetLoad(true);
        axios
            .get(get_store_cart, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                console.log(JSON.stringify(res.data, null, 2));
                if (res.data.success == 1) {
                    SetnearStore(res.data.data);
                    SetTotalLead(res.data.total_leaderboard_amt);
                    SetTotalPro(res.data.total_promotion_banner_amt);
                    SetTotalPduct(res.data.total_product_banner_amt);
                    SetTotalPducttil(res.data.total_product_banner_tile_amt);
                    SetLoad(false);
                } else {
                    SetLoad(false);
                }
            })
            .catch((err) => {
                console.log("err11", err);
                SetLoad(false);
            });
    };
    const [getnearStore, SetnearStore] = useState([]);
    const [sort_array, SetSort_Array] = useState([]);

    const array_sort = (id) => {
        if (id == 1) {
            const numDescending = [...getnearStore].filter((a, b) =>
                a.leaderboard_banner_id ? a.leaderboard_banner_id : ""
            );
            console.log("ffff", numDescending);
            SetSort_Array(numDescending);
        } else if (id == 2) {
            const numDescending = [...getnearStore].filter((a, b) =>
                a.promotion_banner_id ? a.promotion_banner_id : ""
            );
            console.log("ffff", numDescending);
            SetSort_Array(numDescending);
        } else if (id == 3) {
            const numDescending = [...getnearStore].filter((a, b) =>
                a.product_banner_id ? a.product_banner_id : ""
            );
            console.log("ffff", numDescending);
            SetSort_Array(numDescending);
        } else if (id == 4) {
            const numDescending = [...getnearStore].filter((a, b) =>
                a.product_banner_tile_id ? a.product_banner_tile_id : ""
            );
            console.log("ffff", numDescending);
            SetSort_Array(numDescending);
        } else {
            null;
        }
    };

    const [files, setFiles] = useState([]);

    const [toggle, setToggle] = useState(null);
    let handleToggle = (id) => {
        if (toggle === id) {
            setToggle(null);
            return false;
        }
        setToggle(id);
    };

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

    const [getbrandData, setBrandData] = useState(
        get_mall_auth_data && get_mall_auth_data
    );
    const { UpdateMall } = useMallContext();
    const regEx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log("check getbrandData", getbrandData);

    // update mall states
    const [mallName, setMallName] = useState(
        getbrandData.name ? getbrandData.name : ""
    );
    const [physicalAddress, setPhysicalAddress] = useState(
        getbrandData.address ? getbrandData.address : ""
    );
    const [province, setProvince] = useState(
        getbrandData.province ? getbrandData.province : ""
    );
    const [mallWebsite, setMallWebsite] = useState(
        getbrandData.website ? getbrandData.website : ""
    );
    const [mallEmail, setMallEmail] = useState(
        getbrandData.email_mall ? getbrandData.email_mall : ""
    );
    const [mallInsta, setMallInsta] = useState(
        getbrandData.insta ? getbrandData.insta : ""
    );
    const [mallfb, setMallfb] = useState(getbrandData.fb ? getbrandData.fb : "");
    const [mallTwitter, setMallTwitter] = useState(
        getbrandData.tweet ? getbrandData.tweet : ""
    );
    const [contactPerson, setContactPerson] = useState(
        getbrandData.contact_person && getbrandData.contact_person
    );
    const [contactNumber, setContactNumber] = useState(
        getbrandData.number && getbrandData.number
    );
    const [email, setEmail] = useState(
        getbrandData.email ? getbrandData.email : ""
    );

    // tranding times
    const [monFromTime, setMonFromTime] = useState(
        getbrandData.mon_fri_from_time && getbrandData.mon_fri_from_time
    );
    const [monToTime, setMonToTime] = useState(
        getbrandData.mon_fri_to_time && getbrandData.mon_fri_to_time
    );
    const [satFromTime, setSatFromTime] = useState(
        getbrandData.sat_from_time && getbrandData.sat_from_time
    );
    const [satToTime, setSatToTime] = useState(
        getbrandData.sat_to_time && getbrandData.sat_to_time
    );
    const [sunFromTime, setSunFromTime] = useState(
        getbrandData.sun_from_time && getbrandData.sun_from_time
    );
    const [sunToTime, setSunToTime] = useState(
        getbrandData.sun_to_time && getbrandData.sun_to_time
    );
    const [holidayFromTime, setHolidayFromTime] = useState(
        getbrandData.holiday_from_time && getbrandData.holiday_from_time
    );
    const [holidayToTime, setHolidayToTime] = useState(
        getbrandData.holiday_to_time && getbrandData.holiday_to_time
    );

    const { region_data } = useAuthContext();
    const [frist_mall, SetFrist_mall] = useState("");
    const [last_mall, SetLast_mall] = useState("");
    const [compname, SetComPname] = useState("");
    const [comregi, SetComRegi] = useState("");
    const [physicaladd, SetPhysicalAdd] = useState("");
    const [physicaladd1, SetPhysicalAdd1] = useState("");
    const [pcode, SetPCode] = useState("");
    const [number, SetNumber] = useState("");
    const [emailadd, SetEmailAdd] = useState("");
    const [cardnum, SetCardName] = useState("");
    const [cardnumber, SetCardNumber] = useState("");
    const [cardcode, SetCardCode] = useState("");
    const [carddate, SetCardDate] = useState("");
    const [BrandName, setBrandName] = useState("");
    const [getmode, setMode] = useState(1);

    const [BrandId, setBrandId] = useState("");
    const [paymode, SetPyMode] = useState(1);

    const [isAcceptTerm, setIsAcceptTerm] = useState(false);

    const handleTermChange = (event) => {
        setIsAcceptTerm((current) => !current);
    };

    const Place_Order = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));

        const formdata = await new FormData();
        await formdata.append("first_name", frist_mall);
        await formdata.append("last_name", last_mall);
        await formdata.append("company_name", compname);
        await formdata.append("company_reg", comregi);
        await formdata.append("region_id", BrandId);
        await formdata.append("address_1", physicaladd);
        await formdata.append("address_2", physicaladd1);
        await formdata.append("pin_code", pcode);
        await formdata.append("number", number);
        await formdata.append("email", emailadd);
        await formdata.append("payment_mode", paymode);
        await formdata.append("terms_condition", isAcceptTerm === true ? 1 : 0);
        await formdata.append("name_card", cardnum);
        await formdata.append("expiry_date", carddate);
        await formdata.append("card_no", cardnumber);
        await formdata.append("cvv_code", cardcode);
        await formdata.append("status", getmode);

        axios
            .post(store_checkout, formdata, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                console.log(JSON.stringify(res, null, 2));
                setTab(11);
            })
            .catch((err) => {
                console.log("err11", err);
            });
    };

    return (
        <div className="mm_main_wrapp">
            {/* mall management name start */}
            <div className="mall_name_wrapp">
                <p className="mall_name_heading">
                    {" "}
                    {get_mall_auth_data &&
                        get_mall_auth_data.retailers.name &&
                        get_mall_auth_data.retailers.name}
                    :
                </p>
                <span>Checkout</span>
            </div>
            <div className="mm_horizontal_line"></div>
            {/* mall management name end */}

            {/* mall management form start */}

            <div className="brand-checkout-main-flex-wrapp">
                <div className="store_checkout_form_input_wrapp">
                    {/* text-input wrapp start */}
                    <div className="">
                        <p className="brand-checkout-subheading">Billing Details</p>
                        {/* single text-input */}
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <div className="mm_form_single_input store-checkout-form-flex-column">
                                <label htmlFor="">First Name</label>
                                <input
                                    type="text"
                                    value={frist_mall}
                                    onChange={(e) => SetFrist_mall(e.target.value)}
                                    name=""
                                    id=""
                                    className="input_box"
                                />
                            </div>
                            <div className="mm_form_single_input store-checkout-form-flex-column">
                                <label htmlFor="">Last Name</label>
                                <input
                                    type="text"
                                    value={last_mall}
                                    onChange={(e) => SetLast_mall(e.target.value)}
                                    name=""
                                    id=""
                                    className="input_box"
                                />
                            </div>
                        </div>

                        {/* single text-input */}
                        <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Company Name</label>
                            <input
                                type="text"
                                value={compname}
                                onChange={(e) => SetComPname(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        {/* single text-input */}
                        <div className="mm_form_single_input store-checkout-form-flex-column">
                            <label htmlFor="">Company Registration</label>
                            <input
                                type="text"
                                value={comregi}
                                onChange={(e) => SetComRegi(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>

                        {/* single text-input */}
                        {/* <div className="mm_form_single_input">
            <label htmlFor="">Province</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              name=""
              id=""
              className="input_box"
            />
          </div> */}
                        {/* single text-input */}
                        <div className="mm_form_single_input store-checkout-form-flex-column">
                            <label htmlFor="">Region</label>

                            <select
                                className="leaderboard-card-inp"
                                onChange={(e) => {
                                    console.log("rrr", e.target.value);
                                    setBrandName(e.target.value);
                                    setBrandId(e.target.value);
                                }}
                            >
                                <option selected disabled value="">
                                    {BrandName}
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
                        {/* single text-input */}
                        <div className="mm_form_single_input store-checkout-form-flex-column">
                            <label htmlFor="">Physical Address</label>
                            <input
                                type="text"
                                value={physicaladd}
                                onChange={(e) => SetPhysicalAdd(e.target.value)}
                                // onChange={(e) => onHandleMallEmailChange(e)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        <div className="mm_form_single_input store-checkout-form-flex-column">
                            <label htmlFor="">Physical Address 1</label>
                            <input
                                type="text"
                                value={physicaladd1}
                                onChange={(e) => SetPhysicalAdd1(e.target.value)}
                                // onChange={(e) => onHandleMallEmailChange(e)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>

                        {/* single text-input */}
                        <div className="mm_form_single_input store-checkout-form-flex-column">
                            <label htmlFor="">Postal code</label>
                            <input
                                type="number"
                                value={pcode}
                                onChange={(e) => SetPCode(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        {/* single text-input */}
                        <div className="mm_form_single_input store-checkout-form-flex-column">
                            <label htmlFor="">Contact Number</label>
                            <input
                                type="number"
                                value={number}
                                onChange={(e) => SetNumber(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>

                        {/* single text-input */}
                        <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Email Address</label>
                            <input
                                type="email"
                                value={emailadd}
                                onChange={(e) => SetEmailAdd(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>

                        {/* single text-input */}
                        <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Payment methods</label>
                            <div className="checkout-payment-method-imgbox">
                                <button
                                    onClick={() => {
                                        SetPyMode(1);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method1}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 1 ? "0.5" : "1" }}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        SetPyMode(2);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method2}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 2 ? "0.5" : "1" }}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        SetPyMode(3);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method3}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 3 ? "0.5" : "1" }}
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        SetPyMode(4);
                                    }}
                                >
                                    <img
                                        src={images.checkout_payment_method4}
                                        className="checkout-payment-method-img"
                                        style={{ opacity: paymode == 4 ? "0.5" : "1" }}
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Name Of card</label>
                            <input
                                type="email"
                                value={cardnum}
                                onChange={(e) => SetCardName(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Card Number</label>
                            <input
                                type="email"
                                value={cardnumber}
                                onChange={(e) => SetCardNumber(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">Expirey date</label>
                            <input
                                type="date"
                                value={carddate}
                                onChange={(e) => SetCardDate(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>
                        <div
                            className="mm_form_single_input store-checkout-form-flex-column"
                            style={{ alignItems: "flex-start" }}
                        >
                            <label htmlFor="">CVC code</label>
                            <input
                                type="email"
                                value={cardcode}
                                onChange={(e) => SetCardCode(e.target.value)}
                                name=""
                                id=""
                                className="input_box"
                            />
                        </div>

                        <div className="radio-btn-flex-brand">
                            <div className="radio-btn-inner-flex">
                                <input
                                    type="radio"
                                    id="Online"
                                    name="gender"
                                    value={getmode}
                                    onChange={(e) => setMode(1)}
                                />
                                <label className="course-form-txt" for="male">
                                    success
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
                                    Fail{" "}
                                </label>
                            </div>
                        </div>

                        {/* mm terms condition wrapp */}
                        <div className="checkout-terms-part">
                            <div className="mm_form_single_input">
                                {/* <label htmlFor=""></label> */}
                                <div
                                    className="signup_terms_wrapp"
                                    style={{ marginBottom: "10px" }}
                                >
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
                                {/* <label htmlFor=""></label> */}
                                <div
                                    className="mall_upload_btn_wrapp"
                                    style={{ width: "100%" }}
                                >
                                    <button
                                        className="btn btn-orange"
                                        onClick={() => Place_Order()}
                                    >
                                        Submit Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* text-input wrapp end */}
                </div>
                {/*     Checkout second part */}

                <div className="checkout-main-wrapp">
                    <p className="brand-checkout-subheading">Summary</p>
                    <div className="checkout-dropdown-main-wrapp">
                        {AccordionData && AccordionData.length > 0
                            ? AccordionData.map((item, index) => {
                                return (
                                    <>
                                        <button
                                            className="checkout-head-sub-part"
                                            onClick={() => {
                                                handleToggle(item.id);
                                                array_sort(item.id);
                                            }}
                                        >
                                            <div className="checkout-heading-txt-part">
                                                <p className="checkout-heading-txt">
                                                    {item.city}
                                                    {/* {item.city} {"(" + item.mall.length + ")"} &nbsp;
                            &nbsp;{" "} */}
                                                    {item.id === toggle ? (
                                                        <IoIosArrowUp size={20} color="#ff8b00" />
                                                    ) : (
                                                        <IoIosArrowDown size={20} />
                                                    )}
                                                </p>
                                            </div>
                                            {item.id == 1 ? (
                                                <p className="checkout-price">${totallead}</p>
                                            ) : item.id == 2 ? (
                                                <p className="checkout-price">${totalpro}</p>
                                            ) : item.id == 3 ? (
                                                <p className="checkout-price">${totalpduct}</p>
                                            ) : item.id == 4 ? (
                                                <p className="checkout-price">${totalpducttil}</p>
                                            ) : null}
                                        </button>

                                        {item.id === toggle ? (
                                            <div className="bim_accordian_mall_wrapp">
                                                {sort_array.map((itm, ind) => {
                                                    return (
                                                        <>
                                                            {item.id == 1 ? (
                                                                <button key={itm.id}>
                                                                    {itm.leaderboards.title}
                                                                </button>
                                                            ) : item.id == 2 ? (
                                                                <button key={itm.id}>
                                                                    {itm.promotionbanners.description}
                                                                </button>
                                                            ) : item.id == 3 ? (
                                                                <button key={itm.id}>
                                                                    {itm.productbanners.description}
                                                                </button>
                                                            ) : item.id == 4 ? (
                                                                <button key={itm.id}>
                                                                    {itm.productbannertiles.title}
                                                                </button>
                                                            ) : null}
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        ) : null}
                                    </>
                                );
                            })
                            : null}
                        <div className="checkout-totalbox">
                            <p className="checkout-total-txt">Total</p>
                            <p className="checkout-total-txt">
                                $ {totallead + totalpro + totalpduct + totalpducttil}
                            </p>
                        </div>
                    </div>
                </div>

                {/* mm terms condition wrapp */}
                <div className="checkout-terms-part-responsive">
                    <div className="mm_form_single_input">
                        {/* <label htmlFor=""></label> */}
                        <div
                            className="signup_terms_wrapp"
                            style={{ marginBottom: "10px" }}
                        >
                            <input type="checkbox" />
                            <p className="fs-des">
                                I have read and agree to the{" "}
                                <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                                <a className="signup_terms_link">Privacy Policy</a>
                            </p>
                        </div>
                    </div>

                    {/* upload button */}
                    <div className="mm_form_single_input">
                        {/* <label htmlFor=""></label> */}
                        <div className="mall_upload_btn_wrapp">
                            <button
                                className="btn btn-orange"
                            // onClick={() => UpdateMallData()}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* mall management form end */}
        </div>
    );
};

export default StoreCheckout;