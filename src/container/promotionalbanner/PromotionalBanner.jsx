import React, { useEffect, useState } from "react";
import { LeaderBoardCard, PromotionBannerCard, RetailerNavigationBar } from "../../components";
import images from "../../constants/images";
import { Link } from "react-router-dom";
import {
  ACCEPT_HEADER,
  get_promotion,
  get_region_mall,
} from "../../utils/Constant";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import ReactModal from "react-modal";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useStoreContext } from "../../context/store_context";
import axios from "axios";

const animatedComponents = makeAnimated();

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// model style

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

const AccordionData = [
  {
    id: 1,
    city: "Western Cape",
    mall: [
      {
        id: 1,
        name: "Bayside Mall",
      },
      {
        id: 2,
        name: "Blue Route Mall",
      },
      {
        id: 3,
        name: "Boulevard Square",
      },
    ],
  },
  {
    id: 2,
    city: "KZN",
    mall: [
      {
        id: 1,
        name: "Brackenfell Centre",
      },
      {
        id: 2,
        name: "Brackenfell Corner",
      },
      {
        id: 3,
        name: "Brackenfell Shopping Centre",
      },
    ],
  },
  {
    id: 3,
    city: "Eastern Cape",
    mall: [
      {
        id: 1,
        name: "Canal Walk",
      },
      {
        id: 2,
        name: "Cape Quarter",
      },
      {
        id: 3,
        name: "Cape Gate",
      },
    ],
  },
  {
    id: 4,
    city: "Free State",
    mall: [
      {
        id: 1,
        name: "Delft Mall",
      },
      {
        id: 2,
        name: "De Ville Centre",
      },
      {
        id: 3,
        name: "Durbanville Town Centre",
      },
    ],
  },
];

