import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Singup from "./views/Singup";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./views/UserForm";
import Verify from "./views/Verify";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/verify',
                element: <Verify />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Singup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;