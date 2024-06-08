import React from 'react'
import fossilImage from "../../src/assets/fossil.webp"

const NoProductsFound = ({activeBooklistSize}) => {
    return (
        <div className="productslist">
            <h3 className="productscount">Showing all products (<span
                className="totalproducts">{activeBooklistSize}</span>)</h3>
            <div className="fossil-container">
                <img src={fossilImage}
                     alt="Sorry, No Products Found" style={{height: "86vh", objectFit: "contain"}} className="fossil"/>
                <p className="fossil-caption">The products are extinct!</p>
            </div>
        </div>
    )
}
export default NoProductsFound