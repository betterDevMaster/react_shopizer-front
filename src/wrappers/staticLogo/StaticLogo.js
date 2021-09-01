import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";

import logo_american_express from "../../assets/images/logo_american_express.svg";
import logo_master_card from "../../assets/images/logo_master_card.svg";
import logo_online_trust from "../../assets/images/logo_online_trust.svg";
import logo_secure_payment from "../../assets/images/logo_secure_payment.svg";
import logo_visa from "../../assets/images/logo_visa.svg";
import mockup from "../../assets/images/mockup.png";
import appstore from "../../assets/images/appstore.svg";
import playstore from "../../assets/images/playstore.svg";

const StaticLogo = ({ spaceTopClass, spaceBottomClass, subscribeBtnClass, bgColorClass, subscribeColorClass, strings }) => {
    return (
        <div
            className={`subscribe-area-3 ${bgColorClass ? bgColorClass : ""} ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            } `}
        >
            <div className="container">
                <div className="static-logo">
                    <img alt="logo online trust" src={logo_online_trust} />
                    <img alt="logo secure payment" src={logo_secure_payment} />
                    <img alt="american express logo" src={logo_american_express} />
                    <img alt="logo master card" src={logo_master_card} />
                    <img alt="logo visa" src={logo_visa} />
                </div>
            </div>
            <div className="static-download mt-30">
                <div className="static-mockup">
                    <img alt="mockup" src={mockup} />
                </div>
                <div className="static-mobile-area">
                    <h4>Download our app</h4>
                    <div className="static-mobile-download">
                        <a className="" title="Download our app iOS" rel="nofollow" href="https://apps.apple.com/en/app/ulabox/id465984761">
                            <img alt="Download our app iOS" src={appstore} />
                        </a>
                        <a
                            className=""
                            title="Download our app Android"
                            rel="nofollow"
                            href="https://play.google.com/store/apps/details?id=com.ulabox&amp;hl=en"
                        >
                            <img alt="Download our app Android" src={playstore} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

StaticLogo.propTypes = {
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
    bgColorClass: PropTypes.string,
    subscribeColorClass: PropTypes.string,
};

export default multilanguage(StaticLogo);
