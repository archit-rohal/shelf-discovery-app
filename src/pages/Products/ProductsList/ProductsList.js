import "./ProductsList.css"
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../contexts/DataProvider";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai';
import NoProductsFound from "../../../components/NoProductsFound";
import {NavLink} from "react-router-dom";
import {FiltersContext} from "../../../contexts/FiltersProvider";

const ProductsList = () => {
    const {
        addToCart,
        addToWishlist,
        isItemInCart,
        isItemInWishlist,
        deleteFromWishlist
    } = useContext(DataContext);
    const {activeBooklist} = useContext(FiltersContext)
    const activeBooklistSize = activeBooklist.length;
    const [isComponentMounted, setIsComponentMounted] = useState(false)
    useEffect(() => {
        setIsComponentMounted(true);
    }, []);
    if (activeBooklist.length > 0) {
        return (
            <div className="productslist">
                <h3 className="productscount">Showing all products (<span
                    className="totalproducts">{activeBooklistSize}</span>)</h3>
                {(activeBooklist).map(({
                                           _id: id,
                                           img,
                                           name,
                                           author,
                                           discountedPrice,
                                           price,
                                           isBestSeller,
                                           rating
                                       }) =>
                    <section key={id} className="productcard">
                        <span style={{display: isBestSeller ? "inline" : "none"}}
                              className="bestseller">Best Seller</span>
                        <NavLink className="covercontainer" to={`/product-details/${id}`}>
                            <img src={img} alt="book-cover" className="bookcover"/>
                        </NavLink>
                        <div className="namerating">
                            <p className="name">{name}</p>
                            <p className="rating">{rating}<AiOutlineStar className="ratingstar"/></p>
                        </div>
                        <p className="author">{author}</p>
                        <div className="allprices">
                            <p className="price">{discountedPrice}</p>
                            <p className="discounted-price">{price}</p>
                        </div>
                        <div className="btn-container">
                            {isItemInCart(id) ?
                                <NavLink to={`/cart`} className={"cart-link"}>Go to cart</NavLink> :
                                <button type="button" className="cart-btn" onClick={() => addToCart(id)}>Add to cart
                                </button>}
                            {isItemInWishlist(id) ?
                                <button type="button" className="wishlist-btn" onClick={() => deleteFromWishlist(id)}>
                                    <AiFillHeart
                                        size="35px" color="tomato"/>
                                </button> :
                                <button type="button" className="wishlist-btn" onClick={() => addToWishlist(id)}>
                                    <AiOutlineHeart
                                        size="35px" color="tomato"/>
                                </button>}
                        </div>
                    </section>
                )}
            </div>
        )
    } else if (!activeBooklistSize && isComponentMounted) { //isComponentMounted necessary to prevent the brief rendering of NoProductsFound.js when the loading spinner is spinning and the api response has not yet been received
        return (
            <NoProductsFound activeBooklistSize={activeBooklistSize}/>
        )
    }
}
export default ProductsList