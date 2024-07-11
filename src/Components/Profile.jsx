import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../store/UserSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(userDetails());
    }, [dispatch]);

    return (
        <div className='border border-gray-200 rounded-2xl m-4 p-6 sm:w-1/3'>
            <h3 className='text-gray-200 text-2xl font-semibold mb-3'>Profile</h3>
            <div>
                {loading && <p className='text-gray-200'>Loading...</p>}
                {error && <p className='text-red-500'>{error}</p>}
                {user && (
                    <div className='flex flex-col sm:flex-row'>
                        <img className='w-full sm:w-52 rounded-2xl mb-4 sm:mb-0' src={user.user.avatar} alt="Profile" />
                        <div className='flex flex-col sm:ml-4 text-gray-200 font-semibold'>
                            <p>Username: {user.user.username}</p>
                            <p>Full Name: {user.user.fullName}</p>
                            <p>Email: {user.user.email}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
