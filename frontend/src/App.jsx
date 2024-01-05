import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import New_Account from './pages/new_account/new_account';
import Password_reset from './pages/password_reset/password_reset';
import Password_reseted from "./pages/email_responses/password_reseted/password_reseted";
import User_verified from "./pages/email_responses/user_verified/user_verified";
import New_Product from "./pages/new_product/new_product";
import HomePage from "./pages/home_page/home_page";


function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/new-product" element={<New_Product/>}/>
        <Route path="/new-account" element={<New_Account/>}/>
        <Route path="/password-reset" element={<Password_reset/>}/>
        <Route path="/API/password-reset/:CODE" element={<Password_reseted/>}/>
        <Route path="/API/verify/:CODE" element={<User_verified/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App;
