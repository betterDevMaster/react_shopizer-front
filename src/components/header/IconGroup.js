import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart, deleteAllFromCart } from "../../redux/actions/cartActions";
import { setUser } from "../../redux/actions/userAction";
import { getCart } from "../../redux/actions/cartActions";
import { setLocalData, getLocalData } from "../../util/helper";
import { multilanguage } from "redux-multilanguage";
import IdleTimer from "react-idle-timer";
import constant from "../../util/constant";
import WebService from "../../util/webService";

const IconGroup = ({
    cartData,
    cartCount,
    deleteFromCart,
    iconWhiteClass,
    userData,
    setUser,
    deleteAllFromCart,
    strings,
    getCart,
    profileData,
}) => {
    const pathname = useRouteMatch();
    const history = useHistory();
    const timeout = 1000 * 60 * 30;
    // const [useDetails, setUseDetails] = useState({});
    const [iconHover, setIconHover] = useState("");

    useEffect(() => {
        if (getLocalData("thekey") === process.env.REACT_APP_APP_BASE_URL) {
            setLocalData("thekey", process.env.REACT_APP_APP_BASE_URL);
        } else {
            logout();
            setLocalData("thekey", process.env.REACT_APP_APP_BASE_URL);
        }
        if (getLocalData("GET_SHOPIZER_CART_ID")) getCart(getLocalData("GET_SHOPIZER_CART_ID"));
        if (getLocalData("uid") && getLocalData("token"))
            setUser({ id: getLocalData("uid"), token: getLocalData("token") });
        // getProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const getProfile = async () => {
    //     // let uid = getLocalData("uid") ? getLocalData("uid") : userData ? userData.id : null;
    //     if (userData) {
    //         let action = constant.ACTION.CUSTOMER + constant.ACTION.PROFILE + "?id=" + userData.id;
    //         try {
    //             let response = await WebService.get(action);
    //             if (response) {
    //                 setUseDetails(response);
    //             }
    //         } catch (error) {
    //             setUser("");
    //             setLocalData("token", "");
    //             history.push("/");
    //         }
    //     }
    // };

    const handleClick = (e) => {
        e.currentTarget.nextSibling.classList.toggle("active");
    };

    const triggerMobileMenu = () => {
        const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
        offcanvasMobileMenu.classList.add("active");
    };

    const logout = () => {
        setUser("");
        setLocalData("token", "");
        deleteAllFromCart();
    };

    const onAction = (e) => {
        setLocalData("session", new Date());
    };

    const onActive = (e) => {
        setLocalData("session", new Date());
    };

    const onIdle = (e) => {
        logout();
    };

    return (
        <div className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}>
            <IdleTimer
                element={document}
                onActive={onActive}
                onIdle={onIdle}
                onAction={onAction}
                debounce={250}
                timeout={timeout}
            />
            <div className="same-style account-setting d-none d-lg-block">
                {/* {pathname.url !== "/checkout" && ( */}
                <button
                    className="account-setting-active"
                    onClick={(e) => handleClick(e)}
                    onMouseEnter={() => {
                        setIconHover("setting");
                    }}
                >
                    <i className="pe-7s-user-female" />
                </button>
                {/* )} */}
                {iconHover === "setting" && (
                    <div className="account-dropdown active" onMouseLeave={() => setIconHover("")}>
                        <ul>
                            {!userData ? (
                                <div>
                                    <li>
                                        <Link to={"/login"}>{strings["Login"]}</Link>
                                    </li>
                                    <li>
                                        <Link to={"/register"}>{strings["Register"]}</Link>
                                    </li>
                                </div>
                            ) : (
                                <>
                                    <div className="user-profile">
                                        <div className="user-name">
                                            Welcome {profileData.firstName} {profileData.lastName}
                                        </div>
                                        <span className="user-email">{profileData.emailAddress}</span>
                                    </div>
                                    <li className="border-line"></li>
                                    <div style={{ marginTop: 12 }}>
                                        <li>
                                            <Link to={"/my-account"}>{strings["My Account"]}</Link>
                                        </li>
                                        <li>
                                            <Link to={"/recent-order"}>{strings["Recent Orders"]}</Link>
                                        </li>
                                        <li>
                                            <Link to={"/login"} onClick={logout}>
                                                {strings["Logout"]}
                                            </Link>
                                        </li>
                                    </div>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            {/* {pathname.url !== "/checkout" && ( */}
            <div className="same-style cart-wrap d-none d-lg-block">
                <button className="icon-cart" onClick={(e) => handleClick(e)} onMouseEnter={() => setIconHover("cart")}>
                    <i className="pe-7s-shopbag" />
                    <span className="count-style">{cartCount}</span>
                </button>
                {/* menu cart */}
                {iconHover === "cart" && (
                    <MenuCart
                        cartData={cartData}
                        deleteFromCart={deleteFromCart}
                        onMouseLeave={() => setIconHover("")}
                    />
                )}
            </div>
            {/* )} */}
            <div className="same-style cart-wrap d-block d-lg-none">
                <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
                    <i className="pe-7s-shopbag" />
                    <span className="count-style">{cartCount}</span>
                </Link>
            </div>
            <div className="same-style mobile-off-canvas d-block d-lg-none">
                <button className="mobile-aside-button" onClick={() => triggerMobileMenu()}>
                    <i className="pe-7s-menu" />
                </button>
            </div>
        </div>
    );
};

IconGroup.propTypes = {
    cartData: PropTypes.object,
    iconWhiteClass: PropTypes.string,
    deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        cartData: state.cartData.cartItems,
        cartCount: state.cartData.cartCount,
        userData: state.userData.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromCart: (cartId, item, defaultStore, addToast, userData) => {
            dispatch(deleteFromCart(cartId, item, defaultStore, addToast, userData));
        },
        setUser: (data) => {
            dispatch(setUser(data));
        },
        deleteAllFromCart: () => {
            dispatch(deleteAllFromCart());
        },
        getCart: (cartId) => {
            dispatch(getCart(cartId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(IconGroup));
