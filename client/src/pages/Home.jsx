import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndpoint";
import { Logout } from "../redux/AuthSlice";
import Form from "./Form";

export default function Home() {
	const user = useSelector((state) => state.Auth.user);
	// console.log(user);
	const navigate = useNavigate();
	const disptach = useDispatch();
	const gotoAdmin = () => {
		navigate("/admin");
	};
	const handleLogout = async () => {
		try {
			const request = await post("/api/auth/logout");
			if (request.status == 200) {
				disptach(Logout());
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="h-screen">
			<div className="flex justify-end p-4 bg-gray-900 h-1/6">
				{user && user.role === "admin" ? (
					<button
						className="mt-4 w-36 py-2 mx-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
						onClick={gotoAdmin}
					>
						Go To Admin
					</button>
				) : null}
				{user? (
					<button
					className="mt-4 w-36 py-2 mx-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onClick={() => navigate("/explore")}
				>
					Explore
				</button>
				): " "}
				{user ? (
					<button
						className="mt-4 w-36 py-2 mx-4 bg-red-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick={handleLogout}
					>
						Logout
					</button>
				) : (
					<button
						className="mt-4 w-36 py-2 mx-4 bg-green-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick={() => navigate("/login")}
					>
						Login
					</button>
				)}
				
			</div>
			<div className="grid place-items-center bg-gray-900 h-5/6">
				<div className="user-card p-4 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
					<div className="flex justify-center">
						<h2 className="text-red-400 text-4xl mb-4">
							Welcome {user && user.name}
						</h2>
					</div>
					<Form />
				</div>
			</div>
		</div>
	);
}
