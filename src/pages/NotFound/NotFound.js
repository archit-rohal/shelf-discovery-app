import "./NotFound.css"
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={"notfound"}>
            <h1 className={"error-code"}>404</h1>
            <p>Nothing to see here</p>
            <p>Why not try our search, or go back to <NavLink className={"bookstore-link"} to={"/productlist"}>our
                bookstore</NavLink>?</p>
        </div>
    )
}

export default NotFound;