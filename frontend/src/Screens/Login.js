import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import "../Styles/login.css"
import { Store } from 'react-notifications-component';


export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [errorMessages, setErrorMessages] = useState({
        email: "Email is required",
        password: "Password is required",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    let navigate = useNavigate();

    // Validate the login form
    const validateForm = () => {
        let valid = true;
        const newErrors = { email: "", password: "" };

        if (!credentials.email) {
            valid = false;
            newErrors.email = errorMessages.email;
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            valid = false;
            newErrors.email = "Enter a valid email address (e.g., user@example.com)";
        }

        if (!credentials.password) {
            valid = false;
            newErrors.password = errorMessages.password;
        }

        setErrors(newErrors);
        return valid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });
            const json = await response.json()
            // console.log(json);

            if (!json.success) {
                Store.addNotification({
                    title: "User Doesn't Exists!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
            }
            if (json.success) {

                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", json.authtoken);
                console.log(localStorage.getItem("authToken"));
                Store.addNotification({
                    title: "Login Successful!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                navigate("/");
            }
        }
    };


    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
                <div>
                    <Navbar />
                </div>

                <div className='login-container'>
                    <form onSubmit={handleSubmit} className='login-box'>
                        <div>
                            <h1>Login</h1>
                        </div>
                        <div className={`mb-3 ${errors.email ? "invalid-input" : ""}`}>
                            {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                            <input
                                type="email"
                                className="form-control"
                                name='email'
                                value={credentials.email}
                                onChange={onChange}
                                id='exampleInputEmail1'
                                placeholder='Enter your Email'
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className={`mb-3 ${errors.password ? "invalid-input" : ""}`}>
                            {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                            <input
                                type="password"
                                className="form-control"
                                name='password'
                                value={credentials.password}
                                onChange={onChange}
                                id='exampleInputPassword1'
                                placeholder='Enter your Password'
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>

                        <button
                            type="submit"
                            className="btn-auth"
                        >
                            Login
                        </button>
                        <div className='mt-3 new-user'>
                            <Link to="/createuser" className='btn-auth-2'>I'm a new user</Link>
                        </div>
                    </form>
                    {isSuccess && (
                        <div className="success-msg">
                            <i className="fa fa-check"> </i>
                            Login successful!
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
