import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import { HomeHero, WelcomeStore, WhayJoin } from "../../container";
import { Helmet } from "react-helmet";
import ReactModal from "react-modal";
import { useMallContext } from "../../context/mall_context";
import { GrClose } from "react-icons/gr";
import { Navbar } from "../../common";
import { useAuthContext } from "../../context/auth_context";
import { AiOutlineClose } from "react-icons/ai";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { FaFacebookF } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Urls from "../../utils/Urls";
import MallWelcomeStoreCard from "../../components/mallwelcomestorecard/MallWelcomeStoreCard";
import { MallNavbar } from "../../components";
import { ACCEPT_HEADER, get_mall_master } from "../../utils/Constant";
import axios from "axios";

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

const MallHomePage = () => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { is_login, is_token, logoutUser } = useMallContext();
  const { setLogin } = useAuthContext();

  const [profile, setProfile] = useState("");

  const { setMallRegister } = useAuthContext();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [getmallname, setMallname] = useState("");
  const [getvat_no, setvat_no] = useState("");
  const [getearh_no, setearh_no] = useState("");
  const [getfirstname, setFirstname] = useState("");
  const [getlastname, setLastname] = useState("");
  const [getemail, setEmail] = useState("");
  const [getpassword, setPassword] = useState("");
  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [modalIsOpen3, setIsOpen3] = useState(false);

  const SigninCustomerGoogle = async (gmail, type, data) => {
    if (gmail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(gmail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else {
      var params = {
        role: 2,
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

  const SigninCustomerFacebook = async (fdata, type) => {
    var params = {
      role: 2,
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

  // function logout() {
  //   localStorage.clear();
  //   window.location.reload(false);
  //   navigate("/");
  // }

  let navigate = useNavigate();

  const mallLoginModalOpen = () => {
    setIsOpen(false);
    setIsOpen3(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  const onHandleEmailChange = (e) => {
    let email = e.target.value;

    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  // terms checkbox funtion

  const handleTermChange = (e) => {
    setIsAcceptTerm(1);
    console.log("e.targate.value");
  };

  const SigninMall = async (type) => {
    if (getvat_no === "") {
      alert("Enter the VAT No......!");
      return;
    } else if (getearh_no === "") {
      alert("Enter the earh No......!");
      return;
    } else if (getfirstname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getlastname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getemail === "") {
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
        mall_master_id: getmall,
        vat_no: getvat_no,
        earh_no: getearh_no,
        role: 2,
        email: getemail,
        password: getpassword,
        first_name: getfirstname,
        last_name: getlastname,
        terms_condition: isAcceptTerm,
      };

      console.log("-=-=-=->", params);
      const data = await setMallRegister(params);
      if (data) {
        if (data.success === 1) {
          console.log("register-data", data);
          setIsOpen(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  useEffect(() => {
    getMallMaster();
  }, []);

  const [getmallarray, SetMallArray] = useState([]);
  const [getmall, SetMall] = useState("");

  const getMallMaster = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_mall_master, {
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

  // Mall Login

  const LoginMall = async (e) => {
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
        role: 2,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      console.log("-=-=-=->", params);
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          console.log("mall-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/profile-page");
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Mall Home Screen</title>
      </Helmet>
      {/* <Navbar
      // setCustomerDropdown={setCustomerDropdown}
      // getcustomerDropdown={getcustomerDropdown}
      /> */}
      <MallNavbar />

      <div>
        {/* <HomeHero img={images.mall_home_hero_banner} /> */}
        {/* hero start */}
        <div
          className="about_hero_wrapp"
          style={{
            backgroundImage: `url(${images.mall_home_page})`,
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
                for malls
              </p>
              <button
                className="btn btn-black"
                style={{ width: "auto" }}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Register your mall
              </button>
              {/* <div className="apps_logos_wrapp">
                  <img src={images.play_store_logo} alt='play store logo' />
                  <img src={images.app_store_logo} alt='app store logo' />
                </div> */}
            </div>
          </div>
        </div>
        {/* hero end */}
        <MallWelcomeStoreCard
          WcBtn={true}
          titie={"Welcome to In-store mall owners"}
          des={
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip."
          }
        />
        <WhayJoin />
        {/* about in store register part-1 start*/}
        <div className="main_wrapp registermall_main_wrapp bg-pink">
          <div className="container registermall_base_wrapp">
            <div className="registermall_sec1">
              <h2 className="h2">
                Malls Have More
                <br /> Presence
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo.
              </p>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Register your mall
              </button>
            </div>
            <div className="registermall_sec2">
              <img src={images.about_1} alt="" />
            </div>
          </div>
        </div>
        {/* about in store register part-1 end*/}
      </div>

      {/* Register Modal */}

      <ReactModal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="home_model_4wrapp">
          <button className="signup_modal_close" onClick={closeModal}>
            <GrClose />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Register Your Mall
          </button>
          <div className="sign_input_wrapp">
            <label htmlFor="mall">Mall Name</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                SetMall(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option selected disabled value=""></option>
              {getmallarray &&
                getmallarray.map((item, index) => {
                  return (
                    <>
                      {/* <option selected disabled value=""></option> */}
                      <option value={item.id} key={index}>
                        {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                        &nbsp;&nbsp;&nbsp; {item.to_date}
                      </option>
                    </>
                  );
                })}
            </select>
            {/* <input
              type="text"
              value={getmallname}
              onChange={(e) => setMallname(e.target.value)}
              name=""
              id=""
            /> */}
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="mall">VAT Number</label>
            <input
              type="text"
              value={getvat_no}
              onChange={(e) => setvat_no(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="mall">Earh Number</label>
            <input
              type="text"
              value={getearh_no}
              onChange={(e) => setearh_no(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              value={getlastname}
              onChange={(e) => setLastname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              onChange={(e) => onHandleEmailChange(e)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="password">Password</label>
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
              checked={isAcceptTerm === 1}
            />
            <p className="fs-des">
              I have read and agree to the{" "}
              <a className="signup_terms_link">Terms and Conditions</a> &{" "}
              <a className="signup_terms_link">Privacy Policy</a>
            </p>
          </div>
          <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm === 1 ? false : true}
            onClick={() => SigninMall()}
          >
            Register
          </button>
          <p style={{ color: "black", fontWeight: "600", marginBottom: "5px" }}>
            OR
          </p>
          <p className="fs-des">
            If you are already registered, then{" "}
            <span
              onClick={() => mallLoginModalOpen()}
              className="signup_terms_link"
            >
              login here
            </span>
          </p>
        </div>
      </ReactModal>

      {/* Mall Login Modal start*/}
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
              onChange={(e) => onHandleEmailChange(e)}
              name=""
              id=""
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
            onClick={() => LoginMall()}
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
              setIsOpen(true);
            }}
            className="btn btn-blue"
          >
            Register your mall
          </button>
        </div>
      </ReactModal>

      {/* {/Mall Login Modal end/} */}
    </>
  );
};

export default MallHomePage;