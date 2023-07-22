import React, { useState } from "react";
import "./EditFacilities.css";
import { useMallContext } from "../../context/mall_context";

const EditFacilities = ({ get_mall_auth_data, getfacility_id, getsinglefacilitydata, setTab }) => {

  const { UpdataFacilityApi, getFacilityApi } = useMallContext();
  const [getfacilityTitle, setFacilityTitle] = useState(getsinglefacilitydata.name ? getsinglefacilitydata.name : "");
  const [getfacilityDes, setFacilityDes] = useState(getsinglefacilitydata.description);
  const [gettermscondition, settermscondition] = useState();

  console.log("getfacility_id is", getfacility_id);
  console.log("getsinglefacilitydata is", getsinglefacilitydata);

  const updateFacilityData = async () => {

    const formdata = await new FormData();
    await formdata.append("id", getfacility_id);
    await formdata.append("name", getfacilityTitle);
    await formdata.append("description", getfacilityDes);

    await formdata.append("terms_condition", gettermscondition);




    console.log("-=-=-=->", formdata);
    const data = await UpdataFacilityApi(formdata);
    if (data) {
      if (data.success === 1) {
        console.log("facility-data", data);
        setTab(6);
        getFacilityApi();
      }
    }
    // }
  };

  return (
    <div className="mm_main_wrapp">
      {/* mall management name start */}
      <div className="mall_name_wrapp">
        <p className="mall_name_heading">{get_mall_auth_data.name}:</p>
        <span>Edit Facility</span>
      </div>
      <div className="mm_horizontal_line"></div>
      {/* mall management name end */}

      {/* facilities form start */}
      <div className="mm_form_wrapp">
        {/* text-input wrapp start */}
        <div className="mm_form_input_wrapp" style={{ width: "100%" }}>
          {/* single text-input */}
          <div className="mm_form_single_input">
            <label htmlFor="ename">Facility Title</label>
            <input
              type="text"
              value={getfacilityTitle}
              onChange={(e) => setFacilityTitle(e.target.value)}
              name="ename"
              id=""
              className="input_box"
            />
          </div>
          {/* single text-input */}

          {/* text-area sec start */}
          <div
            className="mm_form_single_input"
            style={{ alignItems: "flex-start" }}
          >
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              value={getfacilityDes}
              onChange={(e) => setFacilityDes(e.target.value)}
              name=""
              id=""
              className="input_box"
              rows={8}
            />
          </div>
          {/* text-area sec end */}

          {/*  terms condition start */}
          <div className="mm_form_single_input mb_8">
            <label htmlFor=""></label>
            <div className="signup_terms_wrapp">
              <input type="checkbox" value={gettermscondition}
                onChange={(e) => settermscondition(1)} />
              <p className="fs-des">
                I have read and agree to the{" "}
                <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                <a className="signup_terms_link">Privacy Policy</a>
              </p>
            </div>
          </div>
          {/*  terms condition end */}

          {/* upload btn start */}
          {/* single text-input */}
          <div className="mm_form_single_input">
            <label htmlFor=""></label>
            <button
              className="btn btn-orange"
              style={{ alignSelf: "start", maxWidth: "150px" }}
              onClick={() => updateFacilityData()}
            >
              Upload
            </button>
          </div>
          {/* upload btn end */}
        </div>
        {/* text-input wrapp end */}
      </div>
      {/* facilitie form end */}
    </div>
  );
};

export default EditFacilities;
