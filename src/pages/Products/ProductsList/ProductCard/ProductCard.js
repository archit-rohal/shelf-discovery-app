import React, {useContext} from 'react'
import "./ProductCard.css"
import {NavLink, useParams} from "react-router-dom";
import {DataContext} from "../../../../contexts/DataProvider";
import {FaTag} from 'react-icons/fa'
import {FiltersContext} from "../../../../contexts/FiltersProvider";
import {starsCounter} from "../../../../helpers/starsCounter";

const ProductCard = () => {
    const {productId} = useParams();
    const {addToCart, addToWishlist, isItemInWishlist, isItemInCart} = useContext(DataContext);
    const {activeBooklist} = useContext(FiltersContext);
    const bookPicked = activeBooklist.filter(({_id: id}) => id === productId)
    return (
        <div className="product-card">
            {bookPicked.map(({_id, img, name, author, discountedPrice, price, isBestSeller, category, rating}) =>
                <main className="card-container" key={_id}>
                    <section className="book-cover-container">
                        <img src={img} alt="book-cover" className="product-display"/>
                    </section>
                    <section className="book-info-container">
                        <h1 className="product-name">{name}</h1>
                        <span style={{display: isBestSeller ? "inline" : "none"}}
                              className="bestseller-check">Best Seller</span>
                        <div className="rating-container">
                            {starsCounter(rating)}
                        </div>
                        <div className="prices-info">
                            <p className="after-discount"><b>{discountedPrice}</b></p>
                            <p className="before-discount">{price}</p>
                            <p className="discount-percent">{`(${Math.round((1 - discountedPrice / price) * 100)}% off)`}</p>
                        </div>
                        <div className="tags">
                            <p className="fastest-delivery"><span className="fatag"><FaTag/></span>Fastest delivery</p>
                            <p className="alltaxes"><span><FaTag/></span>Inclusive of all taxes</p>
                            <p className="cod"><span><FaTag/></span>Cash on delivery available</p>
                        </div>
                        <p>{category}</p>
                        <p>{author}</p>
                        <div className="buttons">
                            {!isItemInCart(_id) ?
                                <button type="button" className="cart-button" onClick={() => addToCart(_id)}>Add to cart
                                </button> : <NavLink to={"/cart"} className={"cart-navlink"}>Go to cart</NavLink>}

                            {!isItemInWishlist(_id) ?
                                <button type="button" className="wishlist-button" onClick={() => addToWishlist(_id)}>
                                    Add to wishlist
                                </button> :
                                <NavLink to={"/wishlist"} className={"wishlist-navlink"}>Go to Wishlist</NavLink>}
                        </div>
                    </section>
                </main>
            )}
        </div>
    )
}
export default ProductCard