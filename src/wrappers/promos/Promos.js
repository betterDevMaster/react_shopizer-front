import PropTypes from "prop-types";
import React from "react";
import SectionTitle from "../../components/section-title/SectionTitle";
import { Link } from "react-router-dom";
import { setCategoryID } from "../../redux/actions/productActions";
import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";

const FeatureIcon = ({ spaceTopClass, spaceBottomClass, containerClass, gutterClass, responsiveClass, bgImg, setCategoryID }) => {
    const categories = [
        {
            url: "preserves-and-vinegars",
            categoryId: "2",
            imgAlt: "Ofertas Super",
            imgSrc: "https://static.ulabox.com/media/166189_banner-hero-18x6-mobile.jpg",
        },
        {
            url: "sauces-and-condiments",
            categoryId: "3",
            imgAlt: "50% en la 2da unidad",
            imgSrc: "https://static.ulabox.com/media/169120_banner-hero-18x6-mobile.jpg",
        },
        { url: "flour-and-cereals", categoryId: "4", imgAlt: "-3 en Pepsico", imgSrc: "https://static.ulabox.com/media/164816_banner-hero-18x6-mobile.jpg" },
        {
            url: "drinks-and-solubles",
            categoryId: "5",
            imgAlt: "Oferta en Kelloggs!",
            imgSrc: "https://static.ulabox.com/media/151361_banner-hero-18x6-mobile.jpg",
        },
        {
            url: "healthy-supplements",
            categoryId: "6",
            imgAlt: "Especial Limpieza",
            imgSrc: "https://static.ulabox.com/media/162239_banner-hero-18x6-mobile.jpg",
        },
        { url: "snacks", categoryId: "7", imgAlt: "Ulabox Plus", imgSrc: "https://static.ulabox.com/media/154078_banner-hero-18x6-mobile.jpg" },
    ];

    const onClickProductDetails = (id) => {
        setCategoryID(id);
    };

    return (
        <div
            className={`support-area hm9-section-padding ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""} ${
                responsiveClass ? responsiveClass : ""
            }`}
            style={bgImg ? { backgroundImage: `url(${process.env.PUBLIC_URL + bgImg})` } : {}}
        >
            <div className={`${containerClass ? containerClass : "container"}`}>
                <SectionTitle titleText="Promos" />
                <div className="row mt-4">
                    {categories.map((item, key) => (
                        <div className="col-md-4 pa-10" key={key}>
                            <Link to={process.env.PUBLIC_URL + `/category/${item.url}?promo`} onClick={() => onClickProductDetails(item.categoryId)}>
                                <img alt={item.imgAlt} src={item.imgSrc} title={item.imgAlt} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

FeatureIcon.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(FeatureIcon));
