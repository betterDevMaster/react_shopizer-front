import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/section-title/SectionTitle";
import WebService from "../../util/webService";
import constant from "../../util/constant";
import { setLoader } from "../../redux/actions/loaderActions";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useHistory } from "react-router-dom";
import { setProductID } from "../../redux/actions/productActions";
import { useToasts } from "react-toast-notifications";
import { isValidObject } from "../../util/helper";
import { addToCart } from "../../redux/actions/cartActions";

const BestSellerProduct = ({
    addToCart,
    setLoader,
    cartData,
    spaceTopClass,
    spaceBottomClass,
    category,
    containerClass,
    extraClass,
    defaultStore,
    currentLanguageCode,
    userData,
    setProductID,
}) => {
    // const [featuredData, setFeaturedData] = useState([]);
    const [proudctsData, setProudctsData] = useState([]);
    const history = useHistory();
    const { addToast } = useToasts();
    const [preOrder, setPreorder] = useState(0);

    useEffect(() => {
        getProductList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProductList = async () => {
        setLoader(true);
        let action = constant.ACTION.PRODUCT + constant.ACTION.BESTSELLERS + "?store=" + defaultStore + "&lang=" + currentLanguageCode;
        try {
            let response = await WebService.get(action);
            if (response) {
                setProudctsData(response);
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const onClickProductDetails = (id) => {
        setProductID(id);
    };

    const convertBase64Image = (image) => {
        return "data:image/png;base64," + image;
    };

    return (
        <div className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""} ${extraClass ? extraClass : ""}`}>
            <div className={`${containerClass ? containerClass : "container"}`}>
                <SectionTitle titleText="Bestsellers" />
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="best-seller-carousel mt-4"
                    containerclassName="container"
                    dotListclassName=""
                    draggable={false}
                    focusOnSelect={false}
                    infinite={false}
                    itemclassName=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3075,
                                min: 1024,
                            },
                            items: 6,
                            partialVisibilityGutter: 40,
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0,
                            },
                            items: 1,
                            partialVisibilityGutter: 30,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464,
                            },
                            items: 4,
                            partialVisibilityGutter: 30,
                        },
                    }}
                    showDots={false}
                    sliderclassName=""
                    slidesToSlide={5}
                    swipeable
                >
                    {proudctsData.map((product) => (
                        <div className="best-seller-carousel-container">
                            <div style={{ width: "180px", height: "180px" }}>
                                <Link
                                    to={process.env.PUBLIC_URL + "/product/" + product.description.friendlyUrl}
                                    onClick={() => onClickProductDetails(product.id)}
                                >
                                    {product.images && product.images.length > 0}
                                    {!product.images[0].baseImage ? (
                                        <img src={convertBase64Image(product.images[0].baseImage)} alt="" style={{ width: "100%" }} />
                                    ) : (
                                        <img src={convertBase64Image(product.images[0].baseImage)} alt="" style={{ width: "100%" }} />
                                    )}
                                </Link>
                            </div>
                            <div className="best-seller-desc-area">
                                <Link
                                    to={process.env.PUBLIC_URL + "/product/" + product.description.friendlyUrl}
                                    onClick={() => onClickProductDetails(product.id)}
                                >
                                    {product.description.title}
                                </Link>
                                <span title="6uds | 0,42&nbsp;€/ud.">6uds | 0,42&nbsp;€/ud.</span>
                                <p>USD {product.originalPrice}</p>
                                <div className="shop-container">
                                    <div className="shop-container-block">
                                        {!!+product.discounted && (
                                            <a role="button" className="MuiChip-root MuiChip-clickable" href="/en/filter/eco">
                                                <span className="MuiChip-label">
                                                    USD {product.finalPrice} -{" "}
                                                    {Math.ceil(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100)} %
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="shop-order-container">
                                {preOrder !== product.id || preOrder === 0 ? (
                                    <button
                                        className="shop-order-button"
                                        onClick={() => {
                                            if (!userData) history.push("/login");
                                            setPreorder(product.id);
                                        }}
                                    >
                                        <i className="fa fa-shopping-cart" style={{ fontSize: "27px" }}></i>
                                    </button>
                                ) : (
                                    <div className="shop-order-calc-area">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                let index = isValidObject(cartData) ? cartData.products.findIndex((order) => order.id === product.id) : -1;
                                                if (index !== -1) {
                                                    addToCart(
                                                        product,
                                                        addToast,
                                                        cartData,
                                                        cartData.products[index].quantity - 1,
                                                        defaultStore,
                                                        undefined,
                                                        userData
                                                    );
                                                    if (cartData.products[index].quantity < 1) setPreorder(0);
                                                }
                                            }}
                                        >
                                            <svg viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                                <path d="M19 13H5v-2h14v2z"></path>
                                            </svg>
                                        </button>
                                        <span>
                                            {isValidObject(cartData) && cartData.products.findIndex((order) => order.id === product.id) !== -1
                                                ? cartData.products[cartData.products.findIndex((order) => order.id === product.id)].quantity
                                                : 0}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                let index = isValidObject(cartData) ? cartData.products.findIndex((order) => order.id === product.id) : -1;
                                                addToCart(
                                                    product,
                                                    addToast,
                                                    cartData,
                                                    index === -1 ? 1 : cartData.products[index].quantity + 1,
                                                    defaultStore,
                                                    undefined,
                                                    userData
                                                );
                                            }}
                                        >
                                            <svg viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                {/* <button
                                    onClick={() => {
                                        if (!userData) history.push("/login");
                                        else addToCart(product, addToast, cartData, 1, defaultStore, undefined, userData);
                                    }}
                                    className="active"
                                >
                                    <i className="fa fa-shopping-cart" style={{ fontSize: "27px" }}></i>
                                </button> */}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

BestSellerProduct.propTypes = {
    addToCart: PropTypes.func,
    category: PropTypes.string,
    containerClass: PropTypes.string,
    extraClass: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
    setLoader: PropTypes.func,
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
        setLoader: (value) => {
            dispatch(setLoader(value));
        },
        setProductID: (value) => {
            dispatch(setProductID(value));
        },
        addToCart: (item, addToast, cartData, quantityCount, defaultStore, selectedProductColor, userData) => {
            dispatch(addToCart(item, addToast, cartData.code, quantityCount, defaultStore, selectedProductColor, userData));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(BestSellerProduct));
// export default BestSellerProductNine;
