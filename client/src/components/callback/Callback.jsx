// Callback.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const user = searchParams.get('user');

        if (user) {
            // Save user information in local storage or state
            localStorage.setItem('user', user);
            // Redirect to home
            navigate('/');
        } else {
            // Handle error
            console.error('Error logging in');
        }
    }, [location, navigate]);

    return (
        <div>
            <h2>Processing...</h2>
        </div>
    );
};

export default Callback;
