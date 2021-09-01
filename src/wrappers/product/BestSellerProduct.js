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
import { Link } from "react-router-dom";
import { setProductID } from "../../redux/actions/productActions";

const BestSellerProduct = ({ setLoader, spaceTopClass, spaceBottomClass, category, containerClass, extraClass, defaultStore, currentLanguageCode, setProductID }) => {
    // const [featuredData, setFeaturedData] = useState([]);
    const [proudctsData, setProudctsData] = useState([]);

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
                    {proudctsData.map((data) => (
                        <div className="best-seller-carousel-container">
                            <div style={{width: '180px', height: '180px'}}>
                                <Link to={process.env.PUBLIC_URL + "/product/" + data.description.friendlyUrl} onClick={() => onClickProductDetails(data.id)}>
                                    {data.images && data.images.length > 0}
                                    {!data.images[0].baseImage ? (
                                        <img src={convertBase64Image(data.images[0].baseImage)} alt="" style={{ width: "100%" }} />
                                    ) : (
                                        <img src={convertBase64Image(data.images[0].baseImage)} alt="" style={{ width: "100%" }} />
                                    )}
                                </Link>
                            </div>
                            <div className="best-seller-desc-area">
                                <Link to={process.env.PUBLIC_URL + "/product/" + data.description.friendlyUrl} onClick={() => onClickProductDetails(data.id)}>
                                    {data.description.title}
                                </Link>
                                <span title="6uds | 0,42&nbsp;€/ud.">6uds | 0,42&nbsp;€/ud.</span>
                                <p>USD {data.originalPrice}</p>
                                <div className="shop-container">
                                    <div className="shop-container-block">
                                        <a role="button" className="MuiChip-root MuiChip-clickable" href="/en/filter/eco">
                                            <span className="MuiChip-label">Organic</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-order-container">
                                <button>
                                    <span>Add your CP</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

BestSellerProduct.propTypes = {
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(BestSellerProduct));
// export default BestSellerProductNine;
