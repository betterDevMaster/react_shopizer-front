import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass, merchant, strings }) => {
    return (
        <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""}`}>
            <div className="footer-logo">
                {merchant.logo != null && (
                    <Link to={process.env.PUBLIC_URL + "/"}>
                        <img alt="" src={"data:image/png;base64," + merchant.logo.path} />
                    </Link>
                )}
            </div>
            <p>
                {strings["Copyright"]} © {new Date(merchant.inBusinessSince).getFullYear()}{" "}
                <Link to="" rel="noopener noreferrer">
                    {merchant.name}
                </Link>
                .<br /> {strings["All Rights Reserved"]}
            </p>
        </div>
    );
};

FooterCopyright.propTypes = {
    footerLogo: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string,
    strings: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        merchant: state.merchantData.merchant,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(FooterCopyright));
// export default FooterCopyright;
