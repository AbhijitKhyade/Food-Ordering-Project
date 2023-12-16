import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import "../Styles/Register.css"
import "../App.css"
import { Store } from 'react-notifications-component';

export default function SignUp() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        name: "Name should have at least 2 characters",
        email: "Email must end with @",
        password: "Password should have at least 4 characters",
    });

    //validations 
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: "",
            email: "",
            password: "",
            geolocation: "",
        };

        if (credentials.name.trim() === "") {
            valid = false;
            newErrors.name = "Name is required";
        } else if (credentials.name.length < 2) {
            valid = false;
            newErrors.name = errorMessages.name;
        }

        if (credentials.email.trim() === "") {
            valid = false;
            newErrors.email = "Email is required";
        } else if (!credentials.email.includes("@") || !credentials.email.endsWith(".com")) {
            valid = false;
            newErrors.email = "Enter a valid email address (e.g., example@example.com)";
        }


        if (credentials.password.trim() === "") {
            valid = false;
            newErrors.password = "Password is required";
        } else if (credentials.password.length < 4) {
            valid = false;
            newErrors.password = errorMessages.password;
        }

        if (credentials.geolocation.trim() === "") {
            valid = false;
            newErrors.geolocation = "Location is required";
        }

        setErrors(newErrors);
        return valid;
    };




    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });
            const json = await response.json()
            console.log(json);


            if (!json.success) {
                Store.addNotification({
                    title: "Registration Failed!",
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
                    title: "Registration Successful!",
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
                navigate("/login");
            }
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }


    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
                <div>
                    <Navbar />
                </div>
                <div className='register-container'>
                    <form onSubmit={handleSubmit} className="register-box">
                        <div>
                            <h1>Register</h1>
                        </div>
                        <div className={`mb-3 ${errors.name ? "invalid-input" : ""}`}>
                            {/* <label htmlFor="name" className="form-label">Name</label> */}
                            <input
                                type="text"
                                className="form-control"
                                name='name' value={credentials.name}
                                onChange={onChange} id='name'
                                placeholder='Enter your Name'
                            />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className={`mb-3 ${errors.email ? "invalid-input" : ""}`}>
                            {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                            <input
                                type="email"
                                className="form-control"
                                name='email' value={credentials.email}
                                onChange={onChange} id='exampleInputEmail1'
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
                                onChange={onChange} id='exampleInputPassword1'
                                placeholder='Enter your Password'
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className={`mb-3 ${errors.geolocation ? "invalid-input" : ""}`}>
                            {/* <label htmlFor="exampleInputAddress1" className="form-label">Address</label> */}
                            <input
                                type="text"
                                className="form-control"
                                name='geolocation'
                                value={credentials.geolocation}
                                onChange={onChange} id='exampleInputPassword1'
                                placeholder='Enter your Location'
                            />
                            {errors.geolocation && <div className="text-danger">{errors.geolocation}</div>}
                        </div>
                        <button type="submit" className="m-3 btn-auth">Register</button>
                        <Link to="/login" className='m-3 btn-auth-2'>Already a user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
