import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import WebService from "../../util/webService";
import constant from "../../util/constant";
import { setLoader } from "../../redux/actions/loaderActions";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
const CategoryProduct = ({ setLoader, spaceTopClass, spaceBottomClass, category, containerClass, extraClass, defaultStore, currentLanguageCode }) => {
    // const [featuredData, setFeaturedData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        getCategoryList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getCategoryList = async () => {
        setLoader(true);

        let action =
            constant.ACTION.CATEGORY + constant.ACTION.CATEGORYHIERARCHYLIST + "?count=20&page=0&store=" + defaultStore + "&lang=" + currentLanguageCode;
        try {
            let response = await WebService.get(action);
            if (response) {
                let category = response.filter((item) => item.code === "Categories");
                setCategoryData(category[0].children);
            }
            setLoader(false);
        } catch (error) {
            console.log(error.messages);
            setLoader(false);
            // console.log(error)
            // history.push('/not-found')
        }
    };

    return (
        <div className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""} ${extraClass ? extraClass : ""}`}>
            <div className={`${containerClass ? containerClass : "container"}`}>
                <SectionTitle titleText="Categories" positionClass="text-center" />
                <div className="row mt-4">
                    {categoryData.map((value, key) => (
                        <div className="col-md-4" key={key}>
                            <div
                                className="category-wrap ftco-animate category-img mb-4 d-flex align-items-end fadeInUp ftco-animated"
                                style={{ backgroundImage: `url(data:image/png;base64,${value.image})` }}
                            >
                                <div className="text px-3 py-1">
                                    <h2 className="mb-0">
                                        <a href={`/category/${value.description.friendlyUrl}`}>
                                            <font>{value.description.name}</font>
                                        </a>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

CategoryProduct.propTypes = {
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(CategoryProduct));
