import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";

import { setCategoryID, setPageNumber } from "../../redux/actions/productActions";
import { setContent } from "../../redux/actions/contentAction";

const NavMenu = ({ props, strings, menuWhiteClass, sidebarMenu, categories, setCategoryID, setPageNumber, setContent }) => {
// const NavMenu = ({ props, strings, menuWhiteClass, sidebarMenu, categories, contents, setCategoryID, setContent }) => {

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
                    {item.children && item.children.length > 0 ? (
                        sidebarMenu ? (
                            <span>
                                <i className="fa fa-angle-right"></i>
                            </span>
                        ) : (
                            <i className="fa fa-angle-down" />
                        )
                    ) : (
                        ""
                    )}
                </div>
            )
        );
    };

    return (
        <div className={`${sidebarMenu ? "sidebar-menu" : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`} `}>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>{strings["Home"]}</Link>
                    </li>
                    {categories &&
                        categories.map((item, index) => {
                            return (
                                !!+item.visible && (
                                    <li key={index}>
                                        {/* {item.children.length === 0 ? ( */}
                                            <Link
                                                to={"/category/" + item.description.friendlyUrl}
                                                onClick={() => onClickCategory(item)}
                                            >
                                                <ItemDescription item={item} sidebarMenu={sidebarMenu} />
                                            </Link>
                                        {/* ) : (
                                            <ItemDescription item={item} sidebarMenu={sidebarMenu} />
                                        )} */}
                                        {item.children && item.children.length > 0 && (
                                            <ul className="submenu">
                                                {item.children.map((submenu, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link
                                                                to={"/category/" + submenu.description.friendlyUrl}
                                                                onClick={() => onClickCategory(submenu)}
                                                            >
                                                                {submenu.description.name}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                )
                            );
                        })}
                    {/* {contents && contents.map((content, index) => {
                        return (
                            !!+content.visible &&
                            content.description && (
                                <li key={index}>
                                    <Link to={contactsUrl(content.code === "contacts", content.description.friendlyUrl)} onClick={() => onClickContent(content.code)}>
                                        {content.description.name}
                                    </Link>
                                </li>
                            )
                        );
                    })} */}
                </ul>
            </nav>
        </div>
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
