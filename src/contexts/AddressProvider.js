import {createContext, useReducer} from "react";
import {addressReducer, initialAddress} from "../reducers/addressReducer";
import {dummyAddress} from "../reducers/addressReducer";

export const AddressContext = createContext();

export const AddressProvider = ({children}) => {
    const [addressState, dispatchAddress] = useReducer(addressReducer, initialAddress);
    const updateActiveAddressHandler = (address) => {
        dispatchAddress({type: "UPDATE_ADDRESS", payload: address});
    }
    const addNewAddressHandler = address => {
        dispatchAddress({type: "ADD_ADDRESS", payload: address});
    }
    const deleteAddressHandler = addressId => {
        dispatchAddress({type: "DELETE_ADDRESS", payload: addressId});
    }

    return (
        <AddressContext.Provider
            value={{
                addressState,
                dummyAddress,
                updateActiveAddressHandler,
                addNewAddressHandler,
                deleteAddressHandler,
            }}>
            {children}
        </AddressContext.Provider>
    )
}