import React, { useState } from 'react';
import './login.scss';

const Login = ({ onLogin, setUser }) => {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/GoogleLogin';
    };

    const handleManualLogin = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading animation
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:5000/UserLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setUser({ 'name': result.user });
            localStorage.setItem('user', JSON.stringify(result.user)); // Store user in localStorage
            onLogin(result.user); // Callback to notify parent component of login
            console.log('User logged in:', result.user);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleManualLogin}>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </form>
                <button className="login-google" onClick={handleGoogleLogin}>Login with Google</button>
            </div>
            <div className="login-image"></div>
        </div>
    );
};

export default Login;
