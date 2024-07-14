import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get, deleteUser } from '../services/ApiEndpoint';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io';

const ExplorePage = () => {
  const [forms, setForms] = useState([]);
  const user = useSelector((state) => state.Auth.user);
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await get('/api/v1/forms');
      setForms(response.data.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast.error('Failed to fetch forms. Please try again later.');
    }
  };

  const handleDeleteForm = async (id) => {
    try {
      await deleteUser(`/api/v1/forms/${id}`);
      toast.success('Form deleted successfully.');
      fetchForms();
    } catch (error) {
      console.error('Error deleting form:', error);
      toast.error('Failed to delete form. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 mb-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <IoMdArrowRoundBack size={25} />
        </button>
      <h2 className="text-2xl font-bold mb-4">Explore Forms</h2>
      {forms.length === 0 ? (
        <p className="text-gray-600">No forms available.</p>
      ) : (
        <ul className="space-y-4">
          {forms.map((form) => (
            <li key={form._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-lg font-bold">Title: {form.title}</p>
              <p className="text-gray-700">{form.description}</p>
              <p className="text-gray-700">Created by: {user?.name || 'Unknown User'}</p>

              {user && (user.role === 'admin' || user._id === form.userId) && (
                <button
                  onClick={() => handleDeleteForm(form._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExplorePage;
