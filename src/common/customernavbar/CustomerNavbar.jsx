import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import images from '../../constants/images'
import "./CustomerNavbar.css"
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useMallContext } from '../../context/mall_context'
import { useAuthContext } from '../../context/auth_context'
import { AiFillHeart } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import ReactModal from 'react-modal'
import { GrClose } from 'react-icons/gr'

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

const CustomerNavbar = ({ setTab }) => {

    const regEx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [modalIsOpen3, setIsOpen3] = useState(false);
    const [modalIsOpen4, setIsOpen4] = useState(false);
    const [modalIsOpenBrand, setModalIsOpenBrand] = useState(false);

    const [getcustomerDropdown, setCustomerDropdown] = useState(false);
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
    const [getrole, setrole] = useState();
    const [login, SetLogin] = useState('')

    const { setMallRegister, is_login, is_token, logoutUser, role } = useMallContext();

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
        if (getmallname === "") {
            alert("Enter the Mall Name......!");
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
                role: 4,
                email: getemail,
                password: getpassword,
                name: getmallname,
                first_name: getfirstname,
                last_name: getlastname,
            };

            console.log("-=-=-=->", params);
            const data = await setMallRegister(params);
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
                    navigate("/customerdashboard")
                }
            }
        }
    };

    // terms checkbox funtion

    const handleTermChange = (event) => {
        setIsAcceptTerm((current) => !current);
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

    function closeModalBrand() {
        setModalIsOpenBrand(false);
    }


    const location = useLocation();
    return (
        <>
            <div className="cus-nav-main">
                <nav className="nav_main_wrapp">
                    <div className="" style={{ width: "100%" }}>
                        <div className="nav_base_wrapp cus-nav-logo-after">

                            <Link to={"/"}>
                                <img src={images.brandlogo} alt="logo" className="nav_logo" />

                            </Link>
                            <div className="cus-nav-links">
                                <Link to={"/about-instore"} style={{ color: location.pathname === "/about-instore" ? "#ff8b00" : "black", fontWeight: location.pathname === "/about-instore" ? "600" : "400" }}>About In-store</Link>
                                <Link to={"/mallnearme"} style={{ color: location.pathname === "/mallnearme" ? "#ff8b00" : "black", fontWeight: location.pathname === "/mallnearme" ? "600" : "400" }}>Malls near me</Link>
                                {/* <NavLink to={"/about-instore"} style={{ color: location.pathname === "/about-instore" ? "#ff8b00" : "black", fontWeight: location.pathname === "/about-instore" ? "600" : "400" } */}
                                <div className="cus-nav-filter-flex">
                                    {/* single text-input */}
                                    <div className="mm_form_single_input" style={{ gap: "7px" }}>
                                        <label className="leaderboard-card-lbl" style={{ minWidth: "65px" }}>Filter by:</label>
                                        <select
                                            className="leaderboard-card-inp" style={{ width: "180px" }}
                                        // onChange={(e) => SetRegionId(e.target.value)}
                                        >
                                            <option selected disabled value="">
                                                Select region
                                            </option>
                                            <option value="1">ONE SIZE</option>
                                            <option value="2">TWO SIZE</option>
                                            <option value="3">THREE SIZE</option>
                                        </select>
                                    </div>
                                </div>

                                <input type="text" className="cus-nav-search leaderboard-card-inp" placeholder="Search " />

                                <div className="nav_myacc_wrapp" style={{ marginLeft: "0px" }}>
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

                                                <Link to="/profile-page"
                                                    className="navbar-acc-menu-link"
                                                >
                                                    Mall
                                                </Link>
                                                <Link to="/retailer"
                                                    className="navbar-acc-menu-link"
                                                >
                                                    Brand
                                                </Link>
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


                                <button onClick={() => setTab(8)} className="cus-nav-wishlist-icon-part">
                                    <AiFillHeart className='cus-nav-wishlist-icon' />
                                </button>

                            </div>

                            <button
                                className="sidebar_logoo"
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
                                        {login === "true" || getrole === 4 ? <></> : <Link onClick={() => setIsOpen3(true)}>Login</Link>}
                                        {/* <Link onClick={() => setRegisterCustomerOpen(true)}>Sign Up</Link> */}
                                        <Link onClick={() => modalIsOpen(true)}>Sign Up</Link>


                                        <Link to="/mallnearme">Malls near me</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(2); setSidebarOpen(!getsidebarOpen); }}>Promotion</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(3); setSidebarOpen(!getsidebarOpen); }}>Brands</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(4); setSidebarOpen(!getsidebarOpen); }}>Eateries</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(28); setSidebarOpen(!getsidebarOpen); }}>Movies</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(5); setSidebarOpen(!getsidebarOpen); }}>Events</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(29); setSidebarOpen(!getsidebarOpen); }}>Mall Map</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(6); setSidebarOpen(!getsidebarOpen); }}>Facilities</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(8); setSidebarOpen(!getsidebarOpen); }}>My wishlist</Link>
                                        <Link to="/customerdashboard" onClick={() => { setTab(9); setSidebarOpen(!getsidebarOpen); }}>Account Settings</Link>

                                        <Link>Help</Link>
                                        {login === 'true' ? (<Link onClick={logout}>Logout</Link>) : (<></>)}

                                        {/* <Link> - Events</Link>
                  <Link> - Facilities</Link>
                  <Link> Contact Details</Link> */}
                                    </div>
                                )}
                            </div>
                        )
                        }
                    </div >
                </nav >
            </div>

            {/* Register Customer modal */}
            <ReactModal
                isOpen={getregisterCustomerOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className="home_model_4wrapp">
                    <button className="signup_modal_close" onClick={closeModal}>
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
                        onClick={() => {
                            console.log("bsdjhfgsjfhjksdfg");
                            SetRegister();
                        }}
                    >
                        Register
                    </button>
                </div>
            </ReactModal>

        </>
    )
}

export default CustomerNavbar