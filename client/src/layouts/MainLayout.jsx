import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children || <Outlet/>}</main>
    </>
  );
};

export default MainLayout;
