import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPoll } from '../store/PollSlice';

const CreatePoll = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const dispatch = useDispatch();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredOptions = options.filter(option => option.trim() !== '');
    if (title.trim() && summary.trim() && filteredOptions.length > 0) {
      const formattedOptions = filteredOptions.map(option => ({ optiontext: option }));
      dispatch(createPoll({ title, summary, options: formattedOptions }));
      // Reset form fields after submission
      setTitle('');
      setSummary('');
      setOptions(['', '', '', '']);
      // Hide the form after successful submission
      setShowForm(false);
    } else {
      alert('Please fill in all fields and provide at least one option.');
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='max-w-lg w-full p-4 sm:p-6  rounded-lg  sm:m-6 lg:m-8 bg-gray-800 text-white'>
      {showForm ? (
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='font-semibold' htmlFor="title">Title:</label>
            <input
              className='w-full px-3 py-2 border rounded-md outline-none bg-gray-700 text-white focus:ring-2 focus:ring-blue-500'
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold' htmlFor="summary">Summary:</label>
            <input
              className='w-full px-3 py-2 border rounded-md outline-none bg-gray-700 text-white focus:ring-2 focus:ring-blue-500'
              id="summary"
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder='Summary'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Options:</label>
            {options.map((option, index) => (
              <input
                key={index}
                className='w-full my-3 px-3 py-2 border rounded-md outline-none bg-gray-700 text-white focus:ring-2 focus:ring-blue-500'
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder='Option'
              />
            ))}
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 focus:outline-none" type="submit">Create Poll</button>
        </form>
      ) : (
        <button className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 focus:outline-none" onClick={toggleForm}>Create Your Own Poll</button>
      )}
    </div>
  );
};

export default CreatePoll;
