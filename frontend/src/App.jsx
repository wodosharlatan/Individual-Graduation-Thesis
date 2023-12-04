import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Password_reset from './pages/password_reset/password_reset';
import Password_reseted from "./pages/email_responses/password_reseted/password_reseted";
import user_verified from "./pages/email_responses/user_verified/user_verified";


function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/password-reset" element={<Password_reset/>}/>
        <Route path="/password-reset/:CODE" element={<Password_reseted/>}/>
        <Route path="/verify/:CODE" element={<user_verified/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App;
