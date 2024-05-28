import React, { useState } from 'react';
import './register.scss';

const Register = ({ onRegister }) => {
    const [loading, setLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading animation
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:5000/UserRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const result = await response.json();
                onRegister(result.user); // Callback to notify parent component of registration
                console.log('User registered:', result.user);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <form onSubmit={handleRegister}>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
                </form>
            </div>
            <div className="register-image"></div>
        </div>
    );
};

export default Register;
