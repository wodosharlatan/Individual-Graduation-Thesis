import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './pages/registration/registration';
import Password_reset from './pages/password_reset/password_reset';
import Password_reseted from "./pages/email_responses/password_reseted/password_reseted";
import User_verified from "./pages/email_responses/user_verified/user_verified";
import New_Product from "./pages/products/new_product/new_product";
import HomePage from "./pages/home_page/home_page";
import Login from "./pages/login/login_page";
import All_Products from "./pages/products/all_products/all_products";
import Category from "./pages/category/category";
import Single_Product from "./pages/products/single_product/single.jsx";
import All_Users from "./pages/users/user.jsx";
import Manage_Single_Product from "./pages/products/manage_single_product/manage_single.jsx";
import Cart from "./pages/cart/cart.jsx";
import Payment_delivery from "./pages/payment_delivery/payment_delivery.jsx";

function App() {

  return (
    <>
     <Router>
        <Routes>
        <Route path="/" element={<HomePage/>}/>
        
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/password-reset" element={<Password_reset/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/payment_delivery" element={<Payment_delivery/>}/>
        <Route path="/cart" element={<Cart/>}/>
        
        <Route path="/category/:CATEGORY_NAME" element={<Category/>}/>

        <Route path="/product/:PRODUCT_NAME" element={<Single_Product/>}/>

        <Route path="/manage/products" element={<All_Products/>}/>
        <Route path="/manage/product/:PRODUCT_NAME" element={<Manage_Single_Product/>}/>
        <Route path="/manage/users" element={<All_Users/>}/>
        <Route path="/manage/new-product" element={<New_Product/>}/>
        
        <Route path="/API/password-reseted/:CODE" element={<Password_reseted/>}/>
        <Route path="/API/verify/:CODE" element={<User_verified/>}/>
        
        <Route path="*" element={<h1>Not Found</h1>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
