import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPolls } from '../store/PollSlice';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Profile from '../Components/Profile';
import { VotePercentage } from '../utils/VotePercentage';

const MyPoll = () => {
    const dispatch = useDispatch();
    const { polls, loading, error } = useSelector((state) => state.poll);

    useEffect(() => {
        dispatch(fetchUserPolls());
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className='bg-gray-800 h-full'>
            <Navbar />
            <div>
                <Profile />
            </div>
            <h1 className='text-3xl font-extrabold text-gray-200 m-4 p-4'>
                My Polls
            </h1>

            <div className='flex flex-row flex-wrap justify-center m-4 rounded-lg bg-gray-800 text-white'>
                {Array.isArray(polls) && polls.length > 0 ? (
                    polls.map((poll) => {
                        const { options: optionsWithPercentage, totalVotes } = VotePercentage(poll.options || []);
                        return (
                            <div
                                className='border-2 m-3 p-3 rounded-lg bg-gray-700 w-full sm:w-1/2 md:w-1/3 lg:w-1/5'
                                key={poll._id}
                            >
                                <h2 className='font-bold'>{poll.title}</h2>
                                <label className='font-semibold'>Summary:</label>
                                <p>{poll.summary}</p>
                                <p>Polled: {formatDate(poll.createdAt)}</p>
                                <div className='rounded-lg p-2'>
                                    {optionsWithPercentage.map((option) => (
                                        <div
                                            key={option._id}
                                            className='my-2 p-1 font-medium'
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="flex justify-between mb-1">
                                                <p>{option.optiontext}</p>
                                                <p>({option.percentage}%)</p>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2.5">
                                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${option.percentage}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex justify-end'>
                                        <p>Total Votes: {totalVotes}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className='text-center p-4'>
                        <p>You have not created any polls, create one to see</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyPoll;