const PromotionalBanner = ({ get_mall_auth_data, setTab, getTab }) => {
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [getliast, SetLiast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainName, setMainName] = useState(
    get_mall_auth_data &&
      get_mall_auth_data.retailers &&
      get_mall_auth_data.retailers.name !== null
      ? get_mall_auth_data.retailers.name
      : ""
  );

  useEffect(() => {
    getPromation();
  }, [page]);

  const getPromation = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));


    setLoading(true);
    fetch(get_promotion + `per_page=${perPage}&page=${page}`, {
      method: "GET",
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("ffff", JSON.stringify(res.data, null, 2));
        setTotalPages(res.data.last_page);
        SetLiast([...getliast, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Modal

  const [mallMolalOpen, setMallModalIsOpen] = useState(false);
  const [getweek, setWeek] = useState("");

  function closeMallModal() {
    setMallModalIsOpen(false);
  }

  function openMallModal() {
    setMallModalIsOpen(true);
  }

  const [toggle, setToggle] = useState(null);
  let handleToggle = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  // select chackbox functionality
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   setCheckboxChecked(event.target.checked);
  // };

  const handleCheckboxChange = (event, itm, ind) => {
    if (
      event.target.checked === true &&
      itm.region_id === toggle &&
      !peopleInfo.includes(itm.region_id)
    ) {
      console.log("checked_true");

      setPeopleInfo([
        ...peopleInfo,
        {
          id: itm.id,
          name: itm.name,
          checked: event.target.checked,
          region_id: itm.region_id,
        },
      ]);
    } else {
      console.log("checked_false");
      let result = peopleInfo.filter((item, key) => item.id != itm.id);
      setPeopleInfo(result);
    }
  };

  useEffect(() => {
    GetRegion();
    getCategoryApi();
    getWeekApi();

  }, []);

  const [getregion_array, SetRigion_Array] = useState([]);

  const GetRegion = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_region_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetRigion_Array(res.data.data);
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedMalls, setSelectedMalls] = useState([]);

  const [mallidarray, SetMallidarray] = useState([]);
  const [regionidarray, SetRegionidarray] = useState([]);

  const handleRegionChange = (regionName, id) => {
    const updatedSelectedRegions = [...selectedRegions];
    const index = updatedSelectedRegions.indexOf(regionName);

    if (index > -1) {
      updatedSelectedRegions.splice(index, 1);
    } else {
      updatedSelectedRegions.push(regionName);
      regionidarray.push({ id: id });
    }

    setSelectedRegions(updatedSelectedRegions);
  };

  const handleMallChange = (mallName, id) => {
    const updatedSelectedMalls = [...selectedMalls];
    const index = updatedSelectedMalls.indexOf(mallName);

    if (index > -1) {
      updatedSelectedMalls.splice(index, 1);
    } else {
      updatedSelectedMalls.push(mallName);
      mallidarray.push({ id: id });
    }

    setSelectedMalls(updatedSelectedMalls);
  };

  const { week_data, getCategoryApi, getWeekApi } = useStoreContext();

  return (
    <div>
      {loading === true ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mm_main_wrapp">
          <div className="leaderboard-sub-wrapp">
            <RetailerNavigationBar title="Account Management" setTabType={getTab == 4 ? "Promotional Banner" : ""} />
            {/* LeaderBoard name start */}
            <div className="mall_name_wrapp" style={{ marginTop: "0px" }}>
              <p className="mall_name_heading">
                {mainName}
                :
              </p>
              <span>Promotional Banners</span>
            </div>
            <div className="mm_horizontal_line"></div>

            {/* Leaderboard Filter Start */}
            <div className="leaderboard-filter-main-wrapp">
              <div className="leaderboard-filter-part-first">
                <label
                  className="leaderboard-card-lbl"
                  style={{ minWidth: "125px" }}
                >
                  Filter by region:
                </label>
                <select className="leaderboard-card-inp">
                  <option selected disabled value="">
                    Select a Region
                  </option>
                  <option value="1">ONE SIZE</option>
                  <option value="2">TWO SIZE</option>
                  <option value="3">THREE SIZE</option>
                </select>
              </div>

              <div className="leaderboard-filter-part-sec">
                <label
                  className="leaderboard-card-lbl"
                  style={{ minWidth: "125px" }}
                >
                  Filter by mall:
                </label>
                <select className="leaderboard-card-inp">
                  <option selected disabled value="">
                    Select mall
                  </option>
                  <option value="1">ONE SIZE</option>
                  <option value="2">TWO SIZE</option>
                  <option value="3">THREE SIZE</option>
                </select>
              </div>
            </div>
            {/* Leaderboard Filter End */}

            {/* LeaderBoard  name end */}

            {/* LeaderBoard subheading start */}

            {/* <p className="leaderboard-sub-heading">Purchase marketing space through our Leaderboard Banner below (max 1 Leaderboard Banner per Brand)</p> */}

            {/* LeaderBoard subheading end */}

            {/* LeaderBoard Card Component start */}
            {/* <LeaderBoardCard /> */}
            {getliast && getliast.length > 0
              ? getliast.map((mall, mindx) => {
                return (
                  <PromotionBannerCard
                    openMallModal={openMallModal}
                    item={mall}
                    mindx={mindx}
                    setTab={setTab}
                    peopleInfo={peopleInfo}
                    regionidarray={regionidarray}
                    mallidarray={mallidarray}
                    selectedMalls={selectedMalls}
                    getweek={getweek}
                  />
                );
              })
              : null}
            {totalPages !== page && (
              <button
                className="view_more_btn"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : " Load More LeaderBoard"}
                <BsChevronDown />
              </button>
            )}
            {/* LeaderBoard Card Component end */}

            {/* LeaderBoard Add New Button start */}

            <button onClick={() => setTab(21)} className="leaderboard-btn">
              Add new{" "}
              <img src={images.add_new} className="leaderboard-btn-icon" />
            </button>

            {/* LeaderBoard Add New Button end */}
          </div>
          {/* select mall modal start */}
          <ReactModal
            isOpen={mallMolalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeMallModal}
            style={customStyles}
          >
            <div className="select_mall_main_wrapp">
              <div className="select_mall_base_wrapp">
                {/* mall heading */}
                <p className="select_mall_heading">
                  Select the malls that your brand features in:
                </p>

                {/* mall search */}
                <div className="select_mall_serch_wrapp">
                  <input
                    type="search"
                    placeholder="Search"
                    className="input_box"
                  />
                  <BiSearch
                    className="select_mall_search_icon"
                    size={25}
                    color="var(--color-orange)"
                  />
                </div>

                <div
                  className="leaderboard-card-inpbox-wrapp"
                  style={{ alignItems: "center" }}
                >
                  <label className="leaderboard-card-lbl">Slect Weeks:</label>
                  <select
                    className="leaderboard-card-inp"
                    // value={MallName}
                    onChange={(e) => {
                      setWeek(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    <option selected disabled value="">
                      Select Week
                    </option>

                    {week_data &&
                      week_data.map((item, index) => {
                        return (
                          <>
                            {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                            <option value={item.id} key={index}>
                              {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                              &nbsp;&nbsp;&nbsp; {item.to_date}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  {/* <button
              className="leaderboard-card-inp"
              style={{ color: "rgb(129 128 128)", textAlign: "start" }}
              onClick={() => openMallModal()}
            >
              Select Mall
            </button> */}
                </div>

                {/* mall selected tag */}
                <div className="select_mall_tag_btns_wrapp">
                  {selectedMalls && selectedMalls.length > 0
                    ? selectedMalls.map((mall, mindx) => {
                      // console.log("gggg", mall);
                      return (
                        <button
                          className="select_mall_tag_single_btn"
                          key={mindx}
                        // onClick={() => {
                        //   handleMallChange(mall);
                        //   // setPeopleInfo(
                        //   //   peopleInfo.filter(
                        //   //     (people) => people.name !== mall.name
                        //   //   )
                        //   // );
                        // }}
                        >
                          {mall}
                          {/* <IoIosClose className="select_mall_tag_single_btn_close" /> */}
                        </button>
                      );
                    })
                    : null}
                </div>

                <div className="mall_Select_wrapp">
                  <p
                    style={{
                      fontSize: "18px",
                      alignSelf: "start",
                      marginBottom: "1rem",
                    }}
                  >
                    Region
                  </p>

                  {getregion_array && getregion_array.length > 0
                    ? getregion_array.map((item, index) => {
                      return (
                        <div
                          className="bim_accordian_wrapp"
                          style={{ marginBottom: "6px" }}
                          key={item.region_id}
                        >
                          <button
                            className="bim_accordian_btn"
                            onClick={() => {
                              setToggle(item.region_id);
                              handleRegionChange(
                                item.region_name,
                                item.region_id
                              );
                            }}
                          >
                            <p
                              style={{
                                color:
                                  item.region_id === toggle
                                    ? "#ff8b00"
                                    : "#000",
                                fontWeight:
                                  item.region_id === toggle ? "500" : "300",
                              }}
                            >
                              {item.region_name}
                            </p>

                            {item.region_id == toggle ? (
                              <IoIosArrowUp size={20} color="#ff8b00" />
                            ) : (
                              <IoIosArrowDown size={20} />
                            )}
                          </button>
                          {item.region_id == toggle ? (
                            <div className="bim_accordian_mall_wrapp">
                              {item.malls.map((itm, ind) => {
                                return (
                                  <>
                                    <div
                                      key={itm.id}
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedMalls.includes(
                                          itm.name
                                        )}
                                        // value={peopleInfo}
                                        onChange={(e) => {
                                          // handleCheckboxChange(e, itm, ind);
                                          handleMallChange(itm.name, itm.id);
                                        }}

                                      // type="checkbox"
                                      // checked={
                                      //   getcheck[(itm, ind, "", item.region_id)]
                                      // }
                                      // onChange={(e) => {
                                      //   check(itm, ind, "", item.region_id);
                                      // }}
                                      // value={peopleInfo}
                                      />
                                      <label htmlFor={itm.id}>
                                        {itm.name}
                                      </label>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })
                    : null}
                </div>

                <div className="leaderboard-btn-box">
                  <button
                    className="btn btn-orange"
                    onClick={() => {
                      closeMallModal();
                      console.log("mallidarray", mallidarray);
                      console.log("regionidarray", regionidarray);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </ReactModal>
          {/* select mall modal end */}
        </div>
      )}
    </div>
  );
};

export default PromotionalBanner;