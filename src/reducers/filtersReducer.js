import {filterAndSortBooks} from "../helpers/filterAndSortBooks";

export const initialFilters = {
    productsList: [],
    categories: [],
    categoryFilters: {
        "Fiction": false,
        "Non Fiction": false,
        "Self Help": false
    },
    isPriceAscendingChecked: false,
    isPriceDescendingChecked: false,
    activeBooklist: [],
    selectedRating: 0,
    searchQuery: "",
}
export const filtersReducer = (filters, action) => {
    switch (action.type) {
        case "SET_PRODUCTSLIST":
            return {...filters, productsList: action.payload, activeBooklist: action.payload};
        case "SET_SORT_DIRECTION":
            const isAscending = action.payload === "ascending";
            return {
                ...filters,
                isPriceAscendingChecked: isAscending,
                isPriceDescendingChecked: !isAscending,
                activeBooklist: filterAndSortBooks(filters.productsList, filters.categoryFilters, isAscending, !isAscending, 0, filters.selectedRating, filters.searchQuery)
            };

        case "SET_FILTER":
            const updatedCategoryFilters = {...filters.categoryFilters, [action.payload.name]: action.payload.checked};
            return {
                ...filters,
                categoryFilters: updatedCategoryFilters,
                activeBooklist: filterAndSortBooks(filters.productsList, updatedCategoryFilters, filters.isPriceAscendingChecked, filters.isPriceDescendingChecked, 0, filters.selectedRating, filters.searchQuery)
            };

        case "SET_RATING_FILTER":
            return {
                ...filters,
                selectedRating: action.payload,
                activeBooklist: filterAndSortBooks(filters.productsList, filters.categoryFilters, filters.isPriceAscendingChecked, filters.isPriceDescendingChecked, action.payload, filters.selectedRating, filters.searchQuery)
            }
        case "SET_SEARCH_RESULT":
            return {
                ...filters,
                searchQuery: action.payload,
                activeBooklist: filterAndSortBooks(filters.productsList, filters.categoryFilters, filters.isPriceAscendingChecked, filters.isPriceDescendingChecked, 0, filters.selectedRating, action.payload),
            }

        case "CLEAR_ALL_FILTERS":
            return {...initialFilters, productsList: filters.productsList, activeBooklist: filters.productsList}; //productsList is preserved to prevent its emptying after more than one clicks of 'Clear All' button
        default:
            return {...filters};
    }
}