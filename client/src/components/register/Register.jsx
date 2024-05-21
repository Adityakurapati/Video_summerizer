import React from 'react';
import './register.scss';

const Register = ({ onRegister }) => {

    const handleRegister = async (event) => {
        event.preventDefault();
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
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="email" name="email" placeholder="Email" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
