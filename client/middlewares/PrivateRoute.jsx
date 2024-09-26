import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../src/store/useUserStore';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useUserStore();
    if (!isLoggedIn) {
        return <Navigate to="/public/login" />;
    }

    return (
        children
    )
}

export default PrivateRoute