import React, { useState, useEffect } from 'react';
import axiosClient from "../config/axios.js";

export default function Verify() {
    const [timer, setTimer] = useState(60);
    const [click, setClick] = useState(false);

    useEffect(() => {
        if (click) {
            if (timer == 0) {
                setClick(false);
                setTimer(60);
            }

            const interval = setInterval(() => setTimer(timer - 1), 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const resendEmail = () => {
        setClick(true);
        setTimer(timer - 1);
        axiosClient.post('/email/resend')
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div style={{ display: 'block', marginTop: '0em' }}>
                <h1 className='title'>
                    Verify Your Email Address
                </h1>
                <p className='text-center'>
                    Your Account cannot be used until your email address has been verified.<br />
                    Don't receive email? {!click ? <a href='#' onClick={resendEmail}>Re-send email verification</a> : <span>{timer}</span>}
                </p>
            </div>
        </div>
    )
}
