import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
    return (
        <div className={`${logoClass ? logoClass : ""}`}>
            <Link to={process.env.PUBLIC_URL + "/"}>
                <img alt="header_logo" className="logoImage" src={imageUrl} />
            </Link>
        </div>
    );
};

Logo.propTypes = {
    imageUrl: PropTypes.string,
    logoClass: PropTypes.string,
};

export default Logo;
