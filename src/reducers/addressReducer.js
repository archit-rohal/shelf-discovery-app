import {v4 as uuid} from "uuid";

export const dummyAddress = {
    id: uuid(),
    name: "Adarsh Balika",
    houseNumber: "123",
    street: "N23",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pincode: "560037",
    phone: "9328382532",
}

export const initialAddress = [dummyAddress];

export const addressReducer = (addressState, action) => {
    switch (action.type) {
        case "ADD_ADDRESS":
            return [...addressState, action.payload];
        case "DELETE_ADDRESS":
            return addressState.filter(address => address.id !== action.payload);
        case "UPDATE_ADDRESS":
            return addressState.map(address =>
                address.id === action.payload.id ? action.payload : address
            );
        default:
            return addressState;
    }
}