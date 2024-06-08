import "./App.css";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login"
import Mockman from "mockman-js";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductCard from "./pages/Products/ProductsList/ProductCard/ProductCard";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import {RequiresAuth} from "./components/RequiresAuth";
import UserProfile from "./pages/Profile/UserProfile";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path="/mockman" element={<Mockman/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/productlist" element={<ProductsPage/>}/>
                <Route path="/product-details/:productId" element={<ProductCard/>}/>
                <Route path="/cart" element={<RequiresAuth><Cart/></RequiresAuth>}/>
                <Route path="/wishlist" element={<RequiresAuth><Wishlist/></RequiresAuth>}/>
                <Route path="/profile" element={<RequiresAuth><UserProfile/></RequiresAuth>}/>
                <Route path="/checkout" element={<RequiresAuth><Checkout/></RequiresAuth>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
