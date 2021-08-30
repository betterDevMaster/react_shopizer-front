import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../../layouts/Layout";
import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import TabProduct from "../../wrappers/product/TabProduct";
import CategoryProduct from "../../wrappers/product/CategoryProduct";
import Newsletter from "../../wrappers/newsletter/Newsletter";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
const Home = ({ merchant, strings }) => {
    return (
        <Fragment>
            <MetaTags>
                <title>{merchant.name}</title>
                <meta name="description" content="Fashion home of flone react minimalist eCommerce template." />
            </MetaTags>
            <Layout headerContainerClass="container-fluid" headerPaddingClass="header-padding-2" headerTop="visible">
                {/* hero slider */}
                <HeroSlider string={strings} />
                {/* tab product */}
                <CategoryProduct category="fashion" spaceBottomClass="pb-100" spaceTopClass="pt-100" />
                {/* newsletter */}
                <Newsletter spaceTopClass="pt-100" spaceBottomClass="pb-100" subscribeBtnClass="dark-red-subscribe" />
            </Layout>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        merchant: state.merchantData.merchant,
    };
};

export default connect(mapStateToProps, null)(multilanguage(Home));
// export default HomeFashionSeven;
