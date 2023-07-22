import React, { useEffect } from "react";
import "./CustomerBrandDetails.css";
import {
    CustomerBrandDetailsComponent,
    CustomerEateriesDetailsComponent,
    CustomerHero,
} from "../../components";
import { FaPhone } from "react-icons/fa";
import images from "../../constants/images";

const CustomerBrandDetails = ({ getsingalmalldata, getbdetalis }) => {
    return (
        <div className="mall_nearme_brand_main_wrapp">
            {/* <div style={{ margin: "2rem" }}> */}

            <CustomerHero getsingalmalldata={getsingalmalldata} />
            <div className="mm_main_wrapp " style={{ marginBottom: "40px" }}>
                {/* heading */}
                <div
                    className="profile_head_center customer-brand-details-head"
                    style={{
                        marginTop: "40px",
                        alignItems: "start",
                        justifyContent: "start",
                    }}
                >
                    {/* <h4 className="h3" style={{ textTransform: "capitalize" }}>{getsingalmalldata.name}</h4> &nbsp;&nbsp; <span className="h3">Eateries</span> */}
                    <h4
                        className="h3"
                        style={{ textTransform: "capitalize", textAlign: "initial" }}
                    >
                        {getsingalmalldata.name} - {getbdetalis.name}
                    </h4>
                    {/* &nbsp;&nbsp; <span className="h3">Brand</span> */}
                </div>
                <CustomerBrandDetailsComponent getbdetalis={getbdetalis} />
            </div>
            {/* </div> */}
        </div>
    );
};

export default CustomerBrandDetails;