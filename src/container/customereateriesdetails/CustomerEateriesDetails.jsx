import React from "react";
// import "./CustomerBrandDetails.css"
import {
    CustomerEateriesDetailsComponent,
    CustomerHero,
} from "../../components";
import { FaPhone } from "react-icons/fa";
import images from "../../constants/images";

const CustomerEateriesDetails = ({ getsingalmalldata, getedetalis }) => {
    return (
        <div>
            <CustomerHero getsingalmalldata={getsingalmalldata} />
            <div className="mall_nearme_brand_main_wrapp">
                <div style={{ margin: "2rem" }}>
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
                                {getsingalmalldata.name} -{getedetalis.name}
                            </h4>
                            {/* &nbsp;&nbsp; <span className="h3">Eateries</span> */}
                        </div>
                        <CustomerEateriesDetailsComponent getedetalis={getedetalis} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerEateriesDetails;