import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../../layouts/Layout";
import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import CategoryProduct from "../../wrappers/product/CategoryProduct";
import BestSellerProduct from "../../wrappers/product/BestSellerProduct";
import StaticLogo from "../../wrappers/staticLogo/StaticLogo";
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
                <CategoryProduct category="fashion" spaceBottomClass="pb-30" spaceTopClass="pt-50" />
                {/* Best Seller */}
                <BestSellerProduct category="fashion" spaceBottomClass="pb-30"/>
                {/* Advertise Picture */}
                <StaticLogo/>
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
