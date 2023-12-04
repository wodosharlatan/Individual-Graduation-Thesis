import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Password_reset from './pages/passwordreset/password_reset';
import Password_reseted from "./pages/email_responses/password_reseted";
import User_does_not_exist from "./pages/email_responses/user_does_not_exist";
import User_verified from "./pages/email_responses/user_verified";

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/password-reset" element={<Password_reset/>}/>
        <Route path="/password-reseted42" element={<Password_reseted/>}/>
        <Route path="/user-does-not-exist" element={<User_does_not_exist/>}/>
        <Route path="/user-verified" element={<User_verified/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App;
