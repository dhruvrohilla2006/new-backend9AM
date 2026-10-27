import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import authStore from "../store/authStore";

import UserLayout from "../pages/User/Layout";
import Menu from "../pages/User/Menu";
import AdminLayout from "../pages/Admin/Layout";

const LayoutCheck = () => {
  const { checkLogin } = authStore();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const value = await checkLogin();
        setRole(value.data.role);
      } catch (err) {
        console.error(err);
      }
    };

    verifyLogin();
  }, [checkLogin]);

  switch (role) {
    case "user":
      return (
        <UserLayout>
          <Routes>
            <Route path="/user" element={<Menu />} />
            <Route path="/dhruv" element={<h1>Hi Dhruv</h1>} />
          </Routes>
        </UserLayout>
      );

    case "admin":
      return (
        <AdminLayout>
          <Routes>
            <Route path="/admin" element={<h1>Hi From Admin</h1>} />
          </Routes>
        </AdminLayout>
      );

    default:
      return <h1>Invalid role</h1>;
  }
};

export default LayoutCheck;
