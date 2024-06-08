import axios from "axios";

export const getAllProducts = async () => {
    return await axios.get('/api/products');
}
export const postToCart = async (pickedProduct, token) => {
    return await axios.post('/api/user/cart', {product: pickedProduct}, {headers: {'authorization': token}});
}

export const postToWishlist = async (pickedProduct, token) => {
    return await axios.post('/api/user/wishlist', {product: pickedProduct}, {headers: {'authorization': token}});
}
export const removeFromCart = async (productId, token) => {
    return await axios.delete(`/api/user/cart/${productId}`, {headers: {'authorization': token}})
}
export const removeFromWishlist = async (productId, token) => {
    return await axios.delete(`/api/user/wishlist/${productId}`, {headers: {'authorization': token}});
}
export const modifyItemCount = async (productId, countDirection, token) => {
    return await axios.post(`/api/user/cart/${productId}`, {'action': {'type': countDirection}}, {headers: {'authorization': token}})
}