import PropTypes from "prop-types";
import React from "react";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopManufacture from "../../components/product/ShopManufacture";

const ShopSidebar = ({ string, getCategoryParams, getSortParams, sideSpaceClass, uniqueCategories, uniqueColors, uniqueSizes, uniqueManufacture }) => {
    return (
        <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
            {/* shop search */}
            {/* <ShopSearch strings={strings} /> */}

            {/* filter by categories */}
            {uniqueCategories && uniqueCategories.length > 0 && (
                <ShopCategories string={string} categories={uniqueCategories} getCategoryParams={getCategoryParams} />
            )}

            {/* filter by manufacture */}
            {uniqueManufacture && uniqueManufacture.length > 0 && (
                <ShopManufacture string={string} manufactures={uniqueManufacture} getSortParams={getSortParams} />
            )}

            {/* filter by color */}
            {uniqueColors && uniqueColors.length > 0 && <ShopColor string={string} colors={uniqueColors} getSortParams={getSortParams} />}

            {/* filter by size */}
            {uniqueSizes && uniqueSizes.length > 0 && <ShopSize string={string} sizes={uniqueSizes} getSortParams={getSortParams} />}

            {/* filter by tag */}
            {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
        </div>
    );
};

ShopSidebar.propTypes = {
    getSortParams: PropTypes.func,
    products: PropTypes.array,
    sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
