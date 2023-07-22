import React, { useEffect, useState } from "react";
import "./Navbar.css";
import images from "../../constants/images";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { ImGoogle } from "react-icons/im";
import { AiOutlineClose, AiOutlineGoogle } from "react-icons/ai";
import { useMallContext } from "../../context/mall_context";
import FacebookLogin from "react-facebook-login";
import ReactModal from "react-modal";
import {
  GrClose,
  GrFacebook,
  GrFacebookOption,
  GrGoogle,
} from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  IResolveParams,
} from "reactjs-social-login";
import Urls from "../../utils/Urls";
import { useAuthContext } from "../../context/auth_context";

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
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
};

const Navbar = ({
  getcustomerDropdown,
  setCustomerDropdown,
  // setRegisterCustomerOpen,
}) => {
  const location = useLocation();

  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [modalIsOpenBrand, setModalIsOpenBrand] = useState(false);
  const [getregisterCustomerOpen, setRegisterCustomerOpen] = useState(false);


  const [getmallname, setMallname] = useState("");
  const [getfirstname, setFirstname] = useState("");
  const [getlastname, setLastname] = useState("");
  const [getRegion, setRegion] = useState("");
  const [getemail, setEmail] = useState("");
  const [getpassword, setPassword] = useState("");
  const [getsidebarOpen, setSidebarOpen] = useState(false);
  const [getaccountOpen, setAccountOpen] = useState(false);
  const [getcondation, SetCondation] = useState(false);
  const [profile, setProfile] = useState("");
  const [isAcceptTerm, setIsAcceptTerm] = useState(false);
  const [isAcceptTermRegisterCustomer, setIsAcceptTermRegisterCustomer] = useState(false);
  const [getrole, setrole] = useState();
  const [login, SetLogin] = useState('')

  const { setMallRegister, is_login, is_token, logoutUser, role } = useMallContext();
  const { RegisterCustomer } = useAuthContext();

  const { setLogin } = useAuthContext();

  let navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  // const redirect = "http://localhost:3000/account/login";

  function logout() {
    localStorage.clear();
    navigate("/customer");

    window.location.reload(false);
  }

  useEffect(() => {
    token();
    console.log("profile", profile);
    let role = localStorage.getItem("role");
    setrole(role);
    var islogin = localStorage.getItem("is_login")
    SetLogin(islogin)
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
  };
  const onLoginStart = () => {
    // console.log("Start");
  };

  const componentClicked = (click) => {
    console.log(click);
  };

  const token = async () => {
    console.log("is_token", await localStorage.getItem("is_token"));

    const login = await localStorage.getItem("is_token");
    if (login) {
      SetCondation(true);
    } else {
      SetCondation(false);
    }
  };

  const onHandleEmailChange = (e) => {
    let email = e.target.value;

    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  const SigninCustomerGoogle = async (gmail, type, data) => {
    if (gmail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(gmail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else {
      var params = {
        role: 4,
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
      role: 4,
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

  const SigninCustomer = async (type) => {
    // if (getmallname === "") {
    //   alert("Enter the Mall Name......!");
    //   return;
    // }
    if (getfirstname === "") {
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
        role: 4,
        email: getemail,
        password: getpassword,
        name: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
      };

      console.log("-=-=-=->", params);
      const data = await RegisterCustomer(params);
      if (data) {
        if (data.success === 1) {
          console.log("register-data", data);
          // setIsOpen(false);
          // setIsOpen3(true);
          setRegisterCustomerOpen(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };


  // Mall Signup Google/facebook

  const SigninMallGoogle = async (gmail, type, data) => {
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

  const SigninMallFacebook = async (fdata, type) => {
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

  const SigninMall = async (type) => {
    if (getmallname === "") {
      alert("Enter the Mall Name......!");
      return;
    }
    else if (getfirstname === "") {
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
        role: 2,
        email: getemail,
        password: getpassword,
        name: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
      };

      console.log("-=-=-=->", params);
      const data = await RegisterCustomer(params);
      if (data) {
        if (data.success === 1) {
          console.log("register-data", data);
          setIsOpen(false);
          setIsOpen3(true);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  const LoginCustomer = async (e) => {
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
        role: 4,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      console.log("-=-=-=->", params);
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          console.log("customer-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/mallnearme")
        }
      }
    }
  };

  // terms checkbox funtion

  const handleTermChange = (event) => {
    setIsAcceptTerm((current) => !current);
  };
  const handleTermChangeRegisterCustomerNavbar = (event) => {
    setIsAcceptTermRegisterCustomer((current) => !current);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  function closeModal4() {
    setIsOpen4(false);
  }
  function closeModalRegisterNavbar() {
    setRegisterCustomerOpen(false);
  }

  function closeModalBrand() {
    setModalIsOpenBrand(false);
  }

  return (
    <>
      <nav className="nav_main_wrapp">
        <div className="container">
          <div className="nav_base_wrapp">
            <Link to={"/"}>
              <img src={images.brandlogo} alt="logo" className="nav_logo" />
            </Link>
            <div className="nav_links">
              <Link to={"/"} style={{ color: location.pathname === "/" ? "#ff8b00" : "black", fontWeight: location.pathname === "/" ? "600" : "400" }}>Home</Link>
              <NavLink to={"/about-instore"} style={{ color: location.pathname === "/about-instore" ? "#ff8b00" : "black", fontWeight: location.pathname === "/about-instore" ? "600" : "400" }}>About InStore</NavLink>
              <Link
                // onClick={() => setIsOpen(true)}
                to={"/mall"}
                style={{ color: location.pathname === "/mall" ? "#ff8b00" : "black", fontWeight: location.pathname === "/mall" ? "600" : "400" }}
              >
                Mall Registration
              </Link>

              <Link
                // onClick={() => setModalIsOpenBrand(true)}
                to={"/retailer"}
                style={{ color: location.pathname === "/retailer" ? "#ff8b00" : "black", fontWeight: location.pathname === "/retailer" ? "600" : "400" }}
              >
                Brand Registration
              </Link>
              <div className="nav_myacc_wrapp">
                <Link>
                  <img
                    src={images.profile_logo}
                    alt=""
                    className="nav_profile"
                  />
                </Link>
                <Link
                  to={"/customer"}
                  onClick={() => setCustomerDropdown(!getcustomerDropdown)}
                >
                  Account{" "}
                  {getcustomerDropdown ? <BsChevronUp /> : <BsChevronDown />}
                </Link>
                {getcustomerDropdown ? (
                  <>
                    <div className="navbar-acc-menu-open-warapp">

                      <Link to="/mall"
                        className="navbar-acc-menu-link"
                      >
                        Mall Registration
                      </Link>
                      <Link to="/retailer"
                        className="navbar-acc-menu-link"
                      >
                        Brand Registration
                      </Link>
                      {/* {is_login === true || role === 4 ? <Link to="/customer"
                        className="navbar-acc-menu-link"
                      >
                        Customer
                      </Link> : <Link to="/"
                        className="navbar-acc-menu-link"
                      > */}
                      {/* Customer */}
                      {/* </Link>} */}
                      <Link to="/customer"
                        className="navbar-acc-menu-link"
                      >
                        Customer
                      </Link>
                      {login === false || login === null ?
                        <Link
                          className="navbar-acc-menu-link"
                          onClick={() => setIsOpen3(true)}
                        >
                          Login
                        </Link>
                        : null}
                      {login === false || login === null ?
                        <Link
                          className="navbar-acc-menu-link"
                          onClick={() => setRegisterCustomerOpen(true)}
                        >
                          Sign Up
                        </Link> : null}
                      {/* <Link className="navbar-acc-menu-link">My profile</Link> */}
                      <Link className="navbar-acc-menu-link">Help</Link>
                      {/* {is_login === true ? (<><Link onClick={logout}>Logout</Link></>) : (<></>)} */}
                      {login === 'true' ?
                        <button style={{ textAlign: 'start' }} onClick={logout}>Logout</button>
                        : null}
                    </div>
                  </>
                ) : null}
              </div>
              {/* {getcondation === false ? (
                <Link onClick={() => setIsOpen3(true)}>
                  Sign Up <BsChevronDown />
                </Link>
              ) : null}
              {getcondation && (
                <>
                  <div className="nav_myacc_wrapp">
                    <Link>
                      <img
                        src={images.profile_logo}
                        alt=""
                        className="nav_profile"
                      />
                    </Link>
                    <Link
                      to={"/profile-page"}
                      onClick={() => setAccountOpen(!getaccountOpen)}
                    >
                      My Account
                      {getaccountOpen ? <BsChevronUp /> : <BsChevronDown />}
                    </Link>
                    {getaccountOpen ? (
                      <>
                        <div className="navbar-acc-menu-open-warapp">
                          <Link className="navbar-acc-menu-link">Login</Link>
                          <Link className="navbar-acc-menu-link">Sign Up</Link>
                          <Link className="navbar-acc-menu-link">
                            My profile
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            Account Setting
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Leaderboard Banners
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Promotional Banners
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Product Banners
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Product Tiles
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Track Analytics
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            My Brand in malls
                          </Link>
                          <Link className="navbar-acc-menu-link">Help</Link>
                          <Link className="navbar-acc-menu-link">Logout</Link>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <Link onClick={logout}>
                    <IoIosLogOut size={20} />
                  </Link>
                </>
              )} */}
            </div>

            <button
              className="sidebar_logo"
              onClick={() => {
                setSidebarOpen(!getsidebarOpen);
                setAccountOpen(false);
              }}
            >
              {getsidebarOpen ? (
                <IoClose size={30} color="#000" />
              ) : (
                <img src={images.side_logo} alt="" />
              )}
            </button>
          </div>
          {getsidebarOpen && (
            <div className="nav_sidebar_wrapp">
              <Link to="/">Home</Link>
              <Link to="/about-instore">About InStore</Link>
              {/* <Link to="/mall">Mall </Link> */}
              <Link to="/mall">Mall Registration</Link>
              <Link to="/retailer">Brand Registration</Link>

              {/* {getcondation === false ? (
                <Link onClick={() => setIsOpen2(true)}>Sign Up</Link>
              ) : null} */}

              {/* {getcondation === true ? ( */}
              <>
                <Link onClick={() => setAccountOpen(!getaccountOpen)}>
                  My Account{" "}
                  {getaccountOpen ? <BsChevronUp /> : <BsChevronDown />}
                </Link>
              </>
              {/* ) : null} */}
              {/* <Link onClick={logout}>
                <IoIosLogOut size={20} />
              </Link> */}
              {getaccountOpen && (
                <div className="accunt_sec_wrapp">
                  <Link onClick={() => setIsOpen3(true)}>Login</Link>
                  {/* <Link onClick={() => setRegisterCustomerOpen(true)}>Sign Up</Link> */}
                  {/* <Link onClick={() => modalIsOpen(true)}>Sign Up</Link> */}
                  <Link
                    className="navbar-acc-menu-link"
                    onClick={() => setRegisterCustomerOpen(true)}
                  >
                    Sign Up
                  </Link>
                  <Link>Help</Link>
                  {login === 'true' ? (<Link style={{ textAlign: "end", alignSelf: "end" }} onClick={logout}>Logout</Link>) : (<></>)}
                  {/* <Link onClick={logout}>Logout</Link> */}

                  {/* <Link> - Events</Link>
                  <Link> - Facilities</Link>
                  <Link> Contact Details</Link> */}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {/* model 1 */}
      {/* <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="home_model_wrapp">
          <div className="home_model_1sec">
            <h4 className="h4">Hi, nice to meet you!</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut
              quidem voluptatibus.
            </p>
            <button
              className="btn btn1"
              onClick={() => {
                setIsOpen(false);
                setIsOpen2(true);
              }}
            >
              YES
            </button>
            <button className="btn btn1" style={{ opacity: "0.8" }}>
              No
            </button>
            <a href="">Learn More</a>
          </div>
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-laughing-young-woman-royalty-free-image-1592844146.jpg?crop=0.668xw:1.00xh;0.167xw,0"
            alt=""
            className="home_model_2sec"
          />
        </div>
      </ReactModal> */}

      {/* Login model */}
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
            onClick={() => LoginCustomer()}
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
              onLoginStart={onLoginStart}
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
              // setIsOpen(true)
              setRegisterCustomerOpen(true);
            }}
            className="btn btn-blue"
          >
            Sign up
          </button>
        </div>
      </ReactModal>

      {/* model 4 */}
      <ReactModal
        isOpen={modalIsOpen4}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal4}
        style={customStyles}
      >
        <div className="home_model_4wrapp">
          <button className="signup_modal_close" onClick={closeModal4}>
            <GrClose />
          </button>
          <button className="btn btn4 mb_16">Forgate your password?</button>
          <div className="sign_input_wrapp">
            <label htmlFor="email">Email</label>
            <input type="email" name="" id="" />
          </div>
          <button className="btn btn3 mb_16">Submit</button>
          <h6 className="h6 mb_8">
            If you already have an account, click the button below to log in.
          </h6>
          <button className="btn btn4 mb_8">Login</button>
          <h6 className="h6 mb_8">or</h6>

          {/* <FacebookLogin
            appId="1377758369684897" //APP ID NOT CREATED YET
            fields="name,email,picture"
            // autoLoad={true}
            onClick={componentClicked}
            callback={responseFacebook}
          /> */}
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
              className="btn btn5 mb_8 modal-social-btn"
              style={{
                justifyContent: "flex-start",
                gap: "25%",
                width: "100%",
              }}
            >
              <FaFacebookF />
              Continue with Facebook
            </button>
          </LoginSocialFacebook>
          {/* <button
            className="btn btn5 mb_8 modal-social-btn "
            style={{ justifyContent: "flex-start", gap: "25%" }}
          >
            <FaFacebookF />
            Continue with Facebook
          </button> */}
          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GG_APP_ID}
            onLoginStart={onLoginStart}
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
              className="btn btn5 mb_8 modal-social-btn"
              style={{ justifyContent: "flex-start", gap: "25%" }}
            >
              <GrGoogle style={{}} />
              Continue with Google
            </button>
            {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
          </LoginSocialGoogle>
        </div>
      </ReactModal>

      {/* Register Mall */}

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
            <input
              type="text"
              value={getmallname}
              onChange={(e) => setMallname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="mall">VAT Number</label>
            <input
              type="number"
              // value={getmallname}
              // onChange={(e) => setMallname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="mall">Earh Number</label>
            <input
              type="number"
              // value={getmallname}
              // onChange={(e) => setMallname(e.target.value)}
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
            <label htmlFor="last-name">Enter Region</label>
            <input
              type="text"
              value={getRegion}
              onChange={(e) => setRegion(e.target.value)}
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
            onClick={() => SigninMall()}
          >
            Register
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
                SigninMallFacebook(data, "2");
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
              onLoginStart={onLoginStart}
              redirect_uri={Urls.base_url}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ data }: IResolveParams) => {
                setProfile(data);
                console.log("gdata", data);
                // registerWithGoogle(data);
                // registerWithGoogle(data);
                SigninMallGoogle(data.email, "2", data);
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
        </div>
      </ReactModal>



      {/* Register Customer modal */}
      <ReactModal
        isOpen={getregisterCustomerOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="home_model_4wrapp">
          <button className="signup_modal_close" onClick={closeModalRegisterNavbar}>
            <GrClose />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Hi, nice to meet you!
          </button>
          <div className="sign_input_wrapp">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
              autoFocus="true"
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => onHandleEmailChange(e)}
              name=""
              id=""
            />
          </div>

          {/* <div className="sign_input_wrapp">
                        <label htmlFor="email">Region</label>
                        <select
                            className="leaderboard-card-inp"
                            onChange={(e) => {
                                setRegion(e.target.value);
                                console.log(e.target.value);
                            }}
                        >
                            <option value="" selected disabled>
                                Select Region
                            </option>

                            {region_data &&
                                region_data.map((itm, ind) => {
                                    return (
                                        <option key={itm.id} value={itm.id}>
                                            {itm.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div> */}

          <div className="sign_input_wrapp">
            <label htmlFor="password">Set a password</label>
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
          {/* <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm === 1 ? false : true}
            onClick={() => {
              console.log("bsdjhfgsjfhjksdfg");
              SigninCustomer();
            }}
          >
            Register
          </button> */}

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
                SigninCustomerFacebook(data, "4");
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
              onLoginStart={onLoginStart}
              redirect_uri={Urls.base_url}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ data }: IResolveParams) => {
                setProfile(data);
                console.log("gdata", data);
                // registerWithGoogle(data);
                // registerWithGoogle(data);
                SigninCustomerGoogle(data.email, "4", data);
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

            <p style={{ marginTop: "10px", textAlign: "center", marginBottom: "20px" }}>Already have an account?</p>

            <button
              onClick={() => {
                setRegisterCustomerOpen(false);
                setIsOpen3(true);
              }}
              className="btn btn-blue"
              style={{ marginBottom: "20px" }}
            >
              Sign in
            </button>
          </div>
        </div>
      </ReactModal>


    </>
  );
};

export default Navbar;
