import React, { useEffect, useState } from "react";
import "./CustomerWishlist.css";
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CustomerBrandCard } from "../../components";
import axios from "axios";
import { ACCEPT_HEADER, get_wishlist } from "../../utils/Constant";

const AccordionData = [
  {
    id: 1,
    mall: "Western Cape mall",
    brand: [
      {
        id: 1,
        name: "Guess",
      },
      {
        id: 2,
        name: "Gucci",
      },
    ],
  },
  {
    id: 2,
    mall: "V&A Waterfront Mall",
    brand: [
      {
        id: 1,
        name: "LV",
      },
      {
        id: 2,
        name: "prada",
      },
    ],
  },
];

const CustomerWishlist = () => {
  const [getDropDownOpen, setDropDownOoen] = useState(false);
  const [toggle, setToggle] = useState(null);
  let handleToggle = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const [getlist, SetList] = useState([]);

  const getWishlist = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_wishlist, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetList(res.data.data);
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  return (
    <div className="mm_main_wrapp">
      <div className="mall_name_wrapp">
        <p className="mall_name_heading">My wishlist</p>
      </div>
      <span></span>
      {/* </div> */}
      {/* <div className="mm_horizontal_line"></div> */}
      <p className="cus-wishlist-sub-heading">
        You can only purchase these products in store
      </p>
      {/* First DropDown Start */}
      {getlist && getlist.length > 0
        ? getlist.map((item, index) => {
          return (
            <div style={{ marginBottom: "20px" }} key={item.id}>
              <div
                className="wishlist-head-btn-flex"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div className="cus-wishlist-dropdown-erapp">
                  {item.products && item.products.length > 0
                    ? item.products.map((itm, inx) => {
                      return (
                        <p
                          className="cus-wishlist-dropdown-heading"
                          style={{
                            color: item.id === toggle ? "#ff8b00" : "#000",
                            fontWeight: item.id === toggle ? "800" : "800",
                            fontSize: "20px",
                          }}
                        >
                          {item.malls ? item.malls.name : ""}
                        </p>
                      );
                    })
                    : null}

                  <button to={""} onClick={() => handleToggle(item.id)}>
                    {item.id === toggle ? <BsChevronUp /> : <BsChevronDown />}
                  </button>
                </div>

                <div className="find-my-way-btn-flex">
                  <button className="find-my-way-btn">Find my way</button>
                  <BsArrowRight className="find-my-way-btn-arrow" />
                </div>
              </div>
              {item.products && item.products.length > 0
                ? item.products.map((itm2, inx) => {
                  return (
                    <p className="cus-wishlist-dropdown-sub-heading">
                      {itm2.stores
                        ? itm2.stores.name
                          ? itm2.stores.name
                          : ""
                        : ""}
                    </p>
                  );
                })
                : null}
              {/* <p className="cus-wishlist-dropdown-sub-heading">GUESS</p> */}
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#ddd",
                  marginTop: "10px",
                }}
              ></div>
              {item.id === toggle ? (
                <div className="cus-wishlist-dropdown-main-wrapp">
                  {item.products && item.products.length > 0
                    ? item.products.map((itm1, inx1) => {
                      return (
                        <div className="cus-wishlist-dropdown-prod-wrapp">
                          <CustomerBrandCard data={itm1} replce={2} mainitem={item} getWishlist={getWishlist} />
                        </div>
                      );
                    })
                    : null}

                  {/* <div className="cus-wishlist-dropdown-sec-part">
                      <p className="cus-wishlist-dropdown-sub-heading-sec">
                        Incredible Connections
                      </p>
                      <div className="cus-wishlist-dropdown-prod-wrapp">
                        <CustomerBrandCard />
                      </div>
                    </div> */}
                </div>
              ) : null}
            </div>
          );
        })
        : null}

      {/* First DropDown end */}

      {/* Second DropDown start */}
      {/* <div className="cust-wishlist-main-wrapp">
           <div className="cus-wishlist-dropdown-erapp">
             <p
               className="cus-wishlist-dropdown-heading"
               style={{
                 color: getDropDownOpen ? "#ff8b00" : "#000",
                 fontWeight: getDropDownOpen ? "800" : "800",
                 fontSize: "20px",
               }}
             >
               Tygervalley
             </p>
             <button to={""} onClick={() => setDropDownOoen(!getDropDownOpen)}>
               {getDropDownOpen ? <BsChevronUp /> : <BsChevronDown />}
             </button>
           </div>
           <p className="cus-wishlist-dropdown-sub-heading">GAME</p
           {getDropDownOpen ? (
             <div className="cus-wishlist-dropdown-main-wrapp">
               <div className="cus-wishlist-dropdown-prod-wrapp">
                 <CustomerBrandCard />
                 <CustomerBrandCard />
                 <CustomerBrandCard />
               </div
               <div className="cus-wishlist-dropdown-sec-part">
                 <p className="cus-wishlist-dropdown-sub-heading-sec">
                   Incredible Connections
                 </p>
                 <div className="cus-wishlist-dropdown-prod-wrapp">
                   <CustomerBrandCard />
                 </div>
               </div>
             </div>
           ) : null}
         </div> */}
      {/* Second DropDown end */}
    </div>
  );
};

export default CustomerWishlist;