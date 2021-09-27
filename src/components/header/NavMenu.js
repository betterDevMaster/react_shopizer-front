import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";

import { setCategoryID, setPageNumber } from "../../redux/actions/productActions";
import { setContent } from "../../redux/actions/contentAction";

const NavMenu = ({ props, strings, menuWhiteClass, sidebarMenu, categories, setCategoryID, setPageNumber, setContent }) => {
    // const NavMenu = ({ props, strings, menuWhiteClass, sidebarMenu, categories, contents, setCategoryID, setContent }) => {
    const [categoryHover, setCategoryHover] = useState(0);
    const [subCategoryHover, setSubCategoryHover] = useState(0);

    const onClickCategory = (item) => {
        setCategoryID(item.id);
        setPageNumber(0);
    };

    // const onClickContent = (item) => {
    //     setContent(item);
    // };

    // const contactsUrl = (isContacts, url) => {
    //     return isContacts ? "/" + url : "/content/" + url;
    // };

    const ItemDescription = ({ item, sidebarMenu }) => {
        return (
            item && (
                <div className="parentWithChild">
                    {item.description.name}
                    {/* {item.children && item.children.length > 0 ? (
                        sidebarMenu ? (
                            <span>
                                <i className="fa fa-angle-right"></i>
                            </span>
                        ) : (
                            <i className="fa fa-angle-down" />
                        )
                    ) : (
                        ""
                    )} */}
                </div>
            )
        );
    };

    return (
        <nav className={`${sidebarMenu ? "sidebar-menu" : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`} `}>
            <ul className="main-menu-ul">
                {categories &&
                    categories.map((item, index) => {
                        return (
                            !!+item.visible && (
                                <li className="main-menu-li" key={index}>
                                    <Link
                                        className="main-menu-li-a"
                                        to={"/category/" + item.description.friendlyUrl}
                                        onClick={() => onClickCategory(item)}
                                        onMouseEnter={() => {
                                            setCategoryHover(item.id);
                                        }}
                                        // onMouseLeave={() => {
                                        //     setTimeout(() => {
                                        //         if (subCategoryHover === 0 && categoryHover === item.id) setCategoryHover(0);
                                        //     }, 500);
                                        // }}
                                    >
                                        <ItemDescription item={item} sidebarMenu={sidebarMenu} />
                                    </Link>
                                    {categoryHover === item.id && (
                                        <div
                                            className="main-menu-hover-container"
                                            // onMouseEnter={() => setSubCategoryHover(item.id)}
                                            onMouseLeave={() => {
                                                setCategoryHover(0);
                                                // setSubCategoryHover(0);
                                            }}
                                        >
                                            {item.children.map((submenu, index) => {
                                                return (
                                                    <div className="col-xl-3 col-lg-3 col-md-3 col-3 hover-space" key={index}>
                                                        <div className="child-container">
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                                                <h4>
                                                                    <Link
                                                                        to={"/category/" + submenu.description.friendlyUrl}
                                                                        onClick={() => onClickCategory(submenu)}
                                                                    >
                                                                        {submenu.description.name}
                                                                    </Link>
                                                                </h4>
                                                            </div>
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                                                <ul>
                                                                    {submenu.children.map((subsubmenu, index) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <Link
                                                                                    to={"/category/" + subsubmenu.description.friendlyUrl}
                                                                                    onClick={() => onClickCategory(subsubmenu)}
                                                                                >
                                                                                    {subsubmenu.description.name}
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                    <li className="jss1989">
                                                                        <Link
                                                                            to={"/category/" + submenu.description.friendlyUrl}
                                                                            onClick={() => onClickCategory(submenu)}
                                                                        >
                                                                            See everything
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </li>
                            )
                        );
                    })}
            </ul>
        </nav>
    );
};

NavMenu.propTypes = {
    menuWhiteClass: PropTypes.string,
    sidebarMenu: PropTypes.bool,
    strings: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCategoryID: (value) => {
            dispatch(setCategoryID(value));
        },
        setPageNumber: (value) => {
            dispatch(setPageNumber(value));
        },
        setContent: (value) => {
            dispatch(setContent(value));
        },
    };
};
export default connect(null, mapDispatchToProps)(multilanguage(NavMenu));
// export default multilanguage(NavMenu);
