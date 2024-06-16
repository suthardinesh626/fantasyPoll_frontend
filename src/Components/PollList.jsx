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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex flex-row flex-wrap m-4 border-2 rounded-lg'>
      {Array.isArray(polls) && polls.length > 0 ? (
        polls.map((poll) => {
          const { options: optionsWithPercentage, totalVotes } = VotePercentage(poll.options || []);
          return (
            <div className='border-2 m-3 p-3 rounded-lg' key={poll._id}>
              <h2 className='font-bold'>{poll.title}</h2>
              <label className='font-semibold underline' >Summary:</label>
              <p>{poll.summary}</p>
              <p>Published: {formatDate(poll.createdAt)}</p>
              <div className='rounded-lg border-2 p-2'>
                {optionsWithPercentage.map((option) => (
                  <div
                    key={option._id}
                    className='flex flex-row justify-between my-2 border-2 rounded-md p-1 font-medium'
                    onClick={() => handleVote(poll._id, option._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p>{option.optiontext}</p>
                    <p>({option.percentage}%)</p>
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
