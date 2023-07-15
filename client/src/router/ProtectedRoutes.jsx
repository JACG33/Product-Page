import { Navigate, Outlet } from "react-router-dom";
import { useAppProvider } from "../components/context/AppProvider";

const ProtectedRoutes = ({ children, redirectPath }) => {
  const { stateUser } = useAppProvider();
  if (stateUser) return <Navigate to={redirectPath} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
