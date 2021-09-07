import React from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import Carousel from "../carousel/Carousel";

const HeroSlider = ({ spaceTopClass, spaceBottomClass, containerClass, gutterClass, responsiveClass, bgImg, string, strings }) => {
    return (
        <div
            className={`hero-slider-area hm9-section-padding ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""} ${
                responsiveClass ? responsiveClass : ""
            }`}
            style={bgImg ? { backgroundImage: `url(${process.env.PUBLIC_URL + bgImg})` } : {}}
        >
            <div className="site-blocks-cover">
                <Carousel />
            </div>
            <div className="py-1 bg-success bg-footer-title">
                <h3>{strings['Your healthy supermarket without leaving home']}</h3>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentLanguageCode: state.multilanguage.currentLanguageCode,
        defaultStore: state.merchantData.defaultStore,
        isLoading: state.loading.isLoading,
    };
};

export default connect(mapStateToProps)(multilanguage(HeroSlider));
