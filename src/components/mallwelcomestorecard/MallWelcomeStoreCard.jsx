import React, { useState } from 'react'
import "./MallWelcomeStoreCard.css";
import { WelcomeCard } from '../../components';
import images from '../../constants/images';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// const responsive = {
//   0: { items: 1 },
//   720: { items: 2 },
//   1200: { items: 3 },
// };

const MallWelcomeStoreCard = ({ WcBtn, titie, des }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 920,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="main_wrapp">
            <div className="container welcome_store_wrapp">
                <h1 className="h1">{titie ? titie : "Welcome to In-Store"}</h1>
                <p>{des && des}</p>
                <div className="welcome_cards_warpp">
                    {/* <Slider {...settings}> */}
                    <div className="mall-page-wel-card-flex">
                        <WelcomeCard
                            img1={images.wcard_3}
                            h3="BIGGEST SELECTION"
                            h4="OF BRANDS <br/> NATIVE TO <br/> YOUR MALL"
                            color="#d813a5"
                        // wc_btn={WcBtn ? "Register mall" : null}
                        />
                        <WelcomeCard
                            img1={images.wcard_2}
                            h3="NEW PRODUCTS"
                            h4="UNIQUE TO YOUR <br /> MALL BY BRANDS <br />  IN YOUR MALL"
                            color="#ff8b00"
                        // wc_btn={WcBtn ? "Register brand" : null}
                        />{" "}
                        <WelcomeCard
                            img1={images.wcard_1}
                            h3="SIGN UP & REGISTER"
                            h4="SHOPPING <br /> BRANDS IN <br />YOUR AREA"
                            color="#4397ff"
                        // wc_btn={WcBtn ? "Sign up" : null}
                        />
                    </div>
                    {/* </Slider> */}
                </div>
            </div>
        </div>
    );
};

export default MallWelcomeStoreCard