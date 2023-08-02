import React from 'react'
import "./AboutInStorePage.css"
import { Footer, Navbar } from '../../common'
import images from '../../constants/images'
import { RegisterMall } from '../../container'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const AboutInStorePage = () => {
  return (
    <>
      <Helmet>
        <title>About In-Store</title>
      </Helmet>
      <Navbar
      // setCustomerDropdown={setCustomerDropdown}
      // getcustomerDropdown={getcustomerDropdown}
      />

      <div>
        {/* <Navbar /> */}
        {/* hero start */}
        {/* <div className="about_hero_wrapp">
          <img src={images.about_hero} alt="" />
        </div> */}

        <div
          className="about_hero_wrapp"
          style={{
            backgroundImage: `url(${images.about_hero})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* <img src={images.hero_banner} alt="" /> */}
          <div className="homehero_text_main">
            <div className="homehero_text_base">
              <img src={images.brandlogo} alt="" />
              {/* social media account button start */}
              <div className="apps_logos_wrapp">
                <img src={images.play_store_logo} alt="play store logo" />
                <img src={images.app_store_logo} alt="app store logo" />
              </div>
            </div>
          </div>

        </div>


        {/* hero end */}

        {/* about in store start */}
        <div className="main_wrapp mt_16">
          <div className="container whayjoin_wrapp about-extra-gap-section">
            <h1 className="h1 mb_10">About In-Store</h1>
            <p className="mb_16">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat.
            </p>
            <div className="whyjoin_grid">
              <div className="whyjoin_grid_item">
                <img src={images.home_eye} alt="" />
                <p>
                  Shopping centre/Mall, promotions and activities are displayed
                  first in the user experience.
                </p>
              </div>
              <div className="whyjoin_grid_item">
                <img src={images.home_location} alt="" />
                <p>Users can view the shopping centre/Mall from anywhere</p>
              </div>
              <div className="whyjoin_grid_item">
                <img src={images.home_shapes} alt="" />
                <p>
                  Multiple marketing initiatives, promo events, competitions can
                  be featured simultaneously on the platform.
                </p>
              </div>
              <div className="whyjoin_grid_item">
                <img src={images.home_archive} alt="" />
                <p>
                  Shopping centre/Mall can engage with users via notifications
                  for specials, sales, or events.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* about instore end */}

        {/* about in store register part-1 start*/}
        <div className="main_wrapp registermall_main_wrapp bg-blue">
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
              <Link to="/mall" className="homepage-black-btn">Register your mall</Link>
            </div>
            <div className="registermall_sec2">
              <img src={images.about_1} alt="" />
            </div>
          </div>
        </div>
        {/* about in store register part-1 end*/}

        {/* about in store register part-2 start*/}
        <div className="main_wrapp registermall_main_wrapp bg-pink">
          <div className="container registermall_base_wrapp fd-rr">
            <div className="registermall_sec1">
              <h2 className="h2">
                Stores Can Track
                <br /> Customer Data
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo.
              </p>
              <Link to="/retailer" className="homepage-black-btn">Register your brand
              </Link>
            </div>
            <div className="registermall_sec2">
              <img src={images.about_2} alt="" />
            </div>
          </div>
        </div>
        {/* about in store register part-2 end*/}

        <RegisterMall />
      </div>
    </>
  );
}

export default AboutInStorePage