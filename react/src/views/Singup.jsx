import React, { useContext, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import axiosClient from "../config/axios.js";
import { useStateContext } from '../contexts/ContextProvider';

export default function Singup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        setErrors(null);
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <h1 className='title'>
                    Signup for free
                </h1>
                {errors &&
                    <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                <input ref={nameRef} type="text" placeholder='Full Name' />
                <input ref={emailRef} type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
                <button className='btn btn-block'>Login</button>
                <p className='message'>
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </>
    )
}
