import React, { useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });


    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(err => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("User was successfully updated");
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post(`/users/`, user)
                .then(() => {
                    setNotification("User was successfully created");
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className='card animated fadeInDown'>
                {loading &&
                    <div className='text-center'>Loading...</div>
                }
                {errors &&
                    <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} type="text" placeholder='Full name' />
                        <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} type="email" placeholder='Email' />
                        <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder='Password' />
                        <input onChange={e => setUser({ ...user, password_confirmation: e.target.value })} type="password" placeholder='Password Confirmation' />
                        <button className='btn'>Save</button>
                    </form>
                }
            </div>
        </>
    )
}
