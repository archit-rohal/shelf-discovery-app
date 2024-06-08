export const initialData = {
    productslist: [],
    cart: [],
    wishlist: [],
    isPresentInCart: false,
    isPresentInWishlist: false
}
export const dataReducer = (data, action) => {
    switch (action.type) {
        case "PULL_PRODUCTS":
            return {...data, productslist: action.payload};
        case "PULL_CART_ITEMS":
            return {...data, cart: action.payload};
        case "PULL_WISHLIST_ITEMS":
            return {...data, wishlist: action.payload};
        case "UPDATE_CART":
            return {...data, cart: [...action.payload]};
        case "UPDATE_WISHLIST":
            return {...data, wishlist: [...action.payload]};
        default:
            return {...data};
    }
};
