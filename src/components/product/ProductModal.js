import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

import Swiper from "react-id-swiper";
import "swiper/swiper.scss";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import WebService from "../../util/webService";
import constant from "../../util/constant";
import { setLoader } from "../../redux/actions/loaderActions";
import StarRatings from "react-star-ratings";
import { useHistory } from "react-router-dom";

function ProductModal(props, strings) {
    const { product, cartData, defaultStore, userData, finalproductprice, finaldiscountedprice, setLoader } = props;

    const [discountedPrice, setDiscountedPrice] = useState(finaldiscountedprice);
    const [productPrice, setProductPrice] = useState(finalproductprice);
    const [isDiscount, setIsDiscount] = useState(product.discounted);

    const [gallerySwiper, getGallerySwiper] = useState(null);
    const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
    const [selectedProductColor, setSelectedProductColor] = useState([]);
    const [quantityCount, setQuantityCount] = useState(1);
    const [currentImage, setCurrentImage] = useState(defaultImage(product));
    const history = useHistory();
    const addToCart = props.addtocart;
    const addToast = props.addtoast;

    useEffect(() => {
        getDefualtsOption();
        if (gallerySwiper !== null && gallerySwiper.controller && thumbnailSwiper !== null && thumbnailSwiper.controller) {
            gallerySwiper.controller.control = thumbnailSwiper;
            thumbnailSwiper.controller.control = gallerySwiper;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gallerySwiper, thumbnailSwiper]);

    const gallerySwiperParams = {
        getSwiper: getGallerySwiper,
        spaceBetween: 10,
        loopedSlides: 4,
        loop: false,
    };

    const thumbnailSwiperParams = {
        getSwiper: product.images.length > 4 && getThumbnailSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        loopedSlides: 4,
        touchRatio: 0.2,
        freeMode: true,
        loop: false,
        slideToClickedSlide: true,
        navigation: {
            nextEl: product.images.length > 4 ? ".swiper-button-next" : "",
            prevEl: product.images.length > 4 ? ".swiper-button-prev" : "",
        },
        renderPrevButton: () => (
            <button className="swiper-button-prev ht-swiper-button-nav">
                <i className="pe-7s-angle-left" />
            </button>
        ),
        renderNextButton: () => (
            <button className="swiper-button-next ht-swiper-button-nav">
                <i className="pe-7s-angle-right" />
            </button>
        ),
    };
    const getDefualtsOption = async () => {
        let temp = [];
        if (product.options) {
            product.options.map(async (item) => {
                item.optionValues.map(async (data) => {
                    if (data.defaultValue) {
                        temp.push({ name: item.name, id: data.id });
                    }
                });
            });
            setSelectedProductColor(temp);
            getPrice(temp);
        }
    };
    const onChangeOptions = async (value, option) => {
        let tempSelectedOptions = [];
        let index;
        if (option.type === "radio" || option.type === "select") {
            index = selectedProductColor.findIndex((a) => a.name === option.name);
        } else {
            index = selectedProductColor.findIndex((a) => a.id === value.id);
        }

        if (index === -1) {
            let temp = [...selectedProductColor, { name: option.name, id: value.id }];
            tempSelectedOptions = temp;
            setSelectedProductColor(temp);
        } else {
            let temp = [...selectedProductColor];
            if (option.type === "radio" || option.type === "select") {
                temp[index] = { name: option.name, id: value.id };
            } else {
                temp.splice(index, 1);
            }
            tempSelectedOptions = temp;
            setSelectedProductColor(temp);
        }
        getPrice(tempSelectedOptions);
    };
    const getPrice = async (tempSelectedOptions) => {
        setLoader(true);
        let action = constant.ACTION.PRODUCT + constant.ACTION.PRICE;
        let param = { options: tempSelectedOptions, id: product.id };
        try {
            let response = await WebService.post(action, param);
            if (response) {
                setDiscountedPrice(response.finalPrice);
                setProductPrice(response.originalPrice);
                setIsDiscount(response.discounted);
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
        }
    };
    const checkedOrNot = (value) => {
        let index = selectedProductColor.findIndex((a) => a.id === value.id);
        if (index === -1) {
            return false;
        } else {
            return true;
        }
    };
    const convertBase64Image = (image) => {
        return "data:image/png;base64," + image;
    };

    return (
        <Fragment>
            <Modal show={props.show} onHide={props.onHide} className="product-quickview-modal-wrapper">
                <Modal.Header closeButton></Modal.Header>

                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <div className="product-large-image-wrapper">
                                <Swiper {...gallerySwiperParams}>
                                    {product.images &&
                                        product.images.length > 0 &&
                                        product.images.map((single, key) => {
                                            return (
                                                <div key={key}>
                                                    <div className="single-image">
                                                        {currentImage != null && <img src={currentImage} className="img-fluid" alt="" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </Swiper>
                            </div>
                            <div className="product-small-image-wrapper mt-15">
                                <Swiper {...thumbnailSwiperParams}>
                                    {product.images &&
                                        product.images.length > 1 &&
                                        product.images.map((single, key) => {
                                            return (
                                                <div key={key}>
                                                    <div className="single-image">
                                                        <img
                                                            onClick={() => setCurrentImage(convertBase64Image(single.baseImage))}
                                                            src={convertBase64Image(single.baseImage)}
                                                            className="img-fluid"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </Swiper>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12 col-xs-12">
                            <div className="product-details-content quickview-content">
                                <h2>{product.description.name}</h2>
                                <div className="product-details-price">
                                    {isDiscount ? (
                                        <Fragment>
                                            <span>{discountedPrice}</span> <span className="old">{productPrice}</span>
                                        </Fragment>
                                    ) : (
                                        <span>{productPrice} </span>
                                    )}
                                </div>

                                <div className="pro-details-rating-wrap">
                                    <div className="pro-details-rating">
                                        <StarRatings
                                            rating={parseInt(product.rating)}
                                            starRatedColor="#ffa900"
                                            starDimension="17px"
                                            starSpacing="1px"
                                            numberOfStars={5}
                                            name="view-rating"
                                        />
                                    </div>
                                </div>
                                <div className="pro-details-list">
                                    <p dangerouslySetInnerHTML={{ __html: product.description.description }}></p>
                                    <ul>
                                        <li>
                                            <span>Weight</span> {product.productSpecifications.weight} Pounds
                                        </li>
                                        {
                                            <li>
                                                <span>{strings["Package size"]}</span>
                                                {product.productSpecifications.length} x {product.productSpecifications.width} x{" "}
                                                {product.productSpecifications.height} Inches{" "}
                                            </li>
                                        }
                                        {product.properties.map((value, i) => {
                                            return (
                                                <li key={i}>
                                                    <span>
                                                        <b>{value.property.name}</b>
                                                    </span>{" "}
                                                    {value.propertyValue.name}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {product.options ? (
                                    <div className="pro-details-size-color">
                                        {product.options.map((option, key) => {
                                            return (
                                                option.type === "radio" && (
                                                    <div className="pro-details-color-wrap" key={key}>
                                                        <span>{option.name}</span>
                                                        <div className="pro-details-color-content" style={{ display: "flex", flexDirection: "column" }}>
                                                            {option.optionValues.map((value, index) => {
                                                                return (
                                                                    <div
                                                                        style={{ flexDirection: "row", display: "flex", alignItems: "center", margin: 15 }}
                                                                        key={index}
                                                                    >
                                                                        {value.image && <img src={convertBase64Image(value.image)} alt="product-option" />}

                                                                        <label
                                                                            className={`pro-details-color-content--single`}
                                                                            style={{ backgroundColor: value.code }}
                                                                            key={index}
                                                                        >
                                                                            <input
                                                                                type={option.type}
                                                                                value={value.id}
                                                                                name={option.name}
                                                                                checked={checkedOrNot(value)}
                                                                                onChange={() => onChangeOptions(value, option)}
                                                                            />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        <label>
                                                                            {value.description.name} {value.price && "(" + value.price + ")"}
                                                                        </label>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            );
                                        })}
                                        {product.options.map((option, index) => {
                                            return (
                                                option.type === "select" && (
                                                    <div className="pro-details-size" key={index}>
                                                        <span>{option.name}</span>
                                                        <div className="pro-details-size-content">
                                                            {
                                                                <select
                                                                    onChange={(e) => {
                                                                        onChangeOptions(JSON.parse(e.target.value), option);
                                                                    }}
                                                                >
                                                                    {option.optionValues.map((singleSize, i) => {
                                                                        return (
                                                                            <option
                                                                                key={i}
                                                                                value={JSON.stringify(singleSize)}
                                                                                selected={checkedOrNot(singleSize)}
                                                                            >
                                                                                {singleSize.description.name} {singleSize.price && "(" + singleSize.price + ")"}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            );
                                        })}
                                        {product.options.map((option, index) => {
                                            return (
                                                option.type === "checkbox" && (
                                                    <div className="pro-details-size" key={index}>
                                                        <span>{option.name}</span>
                                                        <div className="pro-details-size-content" style={{ display: "flex" }}>
                                                            {option.optionValues.map((singleSize, key) => {
                                                                return (
                                                                    <div
                                                                        style={{
                                                                            flexDirection: "column ",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            marginRight: 15,
                                                                        }}
                                                                        key={key}
                                                                    >
                                                                        {singleSize.image && (
                                                                            <img src={convertBase64Image(singleSize.image)} alt="product-option" />
                                                                        )}

                                                                        <label className={`pro-details-size-content--single`} key={key}>
                                                                            <input
                                                                                type="checkbox"
                                                                                value={singleSize.description.name}
                                                                                name={option.name}
                                                                                checked={checkedOrNot(singleSize)}
                                                                                onChange={() => {
                                                                                    onChangeOptions(singleSize, option);
                                                                                }}
                                                                            />
                                                                            <span className="size-name">
                                                                                {singleSize.description.name} {singleSize.price && "(" + singleSize.price + ")"}
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            );
                                        })}
                                    </div>
                                ) : (
                                    ""
                                )}
                                {
                                    <div className="pro-details-quality">
                                        <div className="cart-plus-minus">
                                            <button onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)} className="dec qtybutton">
                                                -
                                            </button>
                                            <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
                                            <button
                                                onClick={() => setQuantityCount(quantityCount < product.quantity ? quantityCount + 1 : quantityCount)}
                                                className="inc qtybutton"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="pro-details-cart btn-hover">
                                            {!!+product.available && !!+product.canBePurchased && !!+product.visible && product.quantity > 0 ? (
                                                <button
                                                    onClick={() => {
                                                        if (!userData) history.push("/login");
                                                        else {
                                                            let options = [];
                                                            selectedProductColor.forEach((a) => {
                                                                options.push({ id: a.id });
                                                            });
                                                            addToCart(product, addToast, cartData, quantityCount, defaultStore, options, userData, strings);
                                                        }
                                                    }}
                                                >
                                                    Add to cart
                                                </button>
                                            ) : (
                                                <button disabled>Out of Stock</button>
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}

ProductModal.propTypes = {
    addtoast: PropTypes.func,
    addtocart: PropTypes.func,
    finaldiscountedprice: PropTypes.string,
    finalproductprice: PropTypes.string,
    onHide: PropTypes.func,
    product: PropTypes.object,
    show: PropTypes.bool,
};

function defaultImage(product) {
    if (product.images && product.images.length > 0) {
        return "data:image/png;base64," + product.images[0].baseImage;
    } else if (product.image != null) {
        return "data:image/png;base64," + product.baseImage;
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (value) => {
            dispatch(setLoader(value));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
