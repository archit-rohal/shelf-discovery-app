import {createContext, useContext, useEffect, useReducer} from "react";
import {filtersReducer, initialFilters} from "../reducers/filtersReducer";
import {DataContext} from "./DataProvider";

export const FiltersContext = createContext();
export const FiltersProvider = ({children}) => {
    const [filters, dispatch] = useReducer(filtersReducer, initialFilters);
    const {productslist} = useContext(DataContext);
    const {
        categoryFilters,
        activeBooklist,
        isPriceAscendingChecked,
        isPriceDescendingChecked,
        selectedRating,
        searchQuery
    } = filters;
    const getAscending = () => {
        dispatch({type: "SET_SORT_DIRECTION", payload: "ascending"});
    }

    const getDescending = () => {
        dispatch({type: "SET_SORT_DIRECTION", payload: "descending"});
    }
    const getChecked = (e, landingPageArguments) => {
        if (!landingPageArguments) {
            const {name, checked} = e.target;
            dispatch({type: "SET_FILTER", payload: {name, checked}});
        } else if (landingPageArguments) {
            const {name, checked} = landingPageArguments;
            dispatch({type: "SET_FILTER", payload: {name, checked}});
        }

    }
    const getRating = rating => {
        dispatch({type: "SET_RATING_FILTER", payload: Number(rating)});
    }
    const getClearAll = () => {
        dispatch({type: "CLEAR_ALL_FILTERS"});
    }
    const getSearchQuery = (payloadValue) => {
        dispatch({type: "SET_SEARCH_RESULT", payload: payloadValue});
    }
    useEffect(() => {
        dispatch({type: "SET_PRODUCTSLIST", payload: productslist});
    }, [productslist]);
    return (
        <FiltersContext.Provider value={{
            getAscending,
            getDescending,
            getChecked,
            getRating,
            getClearAll,
            getSearchQuery,
            searchQuery,
            categoryFilters,
            activeBooklist,
            isPriceAscendingChecked,
            isPriceDescendingChecked,
            selectedRating,
        }}>
            {children}
        </FiltersContext.Provider>
    )
}