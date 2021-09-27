import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { setCategoryID, setPageNumber } from "../../../redux/actions/productActions";
import { setContent } from "../../../redux/actions/contentAction";

const MobileNavMenu = ({ strings, categories, setCategoryID, setPageNumber, setContent }) => {
    // const MobileNavMenu = ({ strings, categories, contents, setCategoryID, setContent }) => {
    const onClickCategory = (item) => {
        setCategoryID(item.id);
        setPageNumber(0)
    };

    // const onClickContent = (item) => {
    //     setContent(item);
    // };

    // const contactsUrl = (isContacts, url) => {
    //     return isContacts ? "/" + url : "/content/" + url;
    // };

    return (
        <nav className="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li className="menu-item">
                    <Link to={"/"}>Home</Link>
                </li>

                {categories.map((item, index) => {
                    return (
                        !!+item.visible && (
                            <li className="menu-item-has-children" key={index}>
                                <Link to={"/category/" + item.description.friendlyUrl} onClick={() => onClickCategory(item)}>
                                    {item.description.name}
                                </Link>
                                {item.children && item.children.length > 0 && (
                                    <ul className="sub-menu">
                                        {item.children.map((submenu, j) => {
                                            return (
                                                <li className="menu-item-has-children" key={j}>
                                                    <Link to={"/category/" + submenu.description.friendlyUrl} onClick={() => onClickCategory(submenu)}>
                                                        {strings[submenu.description.name] ? strings[submenu.description.name] : submenu.description.name}
                                                    </Link>
                                                    {submenu.children.length > 0 &&
                                                        <ul className="sub-menu">

                                                            {submenu.children.map((subsubmenu, index) => {
                                                                return (
                                                                    <li className="menu-item-has-children-children" key={index}>
                                                                        <Link
                                                                            to={"/category/" + subsubmenu.description.friendlyUrl}
                                                                            onClick={() => onClickCategory(subsubmenu)}
                                                                        >
                                                                            {subsubmenu.description.name}
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    }
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        )
                    );
                })}
                {/* {contents.map((content, index) => {
                    return (
                        !!+content.visible &&
                        content.description && (
                            <li key={index}>
                                <Link
                                    to={contactsUrl(content.code === "contacts", content.description.friendlyUrl)}
                                    onClick={() => onClickContent(content.code)}
                                >
                                    {content.description.name}
                                </Link>
                            </li>
                        )
                    );
                })} */}
            </ul>
        </nav>
    );
};

MobileNavMenu.propTypes = {
    strings: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCategoryID: (value) => {
            dispatch(setCategoryID(value));
        },
        setContent: (value) => {
            dispatch(setContent(value));
        },
        setPageNumber: (value) => {
            dispatch(setPageNumber(value));
        },
    };
};
export default connect(null, mapDispatchToProps)(multilanguage(MobileNavMenu));
// export default multilanguage(MobileNavMenu);
