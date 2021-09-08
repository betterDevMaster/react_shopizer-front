import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import HeaderTop from "../../components/header/HeaderTop";
import WebService from "../../util/webService";
import constant from "../../util/constant";
import { setMerchant } from "../../redux/actions/storeAction";
import { getCurrentLocation } from "../../redux/actions/userAction";
import { fetchCategories } from "../../redux/actions/categoryActions";

const Header = ({
    setMerchant,
    merchant,
    layout,
    top,
    borderStyle,
    headerPaddingClass,
    headerPositionClass,
    headerBgClass,
    defaultStore,
    getCurrentLocation,
    currentLanguageCode,
    strings,
    fetchCategories,
    categoryData,
}) => {
    const history = useHistory();
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);
    // const [categoryData, setCategoryData] = useState([]);
    // const [contentData, setContentData] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        checkServerHealth();

        const header = document.querySelector(".sticky-bar");
        setHeaderTop(header.offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const checkServerHealth = async () => {
        try {
            let response = await WebService.get(constant.ACTION.CUSTOMER + constant.ACTION.PING);

            if (response) {
                if (response.status === "UP") {
                    setMerchant();
                    getCurrentLocation();
                    getCategoryHierarchy();
                    // getContent();
                } else {
                    history.push("/not-found");
                }
            }
        } catch (error) {
            history.push("/not-found");
        }
    };

    const getCategoryHierarchy = () => {
        fetchCategories(defaultStore, currentLanguageCode);
    };

    // const getContent = async () => {
    //     //TODO PAGE + COUNT
    //     let action = constant.ACTION.CONTENT + constant.ACTION.PAGES + "?page=0&count=20&store=" + defaultStore + "&lang=" + currentLanguageCode;
    //     try {
    //         let response = await WebService.get(action);
    //         if (response) {
    //             setContentData(response.items);
    //         }
    //     } catch (error) {}
    // };
    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    return (
        <header className={`header-area clearfix ${headerBgClass ? headerBgClass : ""} ${headerPositionClass ? headerPositionClass : ""}`}>
            <div
                className={`${headerPaddingClass ? headerPaddingClass : ""} ${top === "visible" ? "d-none d-lg-block" : "d-none"} header-top-area ${
                    borderStyle === "fluid-border" ? "border-none" : ""
                }`}
            >
                <div className={layout === "container-fluid" ? layout : "container"}>
                    {/* header top */}
                    <HeaderTop borderStyle={borderStyle} />
                </div>
            </div>

            <div className={`${headerPaddingClass ? headerPaddingClass : ""} sticky-bar header-res-padding clearfix ${scroll > headerTop ? "stick" : ""}`}>
                <div className={layout === "container-fluid" ? layout : "container"}>
                    <div className="row align-item-center">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                            {/* header logo */}
                            {merchant.logo != null && <Logo imageUrl={process.env.REACT_APP_APP_HTTP_URL + merchant.logo.path} logoclassName="logo" />}
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                            {/* Search */}
                            <div className="search-area">
                                <svg className="jss3665" fill="#9E9E9E" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M4.39168921 4.39168921c2.97774772-2.97774773 7.80563069-2.97774773 10.78337839 0 2.8287763 2.82877624 2.970295 7.32720029.4245561 10.32303559l4.8787448 4.8797602c.2440777.2440777.2440777.6398058 0 .8838835-.2218888.2218888-.5691086.2420605-.8137848.0605151l-.0700987-.0605151-4.8789968-4.8793935c-2.9958345 2.5464116-7.49478248 2.4051091-10.32379899-.4239074-2.97774773-2.9777477-2.97774773-7.80563067 0-10.78337839zm.88388347.88388347c-2.48959236 2.48959236-2.48959236 6.52601912 0 9.01561142 2.48959236 2.4895924 6.52601912 2.4895924 9.01561142 0 2.4895924-2.4895923 2.4895924-6.52601906 0-9.01561142-2.4895923-2.48959236-6.52601906-2.48959236-9.01561142 0z"></path>
                                </svg>
                                <div className="searh-input">
                                    <input
                                        autoComplete="off"
                                        name="searchQuery"
                                        placeholder={strings["Search here..."]}
                                        type="text"
                                        onChange={(e) => setSearchKey(e.target.value)}
                                    />
                                </div>
                                <Link className="search-button" to={process.env.PUBLIC_URL + "/search/" + searchKey}>
                                    <span>{strings["Search"]}</span>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                            {/* Icon group */}
                            <IconGroup />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 d-none d-lg-block">
                            {/* Nav menu */}
                            <NavMenu categories={categoryData} />
                            {/* <NavMenu categories={categoryData} contents={contentData} /> */}
                        </div>
                    </div>
                </div>
                {/* mobile menu */}
                <MobileMenu categories={categoryData} />
                {/* <MobileMenu categories={categoryData} contents={contentData} /> */}
            </div>
        </header>
    );
};

Header.propTypes = {
    // merchant: PropTypes.string,
    borderStyle: PropTypes.string,
    headerPaddingClass: PropTypes.string,
    headerPositionClass: PropTypes.string,
    layout: PropTypes.string,
    top: PropTypes.string,
    setMerchant: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        merchant: state.merchantData.merchant,
        currentLanguageCode: state.multilanguage.currentLanguageCode,
        defaultStore: state.merchantData.defaultStore,
        categoryData: state.categoryData.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMerchant: () => {
            dispatch(setMerchant());
        },
        getCurrentLocation: () => {
            dispatch(getCurrentLocation());
        },
        fetchCategories: (store, lang) => {
            dispatch(fetchCategories(store, lang));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Header));

// export default HeaderOne;
