import React, {useContext} from 'react'
import {DataContext} from "../../contexts/DataProvider";
import "./Cart.css";
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import {NavLink} from "react-router-dom";
import emptyCartImage from "../../assets/emptycart.png"

const Cart = () => {
    const {cart} = useContext(DataContext);
    const {deleteFromCart, addToWishlist, reviseItemQuantity, isItemInWishlist} = useContext(DataContext);
    const subTotal = cart.reduce((acc, {price, qty}) => acc + (qty ? price * qty : price), 0);
    const totalAmount = cart.reduce((acc, {
        discountedPrice,
        qty
    }) => acc + (qty ? discountedPrice * qty : discountedPrice), 0);
    const totalDiscount = subTotal - totalAmount;
    const totalCartItems = cart.reduce((acc, {qty}) => acc + qty, 0);
    return (
        <div className="cart">
            <h1 className="cart-title">Cart <span className="cart-count">({totalCartItems})</span></h1>
            <div className="foo">
                <NavLink to="/productlist" className={cart.length > 0 ? "hide-link" : "show-link"}>Explore</NavLink>
            </div>
            <div className="cart-wrapper">
                <main className="cart-container">
                    <section className="cart-items">
                        {cart.length === 0 ? (
                                <img src={emptyCartImage} alt="empty-cart" className="emptycart"/>
                            ) :
                            (cart?.map(({_id: id, img, name, author, price, discountedPrice, qty}) =>
                                    <article className="c-items-card" key={id}>
                                        <figure className="c-figure">
                                            <NavLink className="book-cover-navlink" to={`/product-details/${id}`}>
                                            <img src={img} alt="book-cover" className="c-book-cover"/>
                                            </NavLink>
                                            <figcaption className="c-figcaption">
                                                <p className="figcaption-title">{name}</p>
                                                <span className="c-author">{author}</span>
                                                <div className="c-prices">
                                                    <span className="sale-price">{discountedPrice}</span>
                                                    <span className="mrp">{price}</span>
                                                    <span
                                                        className="off-percent">{`(${Math.round((1 - discountedPrice / price) * 100)}% off)`}</span>
                                                </div>
                                                <div className="quantity-wrapper">
                                                    <button type="button" className="q-increment"
                                                            onClick={() => reviseItemQuantity(id, "up", qty)}>
                                                        <AiOutlinePlus/>
                                                    </button>
                                                    <span>{qty}</span>
                                                    <button type="button" className="q-decrement"
                                                            onClick={() => reviseItemQuantity(id, "down", qty)}>
                                                        <AiOutlineMinus/>
                                                    </button>
                                                </div>
                                                <div className="c-buttons">
                                                    <button type="button" className="remove-trigger"
                                                            onClick={() => deleteFromCart(id)}>Remove
                                                    </button>
                                                    {isItemInWishlist(id) ?
                                                        <p className={"wishlist-trigger"}>In Wishlist</p> :
                                                        <button type="button" className="wishlist-trigger"
                                                                onClick={() => addToWishlist(id)}>Move to wishlist
                                                        </button>}
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </article>
                                )
                            )}
                    </section>
                    <section className="summary-details">
                        <summary className="c-summary">
                            <h2 className="summary-title">Summary</h2>
                            <div>
                                <p>Sub-total: <strong>({`${totalCartItems} ${totalCartItems > 1 ? `items` : `item`} )`}</strong>
                                </p> <span>{subTotal}</span></div>
                            <p>Discount: <span>{totalDiscount}</span></p>
                            <p>Delivery charges: <span>Free</span></p>
                            <h3>Total Amount: <span>{totalAmount}</span></h3>
                            <p className="savings">You saved: <span>{totalDiscount}</span></p>
                            <NavLink to="/checkout" style={{display: cart.length > 0 ? "flex" : "none"}}
                                     className="checkout">Place order</NavLink>
                        </summary>
                    </section>
                </main>
            </div>
        </div>
    )
}
export default Cart