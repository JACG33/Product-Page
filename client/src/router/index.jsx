import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Products = lazy(() => import("../pages/Products"));
const Profile = lazy(() => import("../pages/Profile"));
import { Loader } from "../components/Loader";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<NotFound/>,
    children: [
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes redirectPath={"/products"} />,
    errorElement:<NotFound/>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
