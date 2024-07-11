import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../store/UserSlice";

const Login = () => {
    // State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // Redux state
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Prevent multiple submissions while loading
        if (loading) {
            return;
        }

        const userCredentials = { email, username, password };
        try {
            await dispatch(loginUser(userCredentials)).unwrap();
            if (isAuthenticated) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Login failed: ", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full p-6 bg-gray-800 shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-white">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-300">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white placeholder-gray-500"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-1 text-gray-300">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white placeholder-gray-500"
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white placeholder-gray-500"
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        disabled={loading} // Disable button if loading
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    {error && <p className="text-red-500">Invalid credentials: {error}</p>}
                    <p className="text-center">
                        <Link to='/register' className="text-blue-400 hover:underline">Don't have an account? Register</Link>
                    </p>
                </form>
                <p className="text-white">Please login with this credentials: Registration is down!!</p>
                <p className="text-white">email: dinesh@gmail.com</p>
                <p className="text-white">username: dinesh</p>
                <p className="text-white">password: dinesh12</p>
            </div>
        </div>
    );
};

export default Login;
