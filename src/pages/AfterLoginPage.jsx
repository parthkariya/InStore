import React, { useEffect, useState } from "react";

import { HomeHero, RegisterMall, WelcomeStore, WhayJoin } from "../container";
import { Helmet } from "react-helmet";
import images from "../constants/images";
import { Navbar, RetailerNavbar } from "../common";
import { AiOutlineClose } from "react-icons/ai";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import Urls from "../utils/Urls";
import { FaFacebookF } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { useAuthContext } from "../context/auth_context";
import { useStoreContext } from "../context/store_context";
import { useMallContext } from "../context/mall_context";
import { ACCEPT_HEADER, get_mall, get_mall_master } from "../utils/Constant";
import axios from "axios";
import { RetailerPageNavbar } from "../components";

const AfterLoginPage = () => {
  const { setLogin } = useAuthContext();

  const [modalIsOpen3, setIsOpen3] = useState(false);

  let navigate = useNavigate();

  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [modalIsOpenBrand, setModalIsOpenBrand] = useState(false);

  const [getmallname, setMallname] = useState("");
  const [getfirstname, setFirstname] = useState("");
  const [retailertype, setRetailertype] = useState("");
  const [getlastname, setLastname] = useState("");
  const [getemail, setEmail] = useState("");
  const [getpassword, setPassword] = useState("");
  const [getsidebarOpen, setSidebarOpen] = useState(false);
  const [getaccountOpen, setAccountOpen] = useState(false);
  const [getcondation, SetCondation] = useState(false);
  const [getgender, setGender] = useState("");
  const [getmallmasterid, setmallmasterid] = useState("");

  const [profile, setProfile] = useState("");
  const [isAcceptTerm, setIsAcceptTerm] = useState(false);

  const { setRegisterStore, retailer_data, getRetailerApi } = useStoreContext();
  const { get_brand_data, getBrand } = useMallContext();


  const brandLoginModalOpen = () => {
    setModalIsOpenBrand(false);
    setIsOpen3(true);
  };

  function closeModalBrand() {
    setModalIsOpenBrand(false);
  }

  const handleTermChange = (event) => {
    setIsAcceptTerm((current) => !current);
  };

  function closeModal3() {
    setIsOpen3(false);
  }

  useEffect(() => {
    console.log("get brand data is", get_brand_data);
    console.log("get retailer data is", retailer_data);
  }, [])


  // get mall master

  useEffect(() => {
    getMallMaster();
  }, []);

  const [getmallarray, SetMallArray] = useState([]);
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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      backgroundColor: "none",
      border: "none",
      borderRadius: "0px",
      maxHeight: "670px",
      paddingBottom: "10px",

    },
    overlay: {
      zIndex: 1000,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  // Brand Google signin

  const SigninCustomerGoogle = async (gmail, type, data) => {
    if (gmail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(gmail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else {
      var params = {
        role: 3,
        email: gmail,
        // password: "",
        type: type,
      };

      console.log("-=-=-=->", params);
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          setIsOpen3(false);
          navigate("/");
          setEmail("");
          window.location.reload(false);
        }
      }
    }
  };

  // Brand Facebook signin

  const SigninCustomerFacebook = async (fdata, type) => {
    var params = {
      role: 3,
      fb_id: fdata.id,
      first_name: fdata.first_name,
      last_name: fdata.last_name,
      type: type,
      name: fdata.name,
    };

    console.log("-=-=-=->", params);
    const data = await setLogin(params);
    if (data) {
      if (data.success === 1) {
        setIsOpen3(false);
        navigate("/");
        setEmail("");
        window.location.reload(false);
      }
    }
  };

  // Signup Brand

  const SigninCustomer = async (type) => {
    if (retailertype === "") {
      alert("Enter the Retailer Name......!");
      return;
    } else if (getgender === "") {
      alert("Select Retailer type......!");
      return;
    }
    else if (getfirstname === "") {
      alert("Enter the FirstName No......!");
      return;
    } else if (getlastname === "") {
      alert("Enter the LastName No......!");
      return;
    }
    else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else {
      var params = {
        // mall_id: getmallname,
        mall_master_id: getmallmasterid,
        retailer_id: retailertype,
        store_type: getgender,
        brand: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
        email: getemail,
        role: 3,
        password: getpassword,
        terms_condition: isAcceptTerm,
      };

      console.log("-=-=-=->", params);
      const data = await setRegisterStore(params);
      if (data) {
        if (data.success === 1) {
          console.log("register-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  // Brand Login

  const LoginBrand = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 3,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      console.log("-=-=-=->brand", params);
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          console.log("brand-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(true);
          navigate("/branddashboard")
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Home Screen</title>
      </Helmet>
      {/* <Navbar
      // setCustomerDropdown={setCustomerDropdown}
      // getcustomerDropdown={getcustomerDropdown}
      /> */}
      <RetailerNavbar />

      <div>
        {/* <HomeHero img={images.after_login_img} /> */}
        <div
          className="about_hero_wrapp"
          style={{
            backgroundImage: `url(${images.brand_page_hero})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* <img src={images.hero_banner} alt="" /> */}
          <div className="homehero_text_main">
            <div className="homehero_text_base">
              <img src={images.hero_logo} alt="" />
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "500",
                  color: "var(--color-orange)",
                }}
              >
                for retailers
              </p>
              <button
                className="btn btn-black"
                style={{ width: "auto" }}
                onClick={() => setModalIsOpenBrand(true)}
              >
                Register your brand
              </button>
              {/* <div className="apps_logos_wrapp">
                  <img src={images.play_store_logo} alt='play store logo' />
                  <img src={images.app_store_logo} alt='app store logo' />
                </div> */}
            </div>
          </div>
        </div>
        <WelcomeStore
          WcBtn={false}
          title={"Welcome to In-store retailers"}
          des={
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip."
          }
        />
        <WhayJoin />

        {/* about in store register part-3 start*/}
        <div className="main_wrapp registermall_main_wrapp bg-orange">
          <div className="container registermall_base_wrapp">
            <div className="registermall_sec1">
              <h2 className="h2">
                Lorem ipsum dolor sit
                <br /> consectetuer
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo.
              </p>
              {/* <button>Register your brand</button> */}
            </div>
            <div className="registermall_sec2">
              <img src={images.about_3} alt="" />
            </div>
          </div>
        </div>
        {/* about in store register part-3 start*/}
      </div>

      {/* Brand register */}

      <ReactModal
        isOpen={modalIsOpenBrand}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalBrand}
        style={customStyles}
      >
        <div className="home_model_4wrapp">
          <button className="signup_modal_close" onClick={closeModalBrand}>
            <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt"
            >
              Cancel
            </span>{" "}
            <AiOutlineClose color="red" />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Register to In-Store
          </button>

          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Mall Name</label>
            <select className="leaderboard-card-inp" onChange={(e) => {
              setmallmasterid(e.target.value);
              getRetailerApi(e.target.value);
              console.log(e.target.value);
            }}>
              {getmallarray &&
                getmallarray.map((item, index) => {
                  return (
                    <>
                      {/* <option selected disabled value=""></option> */}
                      <option value={item.id} key={index}>
                        {item.name} {item.id} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                        &nbsp;&nbsp;&nbsp; {item.to_date}
                      </option>
                    </>
                  );
                })}

            </select>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Retailer Name</label>
            <select className="leaderboard-card-inp" onChange={(e) => {
              setRetailertype(e.target.value);
              getBrand(e.target.value)
              console.log(e.target.value);
            }}>
              <option defaultValue value=""></option>
              {retailer_data && retailer_data.map((item, index) => {
                return (
                  <>
                    {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                    <option value={item.id} key={index}>{item.name}</option>
                  </>
                )
              })}

            </select>
          </div>



          {/* <div className="mm_form_single_input">
            <label htmlFor="">Brand Name</label>
            <select className="leaderboard-card-inp" onChange={(e) => {
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

            </select>
          </div> */}

          <div className="radio-btn-flex sign_input_wrapp_padding_less">
            {/* <label className="course-form-txt course-form-margin-right">
              Mode Of Delivery:
            </label> */}
            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="Online"
                name="gender"
                defaultValue={retailer_data.type}
                onChange={(e) => { setGender(1) }}

              />
              <label className="brand-lable-radio-btn-txt" for="male">
                Independent Retailer
              </label>
            </div>

            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="In-Person"
                name="gender"
                // value={2}
                // onChange={(e) => setMode(e.target.value)}
                value={getgender}
                onChange={(e) => setGender(2)}
              />
              <label className="brand-lable-radio-btn-txt" for="specifyColor">
                Group Retailer
              </label>
            </div>
          </div>

          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="first-name">Brands (if applicable)</label>
            <select className="leaderboard-card-inp" onChange={(e) => {
              setMallname(e.target.value);
              console.log(e.target.value);
            }}>
              {get_brand_data && get_brand_data.map((item, index) => {
                return (
                  <>
                    {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                    <option value={item.id} key={index}>{item.name}</option>
                  </>
                )
              })}

            </select>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="last-name">Account Manager First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label>Account Manager Last Name</label>
            <input
              type="text"
              value={getlastname}
              onChange={(e) => setLastname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="email">Account Manager Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              value={getemail}
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="password">Set a Password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="signup_terms_wrapp mb_16">
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
          <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm ? false : true}
            onClick={() => SigninCustomer()}
          >
            Register
          </button>
          <p style={{ color: "black", fontWeight: "600", marginBottom: "5px" }}>
            OR
          </p>
          <p className="fs-des">
            If you are already registered, then{" "}
            <span
              onClick={() => brandLoginModalOpen()}
              className="signup_terms_link"
            >
              login here
            </span>
          </p>
        </div>
      </ReactModal>

      {/* Brand Login Modal Start */}
      <ReactModal
        isOpen={modalIsOpen3}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal3}
        style={customStyles}
      >
        <div className="home_login_model_1sec_inner">
          <button className="signup_modal_close" onClick={closeModal3}>
            <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt"
            >
              Cancel
            </span>{" "}
            <AiOutlineClose color="red" />
          </button>
          <div className="f-b900 fs-22 mb_16 signup_headign">Welcome Back!</div>
          <div className="sign_input_wrapp">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              value={getemail}
              className="signup_input"
              autoFocus="true"
            // style={{ background: "#DAD9D8", border: 'none' }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
              className="signup_input"
            // style={{ background: "#DAD9D8", border: 'none' }}
            />
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
            <button className="signup_model_forgate">Forgate password?</button>
          </div>
          <button
            className="btn btn-orange mb_16"
            onClick={() => LoginBrand()}
            disabled={isAcceptTerm ? false : true}
          >
            Login
          </button>
          <p
            style={{
              alignSelf: "center",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            or
          </p>

          <div style={{ width: "100%" }}>
            {/* facebook button */}

            <LoginSocialFacebook
              appId="1377758369684897"
              fieldsProfile={
                "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
              }
              // version={3}
              onLoginStart={(e) => console.log(e)}
              onLogoutSuccess={(e) => console.log(e)}
              redirect_uri={Urls.base_url}
              onResolve={({ data }: IResolveParams) => {
                // setProfile(data);
                console.log(data);
                SigninCustomerFacebook(data, "3");
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <FaFacebookF
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Facebook
              </button>
            </LoginSocialFacebook>

            {/* google button */}

            <LoginSocialGoogle
              // client_id="775372553139-o2l7tmtgohlmu3q31o0ufsfne62g47tk.apps.googleusercontent.com"
              client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
              // onLoginStart={onLoginStart}
              redirect_uri={Urls.base_url}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ data }: IResolveParams) => {
                setProfile(data);
                console.log("gdata", data);
                // registerWithGoogle(data);
                // registerWithGoogle(data);
                SigninCustomerGoogle(data.email, "2", data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <ImGoogle
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Google
              </button>
              {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
            </LoginSocialGoogle>
          </div>
          <button className="h6 mb_10 mt_10" style={{ alignSelf: "center" }}>
            Not registered yet?
          </button>
          <button
            onClick={() => {
              setIsOpen3(false);
              setIsOpen3(true);
            }}
            className="btn btn-blue"
          >
            Register Your Mall
          </button>
        </div>
      </ReactModal>
      {/* Brand Login Modal End */}
    </>
  );
};

export default AfterLoginPage;
