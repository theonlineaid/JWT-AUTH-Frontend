import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Create an instance of useNavigate

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        await login({ email, password });
        console.log('Login successful');
        navigate('/');

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600">
            <div className="w-full max-w-lg px-10">
                <h2 className="text-4xl font-bold text-center text-white mb-8">
                    Login
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-transparent border border-gray-300 text-white placeholder-gray-300 text-lg rounded-lg focus:outline-none focus:border-green-400"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-transparent border border-gray-300 text-white placeholder-gray-300 text-lg rounded-lg focus:outline-none focus:border-green-400"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-green-600 px-4 py-3 rounded-full font-semibold hover:bg-gray-200 focus:outline-none transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-white mt-6">
                    Don't have an account?
                    <Link to={'/auth/register'} className="text-white underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;