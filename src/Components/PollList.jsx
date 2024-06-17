import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolls, votePoll } from '../store/PollSlice';
import { VotePercentage } from '../utils/VotePercentage';

const PollsList = () => {
  const dispatch = useDispatch();
  const polls = useSelector((state) => state.poll.polls);
  const loading = useSelector((state) => state.poll.loading);
  const error = useSelector((state) => state.poll.error);

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  const handleVote = async (pollId, optionId) => {
    dispatch(votePoll({ pollId, optionId }));
    dispatch(fetchPolls());
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className='flex flex-row flex-wrap m-4  rounded-lg bg-gray-800 text-white'>
      {Array.isArray(polls) && polls.length > 0 ? (
        polls.map((poll) => {
          const { options: optionsWithPercentage, totalVotes } = VotePercentage(poll.options || []);
          return (
            <div className='border-2 m-3 p-3 rounded-lg bg-gray-700' key={poll._id}>
              <h2 className='font-bold'>{poll.title}</h2>
              <label className='font-semibold underline'>Summary:</label>
              <p>{poll.summary}</p>
              <p>Published: {formatDate(poll.createdAt)}</p>
              <div className='rounded-lg p-2'>
                {optionsWithPercentage.map((option) => (
                  <div
                    key={option._id}
                    className='my-2 p-1 font-medium'
                    onClick={() => handleVote(poll._id, option._id)}
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
        <p>No polls available</p>
      )}
    </div>
  );
};

export default PollsList;
