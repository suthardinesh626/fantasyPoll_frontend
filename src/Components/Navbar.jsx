import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import logo from '../utils/logo.png';

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex flex-row sm:flex-row justify-between items-center">

            <div className="flex flex-row justify-center items-center text-xl sm:text-2xl mb-2 sm:mb-0">
                <img className='h-8 mx-2' src={logo} alt="Logo" />
                <Link to="/dashboard" className="hover:text-blue-500">FantasyPoll</Link>

            </div>
            <div className="relative">
                <button onClick={toggleDropdown} className="flex flex-row items-center sm:hidden focus:outline-none">
                    {isAuthenticated && user && user.user.avatar ? (
                        <div>
                            <img
                                src={`${user.user.avatar}`}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full">
                            P
                        </div>
                    )}
                </button>
                {dropdownOpen && (
                    <div className=" absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50">
                        <div className="py-2">

                            {isAuthenticated && user && (
                                <p className="block px-4 py-2 text-sm text-white">{user.user.fullName}</p>
                            )}
                            <div className="border-t border-gray-600"></div>
                            <div className="px-4 py-2">
                                <Logout />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="hidden sm:flex items-center">
                <div className='mx-4 text-xl font-normal' >
                    <Link to='/mypoll' >My Polls</Link>
                </div>

                {isAuthenticated && user && user.user.avatar ? (
                    <div className='flex flex-row items-center justify-center ' >

                        <img
                            src={`${user.user.avatar}`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                ) : (
                    <div className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full">
                        P
                    </div>
                )}
                {isAuthenticated && user && (
                    <p className="ml-2 font-semibold">{user.user.fullName}</p>
                )}
                <div className=' p-1 mx-2'>
                    <Logout />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
