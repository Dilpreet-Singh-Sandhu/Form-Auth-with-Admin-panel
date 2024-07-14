import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';

export default function Form() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    try {
      const response = await post('/api/v1/forms/new', {
        title,
        description,
        userId: user._id,
      });

      if (response.status === 201) {
        toast.success('Form submitted successfully!');
        setTitle('');
        setDescription('');
      } else {
        toast.error('Failed to submit form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="text-2xl font-bold text-center mb-4">
          <label htmlFor="title" className="block text-gray-400">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-400">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-600 rounded-lg w-full h-32 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
