import React, { useState } from 'react'
import images from '../../constants/images'

const UploadMovieDirectory = ({ get_mall_auth_data }) => {

    const handleTermChange = (e) => {
        setIsAcceptTerm(1);
        console.log("e.targate.value");
    };

    const [isAcceptTerm, setIsAcceptTerm] = useState(0);
    return (
        <div className="mm_main_wrapp">
            <div className="mall_name_wrapp">
                <p className="mall_name_heading">
                    {get_mall_auth_data.name && get_mall_auth_data.name} :
                </p>
                <span>Movies</span>
            </div>
            <div className="mm_horizontal_line"></div>
            <div className="store-directory-card" style={{ marginTop: "40px" }}>
                <div className="store-directory-part1">
                    <div className="store-directory-first-inner-part1">
                        <p className="store-dire-head">
                            How to upload an Excel file and display it via the spreadsheet
                            control
                        </p>
                        <ul>
                            <li style={{ fontWeight: "400" }}>
                                Download the In-store{" "}
                                <span
                                    style={{
                                        color: "var(--color-orange)",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                    }}
                                >
                                    Excel template
                                </span>{" "}
                                file below
                            </li>
                            <li style={{ fontWeight: "400" }} >Add your data to the In-Store Excel file</li>
                            <li style={{ fontWeight: "400" }}>Save your Excel file with the shopping centre/Mall name</li>
                            <li style={{ fontWeight: "400" }}>Upload it for processing</li>
                        </ul>
                    </div>
                    <div className="store-directory-first-inner-part2">
                        <button className="btn btn-orange">Download Template</button>
                    </div>
                    {/* <p className="update-details-txt">Drag and drop the Event <br /> image here (250 x 250)</p>
           */}
                </div>
                <div className="store-directory-part2">
                    <img
                        src={images.cloud_upload}
                        alt=""
                        style={{
                            width: "51px",
                            height: "100px",
                            marginBottom: "8px",
                        }}
                    />

                    <h4 className="">.ELSX .CVS</h4>
                    <p className="">You can also upload files by</p>
                    <a className="" href="">
                        clicking here
                    </a>
                </div>

                <div className="store-directory-part3">
                    <div className="store-directory-third-inner-part1">
                        <button
                            style={{
                                color: "var(--color-orange",
                                cursor: "pointer",
                                fontSize: "18px",
                                fontWeight: "600",
                            }}
                        //   onClick={() => setIsOpen(true)}
                        >
                            Preview
                        </button>
                        {/* <div style={{ fontWeight: "400", }}> */}
                        {/* <div className="mm_form_single_input"> */}
                        {/* <label htmlFor=""></label>
                            <div className="signup_terms_wrapp">
                                <input
                                    type="checkbox"
                                    value={isAcceptTerm}
                                    onChange={handleTermChange}
                                    checked={isAcceptTerm == 1}
                                />
                                <p className="fs-des" style={{ fontWeight: '400', fontSize: "16px", }}>
                                    I have read and agree to the{" "}
                                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                                    <a className="signup_terms_link">Privacy Policy</a>
                                </p>
                            </div>
                        </div> */}
                    </div>
                    <button className="btn btn-orange mb-10">Upload File</button>
                </div>
                <div className="store-directory-part4">
                    <button className="btn btn-blue">Cancel</button>
                </div>
            </div>
        </div >
    )
}

export default UploadMovieDirectory