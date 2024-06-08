import {createContext, useContext, useEffect, useReducer} from "react";
import {dataReducer, initialData} from "../reducers/dataReducer";
import Spinner from "../assets/spinner/Spinner";
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {AuthContext} from "./AuthProvider";
import {LOADING_OFF, LOADING_ON} from "../reducers/authReducer";
import {
    modifyItemCount,
    getAllProducts,
    postToCart,
    postToWishlist,
    removeFromCart,
    removeFromWishlist
} from "../services/dataServices";

export const DataContext = createContext();
export const DataProvider = ({children}) => {
    const [data, dispatch] = useReducer(dataReducer, initialData);
    const {
        productslist, cart, wishlist, isPresentInCart, isPresentInWishlist
    } = data;
    const {loading, dispatchAuth, token} = useContext(AuthContext);
    const getAllBooks = async () => {
        dispatchAuth({type: LOADING_ON});
        try {
            const response = await getAllProducts();
            if (response.status === 200) {
                dispatchAuth({type: LOADING_OFF});
                const {products} = response.data;
                dispatch({type: "PULL_PRODUCTS", payload: [...products]})
            }
        } catch (e) {
            toast.error("Something went wrong !", {autoClose: 1000});
            console.error(e)
        } finally {
            dispatchAuth({type: LOADING_OFF});
        }
    }
    const addToCart = async (productId) => {
        dispatchAuth({type: LOADING_ON});
        const pickedProduct = productslist.find(({_id: id}) => id === productId);
        try {
            const response = await postToCart(pickedProduct, token);
            if (response.status === 201) {
                dispatchAuth({type: LOADING_OFF});
                toast.success("Item added to cart", {autoClose: 1000});
                dispatch({type: "PULL_CART_ITEMS", payload: [...response.data.cart]})
            }
        } catch (e) {
            toast.error("Something went wrong !", {autoClose: 1000});
            console.error(e)
        } finally {
            dispatchAuth({type: LOADING_OFF});
        }
    }
    const addToWishlist = async (productId) => {
        dispatchAuth({type: LOADING_ON});
        const pickedProduct = productslist.find(({_id: id}) => id === productId);
        try {
            const response = await postToWishlist(pickedProduct, token);
            if (response.status === 201) {
                dispatchAuth({type: LOADING_OFF});
                toast.success("Item added to wishlist", {autoClose: 1000});
                dispatch({type: "PULL_WISHLIST_ITEMS", payload: [...response.data.wishlist]})
            }
        } catch (e) {
            toast.error("Something went wrong !", {autoClose: 1000});
            console.error(e);
        } finally {
            dispatchAuth({type: LOADING_OFF});
        }
    }
    const deleteFromCart = async (productId) => {
        dispatchAuth({type: LOADING_ON});
        try {
            const response = await removeFromCart(productId, token);
            if (response.status === 200) {
                dispatchAuth({type: LOADING_OFF});
                dispatch({type: "UPDATE_CART", payload: response.data.cart});
                toast.success("Item removed from wishlist", {autoClose: 1000});
            }
        } catch (e) {
            toast.error("Something went wrong !", {autoClose: 1000});
            console.error(e);
        } finally {
            dispatchAuth({type: LOADING_OFF});
        }
    }
    const deleteFromWishlist = async (productId) => {
        dispatchAuth({type: LOADING_ON});
        try {
            const response = await removeFromWishlist(productId, token);
            if (response.status === 200) {
                dispatchAuth({type: LOADING_OFF});
                toast.success("Item removed from wishlist", {autoClose: 1000});
                dispatch({type: "UPDATE_WISHLIST", payload: response.data.wishlist});
            }
        } catch (e) {
            toast.error("Something went wrong !", {autoClose: 1000});
            console.error(e);
        } finally {
            dispatchAuth({type: LOADING_OFF});
        }
    }
    const handleReviseItemQuantity = async (productId, actionType) => {
        dispatchAuth({type: LOADING_ON});
        try {
            const response = await modifyItemCount(productId, actionType, token);
            if (response.status === 200) {
                dispatchAuth({type: LOADING_OFF});
                dispatch({type: "UPDATE_CART", payload: response.data.cart});
                toast.success("Cart updated", {autoClose: 1000});
            }
        } catch (e) {
            toast.error("Something went wrong !", {autoClose: 1000});
            console.error(e);
        } finally {
            dispatchAuth({type: LOADING_OFF});
        }
    }

    const reviseItemQuantity = async (productId, countDirection, qty) => {
        dispatchAuth({type: LOADING_ON});

        if (countDirection === "up") {
            await handleReviseItemQuantity(productId, "increment");
        } else if (countDirection === "down") {
            const qtyOnScreen = qty - 1;
            if ((qtyOnScreen) === 0) {
                await deleteFromCart(productId);

            } else if ((qtyOnScreen) > 0) {
                await handleReviseItemQuantity(productId, "decrement");
            }
        }
    }

    const isItemInCart = (productId) => {
        return cart.some(({_id: id}) => id === productId);
    }
    const isItemInWishlist = (productId) => {
        return wishlist.some(({_id: id}) => id === productId);
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <DataContext.Provider value={{
            productslist,
            addToCart,
            addToWishlist,
            cart,
            wishlist,
            deleteFromCart,
            isPresentInCart,
            isPresentInWishlist,
            isItemInCart,
            isItemInWishlist,
            deleteFromWishlist,
            reviseItemQuantity
        }}>
            <div style={{position: 'relative'}}> {/* This container holds both children and Spinner */}
                <div style={{backgroundColor: loading ? "white" : ""}}>{children}</div>
                {loading && <Spinner/>}
                <ToastContainer/>
            </div>
        </DataContext.Provider>
    )
}