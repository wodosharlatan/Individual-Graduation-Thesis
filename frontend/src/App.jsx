import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './home';
import PasswordReset from './passwordreset';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/password-reset" element={<PasswordReset/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App;
