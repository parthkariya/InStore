import React from 'react'
import images from '../../constants/images'
import "./RetailerProfile.css"

const RetailerProfile = ({ setTab, get_mall_auth_data }) => {
    return (
        <div className="mallpp_main_wrapp mallpp_main_wrapp-resp" style={{ width: "100%" }} >
            <div className="mallpp_part1">
                <p className="mall_part_1_heading">Welcome {get_mall_auth_data && get_mall_auth_data.name && get_mall_auth_data.name}!</p>
                {/* <p className="mall_part_1_heading">Welcome {get_mall_auth_data && get_mall_auth_data.retailers.name && get_mall_auth_data.retailers.name}!</p> */}

                <h5 className="h5 mb_10">
                    Let’s start by setting up your account profile:
                </h5>

                <ul>
                    <li className="mallpp_sigle_list">
                        Populate your store profile with your store details under
                        <button onClick={() => setTab(2)}>Account Settings</button>
                    </li>
                    <li className="mallpp_sigle_list">
                        Upload marketing content via{" "}
                        <button onClick={() => setTab(3)}>Leaderboard Banners,</button>&nbsp;
                        <button onClick={() => setTab(4)}>Promotional Banners,</button>&nbsp;
                        <button onClick={() => setTab(5)}> Product Banners</button>
                        &nbsp;<span>and</span>&nbsp;
                        <button onClick={() => setTab(6)}>Product Tiles</button>
                    </li>
                    <li className="mallpp_sigle_list">
                        Keep track of your{" "}
                        <button onClick={() => setTab(7)}>marketing analytics</button>
                    </li>
                    <li className="mallpp_sigle_list">
                        Keep track of your{" "}
                        <button onClick={() => setTab(8)}>brand in malls</button>
                    </li>
                    {/* <li className="mallpp_sigle_list">
                        Mange your mall’s facilities under{" "}
                        <button onClick={() => setTab(6)}>Facilities</button>
                    </li> */}
                </ul>
            </div>

            {/* profile cards wrapp start */}
            <div className="mallpp_part2 mallpp_part2-mall-side-max-width" >
                <div className="mallpp_part2">
                    {/* single cards start */}
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_1})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">100% Native</h5>
                        <p className="mallpp_part2_card_description">
                            In-Store’s unique marketing adds respembles the experience of stores
                            in a mall
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_2})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Fulfillment</h5>
                        <p className="mallpp_part2_card_description">
                            One buying journey, multiple fulfillment options with preference for
                            in-store.
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_3})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Unified</h5>
                        <p className="mallpp_part2_card_description">
                            Unified channel for retail brands to bring together consumers,
                            marketing & products
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_2})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Personalised</h5>
                        <p className="mallpp_part2_card_description">
                            The In-Store platform takes personalised content advertising to a
                            whole new level
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_3})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Intergrated Publishing</h5>
                        <p className="mallpp_part2_card_description">
                            Digital brand marketing/ advertising
                        </p>
                    </div>
                    <div
                        className="mallpp_part2_card"
                        style={{
                            backgroundImage: `url(${images.home_card_bg_1})`,
                            backgroundPosition: "center",
                        }}
                    >
                        <h5 className="mallpp_part2_card_heading">Simplified</h5>
                        <p className="mallpp_part2_card_description">
                            The In-Store platform offers small business and enterprise solutions
                        </p>
                    </div>
                    {/* single cards end */}
                </div>
            </div>
            {/* profile cards wrapp end */}
        </div>
    )
}

export default RetailerProfile