import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import WebService from "../../util/webService";
import constant from "../../util/constant";
// import { setCurrency } from "../../redux/actions/currencyActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({ strings, currentLanguageCode, dispatch, borderStyle, profileData, merchant }) => {
    const [message, setMessage] = useState("");
    useEffect(() => {
        getContentMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**Home page hero content */
    const getContentMessage = async () => {
        let action = constant.ACTION.CONTENT + constant.ACTION.HEADER_MESSAGE + "?lang=" + currentLanguageCode;
        try {
            let response = await WebService.get(action);
            if (response) {
                setMessage(response.description.description);
            }
        } catch (error) {}
    };

    return (
        <div className={`header-top-wap ${borderStyle === "fluid-border" ? "border-bottom" : ""}`}>
            <LanguageCurrencyChanger currentLanguageCode={currentLanguageCode} merchant={merchant} dispatch={dispatch} />
            <div className="header-offer">
                {!profileData ? (
                    <p dangerouslySetInnerHTML={{ __html: message.replace("]]>", "") }}></p>
                ) : (
                    <p>sdfsdf</p>
                    // <p>{profileData.delivery.address}</p>
                )}
            </div>
        </div>
    );
};

HeaderTop.propTypes = {
    borderStyle: PropTypes.string,
    currentLanguageCode: PropTypes.string,
    dispatch: PropTypes.func,
    strings: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(HeaderTop));
