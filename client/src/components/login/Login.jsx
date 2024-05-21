import React from 'react';
import './login.scss';

const Login = ({ onLogin, setUser }) => {

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/GoogleLogin';
    };

    const handleManualLogin = async (event) => {
        event.preventDefault();
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
            onLogin(result.user); // Callback to notify parent component of login
            console.log('User logged in:', result.user);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleManualLogin}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <button className="login-google" onClick={handleGoogleLogin}>Login with Google</button>
            </form>
        </div>
    );
};

export default Login;
