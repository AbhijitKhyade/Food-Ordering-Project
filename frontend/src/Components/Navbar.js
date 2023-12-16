import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';
import { Store } from 'react-notifications-component';
import '../Styles/navbar.css'
export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Store.addNotification({
      title: "Logged out Successfully!",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
    navigate("/login");
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            {/* Logo on the left corner */}
            <Link className="navbar-brand fs-1" to="/">FoodSwift</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>

                {(localStorage.getItem("authToken")) &&
                  <li className="nav-item">
                    <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/myOrder">My Orders</Link>
                  </li>
                }
              </ul>

              {(!localStorage.getItem("authToken")) ?
                <div className='d-flex'>
                  <Link className="nav-btn mx-1 " to="/login">Login</Link>
                  <Link className="nav-btn mx-1" to="/createuser">SignUp</Link>
                </div>
                :
                <div className='d-flex'>
                  <div>
                    <div className='nav-btn mx-2' onClick={() => { setCartView(true) }}>
                      MyCart{" "}
                      <Badge pill bg="danger">{data.length}</Badge>
                    </div>
                    {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                  </div>
                  <div>
                    <div className='nav-btn-logout mx-2' onClick={handleLogout}>Logout</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>

    </>
  )
}