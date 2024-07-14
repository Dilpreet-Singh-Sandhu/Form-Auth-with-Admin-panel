import { useEffect, useState } from "react";
import { deleteUser, get } from "../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const request = await get("/api/admin/getuser");
        const response = request.data;
        if (request.status === 200) {
          setUsers(response.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetUsers();
  }, []);

  const handleDelet = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/delet/${id}`);
      const response = request.data;
      if (request.status === 200) {
        // Update the state to remove the deleted user
        setUsers(users.filter((user) => user._id !== id));
        toast.success(response.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="admin-container p-8 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex justify-center text-white">
          Manage Users
        </h2>
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 mb-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <IoMdArrowRoundBack size={25} />
        </button>
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-center">
            <tr>
              <th className="px-4 py-2 border-b border-gray-600 text-white">
                Name
              </th>
              <th className="px-4 py-2 border-b border-gray-600 text-white">
                Email
              </th>
              <th className="px-4 py-2 border-b border-gray-600 text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((elem, index) => (
                <tr key={index} className="even:bg-gray-700 text-center">
                  <td className="px-16 py-2 border-b border-gray-600 text-white">
                    {elem.name}
                  </td>
                  <td className="md:px-16 py-2 border-b border-gray-600 text-white">
                    {elem.email}
                  </td>
                  <td className="md:px-16 py-2 border-b border-gray-600">
                    <button
                      onClick={() => handleDelet(elem._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
