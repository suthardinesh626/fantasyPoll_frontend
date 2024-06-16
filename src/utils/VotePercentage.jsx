// utils/votePercentage.js

/**
 * Calculate the vote percentage for each option in a poll.
 * @param {Array} options - Array of options with vote counts.
 * @returns {Object} - An object containing options with vote percentages and the total votes.
 */
export const VotePercentage = (options = []) => {
  // Calculate the total number of votes
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  // Calculate percentage for each option
  const optionsWithPercentage = options.map(option => ({
    ...option,
    percentage: totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100)
  }));

  return {
    options: optionsWithPercentage,
    totalVotes
  };
};
