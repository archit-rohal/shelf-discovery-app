import React from 'react'
import "./ProductsPage.css"
import Filters from "./Filters/Filters";
import ProductsList from "./ProductsList/ProductsList";

const ProductsPage = () => {
    return (
        <div className="productspage">
            <Filters/>
            <ProductsList/>
        </div>
    )
}
export default ProductsPage
