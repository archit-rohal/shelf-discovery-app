import {useContext, useState} from "react";
import {AddressContext} from "../../contexts/AddressProvider";
import "./Address.css"
import Modal from "../Modal/Modal";
import {createPortal} from "react-dom";

const Address = () => {
    const {addressState, deleteAddressHandler} = useContext(AddressContext);
    const [activeModalId, setActiveModalId] = useState(null);
    return (
        <div className={"address-content"}>
            <button className={"new-add-btn"} onClick={() => setActiveModalId('new')}><b>+</b> Add new address</button>
            <hr/>
            {activeModalId === 'new' && createPortal(<Modal onClose={() => setActiveModalId(null)} isSelected={false}
                                                            selectedId={null}/>, document.body)}
            {addressState.map(({id, name, houseNumber, street, city, state, country, pincode, phone}) => {
                return (
                    <div key={id} className={"address-card"}>
                        <span>{name}</span>
                        <div>
                            <span><b>Address: </b></span>
                            <span>{houseNumber}, {street},</span>
                            <span>{city}, {state}, </span>
                            <span>{country}, {pincode}</span>
                            <span className={"user-phone"}><b>Phone: </b>{phone}</span>
                        </div>
                        <div className={"button-group"}>
                            <button className={"edit-btn"} onClick={() => setActiveModalId(id)}>Edit</button>
                            <button className={"delete-btn"} onClick={() => deleteAddressHandler(id)}>Delete</button>
                        </div>
                        {activeModalId === id && createPortal(<Modal onClose={() => setActiveModalId(null)}
                                                                     isSelected={true}
                                                                     selectedId={id}/>, document.body)}
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default Address;
