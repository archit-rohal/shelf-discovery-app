import "./Checkout.css";
import {AddressContext} from "../../contexts/AddressProvider";
import {useContext, useState} from "react";
import {DataContext} from "../../contexts/DataProvider";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";

const Checkout = () => {
    const {addressState, dummyAddress} = useContext(AddressContext);
    const {cart} = useContext(DataContext);
    const [selectedAddress, setSelectedAddress] = useState([dummyAddress]);
    const subTotal = cart.reduce((a, {qty, price}) => a + (qty * price), 0);
    const totalDiscount = cart.reduce((a, {qty, price, discountedPrice}) => a + (qty * (price - discountedPrice)), 0);
    const payableAmount = (subTotal - totalDiscount).toFixed(2);
    const handleRadioInput = (e) => {
        const filteredAddress = addressState.filter(({id}) => id === e.target.value);
        setSelectedAddress(filteredAddress);
    }
    const handleOrderPlace = () => {
        toast.success("Order placed!", {autoClose: 1000});
    }
    return (
        <div className={"checkout-page"}>
            <h1 className={"checkout-heading"}>Checkout</h1>
            <main className={"checkout-main"}>
                <section className={"address-section"}>
                    <h3 className={"checkout-legend"}>Select an address</h3>
                    {addressState.map(({id, name, houseNumber, street, city, state, country, pincode, phone}) => (
                        <label key={id} className={"address-card"}>
                            <input className={"radio-input"} type={"radio"} name={"address"}
                                   defaultChecked={id === selectedAddress[0].id} value={id}
                                   onChange={(e) => handleRadioInput(e)}/>
                            <div className={"address-details"}>
                                <span className={"radio-name"}>{name}</span>
                                <span><b>Address: </b></span>
                                <span>{houseNumber}, {street},</span>
                                <span>{city}, {state}, </span>
                                <span>{country}, {pincode}</span>
                                <span className={"user-phone"}><b>Phone: </b>{phone}</span>
                            </div>
                        </label>
                    ))}
                </section>
                <section className={"checkout-section"}>
                    <h3 className={"order-heading"}>Order summary</h3>
                    <div className={"order-details"}>
                        {cart?.map(({_id, name, price, qty, img}) => (
                            <div key={_id} className={"order-item"}>
                                <NavLink className="order-covercontainer" to={`/product-details/${_id}`}>
                                    <img className={"order-image"} src={img} alt={"product"}/>
                                </NavLink>
                                <span className={"order-price"}>{price} x {qty}</span>
                                <span className={"order-total"}>{price * qty}</span>
                            </div>
                        ))}
                        <hr className={"order-divider"}/>
                    </div>
                    <div className={"price-details"}>
                        <span className={"order-subtotal"}>Sub-total<span
                            className={"subtotal"}>{subTotal}</span></span>
                        <span className={"order-discount"}>Total discount<span
                            className={"total-discount"}>{totalDiscount}</span></span>
                        <span className={"shipping"}>Shipping<span>Free</span></span>
                        <span className="payable-cost">Total<span
                            className="payable-amount">{payableAmount}</span></span>
                    </div>
                    <hr/>
                    <div className={"delivery-address"}>
                        <p className={"da-heading"}>Delivering to</p>
                        {selectedAddress?.map(({
                                                   id,
                                                   name,
                                                   houseNumber,
                                                   street,
                                                   city,
                                                   state,
                                                   country,
                                                   pincode,
                                                   phone
                                               }) => {
                            return (
                                <div key={id} className={"selected-da"}>
                                    <span className={"da-name"}>{name}</span>
                                    <span className={"selected-address-details"}>
                                    <span>{houseNumber}, {street}, {city}, {state}, {country} - {pincode}</span>
                                    <span className={"selected-address-phone"}>{phone}</span>
                                </span>
                                </div>
                            )
                        })}
                    </div>
                    <button className={"checkout-btn"} onClick={() => handleOrderPlace()}>CHECKOUT</button>
                </section>
            </main>
        </div>
    )
}

export default Checkout
