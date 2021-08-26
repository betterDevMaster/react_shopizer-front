import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { addToCart } from "../../redux/actions/cartActions";
import { isValidObject } from "../../util/helper";

const ProductGrid = ({
    products,
    currency,
    addToCart,
    cartData,
    sliderClassName,
    spaceBottomClass,
    colorClass,
    titlePriceClass,
    userData,
}) => {
    return (
        <Fragment>
            {products.map((product) => {
                return (
                    <ProductGridSingle
                        sliderClassName={sliderClassName}
                        spaceBottomClass={spaceBottomClass}
                        colorClass={colorClass}
                        product={product}
                        addToCart={addToCart}
                        cartData={cartData}
                        userData={userData}
                        key={product.id}
                        titlePriceClass={titlePriceClass}
                    />
                );
            })}
        </Fragment>
    );
};

ProductGrid.propTypes = {
    addToCart: PropTypes.func,
    compareItems: PropTypes.array,
    currency: PropTypes.object,
    products: PropTypes.array,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string,
    titlePriceClass: PropTypes.string,
    wishlistItems: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
    return {
        cartData: state.cartData.cartItems,
        userData: state.userData.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (
            item,
            addToast,
            cartData,
            quantityCount,
            defaultStore,
            selectedProductColor,
            userData,
        ) => {
            let index = isValidObject(cartData) ? cartData.products.findIndex((order) => order.id === item.id) : -1;
            dispatch(
                addToCart(
                    item,
                    addToast,
                    cartData.code,
                    index === -1 ? quantityCount : cartData.products[index].quantity + quantityCount,
                    defaultStore,
                    selectedProductColor,
                    userData,
                )
            );
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
