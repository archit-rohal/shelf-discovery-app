import React, {useContext, useState} from 'react';
import './Modal.css';
import {AddressContext} from "../../contexts/AddressProvider";
import {v4 as uuid} from "uuid";

const Modal = ({onClose, isSelected, selectedId}) => {
    const {
        addressState,
        updateActiveAddressHandler,
        dummyAddress,
        addNewAddressHandler
    } = useContext(AddressContext);
    const selectedAddress = addressState.find(address => address.id === selectedId);
    const [formState, setFormState] = useState(isSelected ? selectedAddress : {
        id: uuid(),
        isAddressActive: true,
        name: "",
        houseNumber: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phone: ""
    });

    const {name, houseNumber, street, city, state, country, pincode, phone} = formState;

    const handleChange = e => {
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        isSelected ? updateActiveAddressHandler(formState) : addNewAddressHandler(formState);
        onClose();
    }


    const stopPropagation = e => {
        e.stopPropagation();
    }
    const handleDummyData = () => {
        setFormState({...dummyAddress, id: uuid()});
    }
    return (
        <div className={"modal"} onClick={onClose}>
            <main className="form-container" onClick={e => stopPropagation(e)}>
                <form className="address-form" onSubmit={handleSubmit}>
                    <h1 className="form-heading">Address Form</h1>
                    <input type="text" name="name" id="name" placeholder="Enter name" value={name}
                           onChange={handleChange}
                           required/>
                    <input type="text" name="houseNumber" id="houseNumber" placeholder="Enter house no."
                           value={houseNumber} onChange={handleChange} required/>
                    <input type="text" name="street" id="street" placeholder="Enter street" value={street}
                           onChange={handleChange} required/>
                    <input type="text" name="city" id="city" placeholder="Enter city" value={city}
                           onChange={handleChange}
                           required/>
                    <input type="text" name="state" id="state" placeholder="Enter state" value={state}
                           onChange={handleChange}
                           required/>
                    <input type="text" name="country" id="country" placeholder="Enter country" value={country}
                           onChange={handleChange} required/>
                    <input type="text" name="pincode" id="pincode" placeholder="Enter pincode" value={pincode}
                           onChange={handleChange} required/>
                    <input type="text" name="phone" id="phone" placeholder="Enter phone" value={phone}
                           onChange={handleChange} required/>
                    <div className="form-btn-group">
                        <button type="submit">Add</button>
                        <div className="lower-btn-group">
                            <button type="button" className="close-btn" onClick={onClose}>Close</button>
                            <button type="button" onClick={handleDummyData}>Fill dummy data</button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
export default Modal;