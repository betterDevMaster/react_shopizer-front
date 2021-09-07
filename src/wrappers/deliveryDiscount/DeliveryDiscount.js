import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import { setCategoryID } from "../../redux/actions/productActions";
import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import pattern from "../../assets/images/pattern.png";

const DeliveryDiscount = ({ spaceTopClass, spaceBottomClass, containerClass, gutterClass, responsiveClass, bgImg, setCategoryID, strings }) => {
    const history = useHistory();
    return (
        <div
            className={`delivery-content-area hm9-section-padding ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""} ${
                responsiveClass ? responsiveClass : ""
            }`}
            style={bgImg ? { backgroundImage: `url(${process.env.PUBLIC_URL + bgImg})` } : {}}
        >
            <div className={`${containerClass ? containerClass : "container"}`}>
                <div className="row mt-4 delivery-area" style={{ backgroundImage: `url(${pattern})`, backgroundPosition: 'center center'}}>
                    <div className="col-md-12 description">
                        <h3>{strings['Get 3 months of free shipping by registering right now']}</h3>
                    </div>
                    <div className="offset-md-4 col-md-4 offer">
                        <button onClick={()=>history.push('/login')}>{strings['GET MY OFFER']}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DeliveryDiscount.propTypes = {
    bgImg: PropTypes.string,
    containerClass: PropTypes.string,
    gutterClass: PropTypes.string,
    responsiveClass: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        currentLanguageCode: state.multilanguage.currentLanguageCode,
        defaultStore: state.merchantData.defaultStore,
        userData: state.userData.userData,
        cartData: state.cartData.cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCategoryID: (value) => {
            dispatch(setCategoryID(value));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(DeliveryDiscount));
