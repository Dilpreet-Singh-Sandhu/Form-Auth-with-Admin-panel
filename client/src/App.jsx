import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { Toaster } from "react-hot-toast";
import AdminLaouts from "./Layouts/AdminLaouts";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/AuthSlice";
import ExplorePage from "./pages/Explore";
// import { Navigate } from "react-router-dom";

export default function App() {
  const user = useSelector((state) => state.Auth.user);
  const disptch = useDispatch();
  // console.log(`User role: ${user.role}`)

  // const navigate = useNavigate();

  useEffect(() => {
    disptch(updateUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route> */}
          <Route path="/" element={<Home/>}>

          </Route>
          <Route path="/admin" element={<AdminLaouts />}>
            <Route index element={<Admin />} />
          </Route>
          {/* <Route path="/" element={<PublicLayouts />}> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<ExplorePage />} />

          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
