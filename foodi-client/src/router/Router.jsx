import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import CartPage from "../pages/shop/CartPage";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../pages/dashboard/admin/Users";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard", 
    element: <DashboardLayout />,
    children: [
      {
        path: "", 
        element: <Dashboard />,
      },
      {
        path: "users", // Relative path from '/dashboard'
        element: <Users/>,
      },
    ],
  },
]);

export default router;
