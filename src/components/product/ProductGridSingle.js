import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import ProductModal from "./ProductModal";
import { setProductID } from "../../redux/actions/productActions";
const ProductGridSingleTwo = ({
    product,
    addToCart,
    cartData,
    sliderClassName,
    spaceBottomClass,
    colorClass,
    titlePriceClass,
    defaultStore,
    setProductID,
    userData,
}) => {
    const [modalShow, setModalShow] = useState(false);
    const { addToast } = useToasts();
    const history = useHistory();
    const finalProductPrice = product.originalPrice;
    const finalDiscountedPrice = product.finalPrice;
    const onClickProductDetails = (id) => {
        setProductID(id);
    };
    const convertBase64Image = (image) => {
        return "data:image/png;base64," + image;
    };

    return (
        !!+product.visible &&
        product.description && (
            <Fragment>
                <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
                    <div className={`product-wrap-2 ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""} `}>
                        <div className="product-img">
                            <Link to={process.env.PUBLIC_URL + "/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
                                {product.images && product.images.length > 0}
                                {!product.images[0].baseImage ? (
                                    <img src={convertBase64Image(product.images[0].baseImage)} alt="" />
                                ) : (
                                    <img src={convertBase64Image(product.images[0].baseImage)} alt="" style={{ height: "270px" }} />
                                )}
                            </Link>
                            <div className="product-action-2">
                                <Link
                                    to={`product/${product.description.friendlyUrl}`}
                                    onClick={() => onClickProductDetails(product.id)}
                                    title="Select options"
                                >
                                    <i className="fa fa-cog"></i>
                                </Link>
                                {!!+product.available && !!+product.canBePurchased && !!+product.visible && product.quantity > 0 && (
                                    <button
                                        onClick={() => {
                                            if (!userData) history.push("/login");
                                            else addToCart(product, addToast, cartData, 1, defaultStore, undefined, userData);
                                        }}
                                        className="active"
                                        title="Add to cart"
                                    >
                                        <i className="fa fa-shopping-cart"></i>
                                    </button>
                                )}
                                <button onClick={() => setModalShow(true)} title="Quick View">
                                    <i className="fa fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div className="product-content-2">
                            <div className={`title-price-wrap-2 ${titlePriceClass ? titlePriceClass : ""}`}>
                                <h3>
                                    <Link
                                        to={process.env.PUBLIC_URL + "/product/" + product.description.friendlyUrl}
                                        onClick={() => onClickProductDetails(product.id)}
                                    >
                                        {product.description.name}
                                    </Link>
                                </h3>
                                <div className="price-2">
                                    {!!+product.discounted ? (
                                        <Fragment>
                                            <span>USD {finalDiscountedPrice}</span> <span className="old">USD {finalProductPrice}</span>
                                        </Fragment>
                                    ) : (
                                        <span>USD {finalProductPrice} </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    product={product}
                    defaultStore={defaultStore}
                    finalproductprice={finalProductPrice}
                    finaldiscountedprice={finalDiscountedPrice}
                    addtocart={addToCart}
                    cartData={cartData}
                    userData={userData}
                    addtoast={addToast}
                />
            </Fragment>
        )
    );
};

ProductGridSingleTwo.propTypes = {
    addToCart: PropTypes.func,
    product: PropTypes.object,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string,
    titlePriceClass: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        defaultStore: state.merchantData.defaultStore,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setProductID: (value) => {
            dispatch(setProductID(value));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductGridSingleTwo);
