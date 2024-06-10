import React, { useEffect, useState } from 'react'
import axiosClient from "../config/axios.js";
import { Link } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }

        axiosClient.delete(`/users/${u.id}`)
            .then(res => {
                setNotification("User was successfully deleted");
                getUsers();
            });
    }

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch((err) => {
                setLoading(false);
            });
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to="/users/new" className='btn-add' >Add new</Link>
            </div>
            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td className='text-center' colSpan={5}>
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link className='btn-edit' to={'/users/' + u.id}>Edit</Link>&nbsp;
                                        <button onClick={e => onDelete(u)} className='btn-delete'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
