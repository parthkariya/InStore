import React, { useEffect } from "react";
import "./CustomerPromotionalSingCarg.css";
import images from "../../constants/images";
const CustomerPromotionalSingCarg = ({ x, setTab, SetProId, SetBrandId }) => {
    useEffect(() => {
        console.log("rer", x);
    }, []);

    return (
        <button
            onClick={() => {
                SetProId(x.mall_id);
                SetBrandId(x.brand_id);
                setTab(12);
            }}
            className="cust-promotional-banner-imgbox"
        >
            <img src={x.image_path} className="cust-promotional-banner-sing-img" />
            {/* <img src={images.about_1} className="cust-promotional-banner-sing-img" /> */}
        </button>
    );
};

export default CustomerPromotionalSingCarg;