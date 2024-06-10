import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from "../config/axios.js";
import axios from 'axios';
import Verify from '../views/Verify.jsx';

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();
    const [verify, setVerify] = useState(false);
    const [loading, setLoading] = useState(true);

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            });
    }
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setLoading(false);
                if (data.email_verified_at == null) {
                    setVerify(true);
                }
                setUser(data);
            });
    }, []);
    return (
        <div>
            {!loading && (
                <div>
                    {!verify ? (
                        <div id='defaultLayout'>
                            <aside>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/users">Users</Link>
                            </aside>
                            <div className='content'>
                                <header>
                                    <div>
                                        Header
                                    </div>
                                    <div>
                                        {user.name}
                                        <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
                                    </div>
                                </header>
                                <main>
                                    <Outlet />
                                </main>
                            </div>
                            {notification &&
                                <div className='notification'>
                                    {notification}
                                </div>
                            }
                        </div>
                    ) : (
                        <Verify />
                    )}
                </div>
            )}
        </div>
    )
}
