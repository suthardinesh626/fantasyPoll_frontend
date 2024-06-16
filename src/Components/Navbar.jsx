import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import logo from '../utils/logo.png'

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    // console.log(user);

    return (
        <nav className="bg-gray-300 p-4 flex justify-between items-center">
            <div className=" flex flex-row justify-center items-center text-2xl">
                <img className='h-8 mx-2' src={logo} alt="" />
                <Link to="/dashboard">FantasyPoll</Link>
            </div>
            <div className="flex items-center">
                {isAuthenticated && user && user.user.avatar ? (
                    <img
                        src={`${user.user.avatar}`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                ) : (
                    <div className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full">
                        P
                    </div>
                )}
                {/* Display user's full name if authenticated */}
                {isAuthenticated && user && (
                    <p className="ml-2 font-semibold">{user.user.fullName} </p>
                )}
                <div className='border-2 border-black rounded-md p-1 mx-2'>
                    <Logout />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
