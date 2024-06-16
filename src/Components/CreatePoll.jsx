import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPoll } from '../store/PollSlice';

const CreatePoll = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
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
    } else {
      alert('Please fill in all fields and provide at least one option.');
    }
  };

  return (
    <div className='w-full md:w-3/5 lg:w-2/5 xl:w-1/4 m-2 p-4 border-2 rounded-lg'>
    <form className='w-full' onSubmit={handleSubmit}>
      <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
        <label className='font-semibold md:mr-2' htmlFor="title">Title:</label>
        <input
          className='w-full md:flex-1 px-2 py-1 rounded-md my-1 outline-none focus:ring-2 focus:ring-blue-500'
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
        />
      </div>
      <div className='flex flex-col mb-4'>
        <label className='font-semibold mb-1' htmlFor="summary">Summary:</label>
        <input
          className='w-full px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500'
          id="summary"
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder='Summary'
          required
        />
      </div>
      <div className='flex flex-col mb-4'>
        <label className='font-semibold mb-1'>Options:</label>
        {options.map((option, index) => (
          <input
            className='w-full px-2 py-1 rounded-md my-1 outline-none focus:ring-2 focus:ring-blue-500'
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder='Option'
          />
        ))}
      </div>
      <button className="text-sm border-2 m-1 p-2 font-bold rounded-lg bg-blue-500 text-white hover:bg-blue-600" type="submit">Create Poll</button>
    </form>
  </div>
  );
};

export default CreatePoll;
