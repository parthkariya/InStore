import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import images from '../../constants/images';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { useAuthContext } from '../../context/auth_context';
import { useMallContext } from '../../context/mall_context';
import { useStoreContext } from '../../context/store_context';
import ReactModal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import Urls from '../../utils/Urls';
import { FaFacebookF } from 'react-icons/fa';
import { ImGoogle } from 'react-icons/im';
import { ACCEPT_HEADER, get_mall } from '../../utils/Constant';
import axios from 'axios';

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

const RetailerNavbar = ({ setTab }) => {

    let navigate = useNavigate();
    const location = useLocation();
    const { setLogin } = useAuthContext();




    const [getcustomerDropdown, setCustomerDropdown] = useState(false);
    const [getregisterCustomerOpen, setRegisterCustomerOpen] = useState(false);
    const [modalIsOpen3, setIsOpen3] = useState(false);
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



    const [getrole, setrole] = useState();
    const [login, SetLogin] = useState('')

    const regEx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function logout() {
        localStorage.clear();

        navigate("/retailer");
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

    const token = async () => {
        console.log("is_token", await localStorage.getItem("is_token"));

        const login = await localStorage.getItem("is_token");
        if (login) {
            SetCondation(true);
        } else {
            SetCondation(false);
        }
    };

    const brandLoginModalOpen = () => {
        setModalIsOpenBrand(false);
        setIsOpen3(true);
    };

    function closeModalBrand() {
        setModalIsOpenBrand(false);
    }

    function closeModal3() {
        setIsOpen3(false);
    }

    const handleTermChange = (event) => {
        setIsAcceptTerm((current) => !current);
    };

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

    useEffect(() => {
        console.log("brand registration mall", getmallarray);

    }, [])



    return (
        <>
            <nav className="nav_main_wrapp">
                <div className="container">
                    <div className="nav_base_wrapp">
                        <Link to={"/"}>
                            <img src={images.brandlogo} alt="logo" className="nav_logo" />
                        </Link>
                        <div className="nav-links-mall">
                            <Link to={"/"} style={{ color: location.pathname === "/" ? "#ff8b00" : "black", fontWeight: location.pathname === "/" ? "600" : "400" }}>Home</Link>
                            <NavLink to={"/about-instore"} style={{ color: location.pathname === "/about-instore" ? "#ff8b00" : "black", fontWeight: location.pathname === "/about-instore" ? "600" : "400" }}>About InStore</NavLink>
                            {/* <Link
                            // onClick={() => setIsOpen(true)}
                            to={"/mall"}
                            style={{ color: location.pathname === "/mall" ? "#ff8b00" : "black", fontWeight: location.pathname === "/mall" ? "600" : "400" }}
                        >
                            Mall Registration
                        </Link> */}

                            {/* <Link
                            // onClick={() => setModalIsOpenBrand(true)}
                            to={"/retailer"}
                            style={{ color: location.pathname === "/retailer" ? "#ff8b00" : "black", fontWeight: location.pathname === "/retailer" ? "600" : "400" }}
                        >
                            Brand Registration
                        </Link> */}
                            <div className="nav_myacc_wrapp">
                                <Link>
                                    <img
                                        src={images.profile_logo}
                                        alt=""
                                        className="nav_profile"
                                    />
                                </Link>
                                <Link
                                    to={""}
                                    onClick={() => setCustomerDropdown(!getcustomerDropdown)}
                                >
                                    Account{" "}
                                    {getcustomerDropdown ? <BsChevronUp /> : <BsChevronDown />}
                                </Link>
                                {getcustomerDropdown ? (
                                    <>
                                        <div className="navbar-acc-menu-open-warapp">
                                            {login === false || login === null ?
                                                <>
                                                    <Link to="/mall"
                                                        className="navbar-acc-menu-link"
                                                    // onClick={() => { setTab(1) }}
                                                    >
                                                        Mall
                                                    </Link>
                                                    <Link to="/retailer"
                                                        className="navbar-acc-menu-link"
                                                    // onClick={() => { setTab(2) }}
                                                    >
                                                        Brand
                                                    </Link>
                                                    <Link to="/customer"
                                                        className="navbar-acc-menu-link"
                                                    // onClick={() => { setTab(2) }}
                                                    >
                                                        Customer
                                                    </Link>
                                                    <Link
                                                        className="navbar-acc-menu-link"
                                                        onClick={() => setIsOpen3(true)}
                                                    >
                                                        Login
                                                    </Link>
                                                    {/* {is_login === true || role === 4 ? <Link to="/customer"
                                            className="navbar-acc-menu-link"
                                        >
                                           
                                                <Link className="navbar-acc-menu-link">Help</Link>
                                                {/* {is_login === true ? (<><Link onClick={logout}>Logout</Link></>) : (<></>)} */}

                                                    {login === 'true' ?
                                                        <button style={{ textAlign: 'start' }} onClick={logout}>Logout</button>
                                                        : null}
                                                    <Link className="navbar-acc-menu-link">Help</Link>

                                                </>
                                                :
                                                <>
                                                    {getrole == 3 ? <></> : null}

                                                    <Link to="/branddashboard"
                                                        className="navbar-acc-menu-link"
                                                    >
                                                        Brand Dashboard
                                                    </Link>
                                                    <Link to=""
                                                        className="navbar-acc-menu-link"
                                                        onClick={() => { setTab(1) }}
                                                    >
                                                        My Profile
                                                    </Link>
                                                    <Link to=""
                                                        className="navbar-acc-menu-link"
                                                        onClick={() => { setTab(2) }}
                                                    >
                                                        Account Setting
                                                    </Link>
                                                    {/* {is_login === true || role === 4 ? <Link to="/customer"
                                            className="navbar-acc-menu-link"
                                        >
                                            Customer
                                        </Link> : <Link to="/"
                                            className="navbar-acc-menu-link"
                                        >
                                            Customer
                                        </Link>} */}
                                                    <Link to=""
                                                        className="navbar-acc-menu-link"
                                                        onClick={() => { setTab(2) }}
                                                    >
                                                        &nbsp;&nbsp;-Leaderboard Banner
                                                    </Link>
                                                    <Link
                                                        className="navbar-acc-menu-link"
                                                        onClick={() => { setTab(4) }}
                                                    >
                                                        &nbsp;&nbsp;-Promotional Banner
                                                    </Link>
                                                    <Link
                                                        className="navbar-acc-menu-link"
                                                        onClick={() => { setTab(5) }}
                                                    >
                                                        &nbsp;&nbsp;-Product Banner
                                                    </Link>
                                                    <Link className="navbar-acc-menu-link" onClick={() => { setTab(6) }}>&nbsp;&nbsp;-Product Tiles</Link>
                                                    <Link className="navbar-acc-menu-link" onClick={() => { setTab(7) }}>&nbsp;&nbsp;-Track analytics</Link>
                                                    <Link className="navbar-acc-menu-link">My Brand in mall</Link>
                                                    <Link className="navbar-acc-menu-link">Help</Link>
                                                    {/* {is_login === true ? (<><Link onClick={logout}>Logout</Link></>) : (<></>)} */}
                                                    {login === 'true' ?
                                                        <button style={{ textAlign: 'start' }} onClick={logout}>Logout</button>
                                                        : null}
                                                </>}

                                        </div>
                                    </>
                                ) : null}
                                {/* <div style={{ position: 'relative' }}>
                                <Link to=""><img src={images.cart_icon} className="cart-icon-img" /></Link>
                                <div className="cart-digit-main">0</div>
                            </div> */}
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
                            {login === 'true' && getrole == 2 ? <Link to="/profile-page"
                                className="navbar-acc-menu-link"
                            >
                                Mall Dashboard
                            </Link> : null}

                            {login === 'true' && getrole == 3 ? <Link to="/branddashboard"
                                className="navbar-acc-menu-link"
                            >
                                Brand Dashboard
                            </Link> : null}

                            {login === 'true' && getrole == 4 ? <Link to="/mallnearme"
                                className="navbar-acc-menu-link"
                            >
                                Mall Near Me
                            </Link> : null}

                            <Link to="/about-instore">About InStore</Link>
                            <Link to="/Mall">Mall Registration</Link>
                            <Link to="/customer">Customer Registraion</Link>
                            {login === "true" || getrole === 2 ? <></> : <Link onClick={() => { setIsOpen3(true); setSidebarOpen(!getsidebarOpen); }}>Login</Link>}
                            {/* <Link to="/mall">Mall </Link> */}
                            {/* <Link to="/retailer">Brand Registration</Link> */}
                            {/* {getcondation === false ? (
                <Link onClick={() => setIsOpen2(true)}>Sign Up</Link>
              ) : null} */}

                            {/* {getcondation === true ? ( */}
                            {/* {is_login === true || role === 2 ? ( */}
                            {login === "true" || getrole === 2 ? (<>

                                <Link onClick={() => setAccountOpen(!getaccountOpen)}>
                                    My Account{" "}
                                    {getaccountOpen ? <BsChevronUp /> : <BsChevronDown />}
                                </Link>
                            </>) : null}

                            {/* ) : null} */}

                            {/* ) : null} */}
                            {/* <Link onClick={logout}>
                <IoIosLogOut size={20} />
              </Link> */}
                            {getaccountOpen && (
                                <>

                                    {login === 'true' && getrole == 3 ? (
                                        <div className="accunt_sec_wrapp">
                                            <Link onClick={() => { setTab(1); setSidebarOpen(!getsidebarOpen); }}>My Profile</Link>
                                            <Link onClick={() => { setTab(2); setSidebarOpen(!getsidebarOpen); }}>Acccount Setting</Link>
                                            <Link onClick={() => { setTab(3); setSidebarOpen(!getsidebarOpen); }}>Leaderboard Banners</Link>
                                            <Link onClick={() => { setTab(4); setSidebarOpen(!getsidebarOpen); }}>Promotional Banners</Link>
                                            <Link onClick={() => { setTab(5); setSidebarOpen(!getsidebarOpen); }}>Product Banners</Link>
                                            <Link onClick={() => { setTab(6); setSidebarOpen(!getsidebarOpen); }}>Product Tiles</Link>
                                            <Link onClick={() => { setTab(7); setSidebarOpen(!getsidebarOpen); }}>Track analytics</Link>
                                            <Link onClick={() => { setSidebarOpen(!getsidebarOpen); }}>My Brand in mall</Link>
                                            <Link onClick={() => { setSidebarOpen(!getsidebarOpen); }}>Help</Link>
                                            {login === "true" ? (<Link onClick={logout}>Logout</Link>) : (<></>)}
                                            {/* <Link onClick={() => setTab(8)}></Link> */}

                                            {/* <Link onClick={() => setRegisterCustomerOpen(true)}>Sign Up</Link> */}
                                            {/* <Link onClick={() => { setIsOpen(true); setSidebarOpen(!getsidebarOpen); }}>Sign Up</Link> */}

                                            {/* <Link>Help</Link> */}


                                            {/* <Link> - Events</Link>
                  <Link> - Facilities</Link>
                  <Link> Contact Details</Link> */}
                                        </div>
                                    ) : <>
                                        <Link onClick={() => { setSidebarOpen(!getsidebarOpen); }}>Help</Link>
                                        {login === "true" ? (<Link onClick={logout}>Logout</Link>) : (<></>)}
                                    </>}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>

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
                        <button className="signup_model_forgate">Forgot password?</button>
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
                            setModalIsOpenBrand(true);
                        }}
                        className="btn btn-blue"
                    >
                        Register Your Brand
                    </button>
                </div>
            </ReactModal>
            {/* Brand Login Modal End */}



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
                            console.log("retailertype is", retailertype);
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

        </>
    )
}

export default RetailerNavbar