import React, {useContext} from 'react'
import "./Wishlist.css"
import {DataContext} from "../../contexts/DataProvider";
import {AiOutlineStar} from 'react-icons/ai';

const Wishlist = () => {
    const {wishlist, deleteFromWishlist, isItemInCart, addToCart, cart, reviseItemQuantity} = useContext(DataContext);
    return (
        <div className="wishlist">
            <h1 className="wishlist-title">Wishlist <span className="wishlist-count">({wishlist.length})</span></h1>
            <main className="wishlist-container">
                {wishlist.map(({_id: id, img, name, author, discountedPrice, price, isBestSeller, rating}) =>
                    <article className="product-wrapper" key={id}>
                        <figure className="image-wrapper">
                            <img src={img} alt="book-cover" className="image-display"/>
                        </figure>
                        <span className="bestseller-tag"
                              style={{display: isBestSeller ? "inline" : "none"}}>Best Seller</span>
                        <p className="w-name">{name}</p>
                        <div className="rating-wrapper">
                            <span className="w-rating">{rating}<AiOutlineStar/></span>
                        </div>
                        <p className="w-author">{author}</p>
                        <div className="prices-group">
                            <p className="w-discount">{discountedPrice}</p>
                            <p className="w-price">{price}</p>
                            <p className="w-percent">{`(${Math.round((1 - discountedPrice / price) * 100)}% off)`}</p>
                        </div>
                        <div className="w-buttons">
                            <button type="button" className={"wishlist-remove-btn"}
                                    onClick={() => deleteFromWishlist(id)}>Remove from wishlist
                            </button>
                            {isItemInCart(id) ? <p className={"add-another-btn"} onClick={() =>
                                    reviseItemQuantity(id, "up")
                                }>Add another to cart ({cart.find(({_id}) => _id === id).qty})</p> :
                                <button type={"button"} className={"add-to-cart-btn"} onClick={() => addToCart(id)}>Add
                                    to cart</button>}
                        </div>
                    </article>
                )}
            </main>
        </div>
    )
}
export default Wishlist