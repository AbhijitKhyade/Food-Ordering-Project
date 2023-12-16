import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import { CartProvider } from "./Components/ContextReducer";
import MyOrder from "./Screens/MyOrder";
import { ReactNotifications } from 'react-notifications-component';
import "./App.css";
import './Styles/cart.css';

function App() {
  return (
    <>
      <CartProvider>
        <ReactNotifications />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/loginuser" element={<Login />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
