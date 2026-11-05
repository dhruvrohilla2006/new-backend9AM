import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import authStore from "../store/authStore";

import UserLayout from "../pages/User/Layout";
import Menu from "../pages/User/Menu";
import AdminMenu from "../pages/Admin/AllMenu";
import AdminLayout from "../pages/Admin/Layout";
import CreateMenu from "../pages/Admin/CreateMenu";
import CartPage from "../pages/User/CartPage";

const LayoutCheck = () => {
  const userDetails = authStore((s) => s.userDetails);
  const authLoading = authStore((s) => s.authLoading);
  const checkLogin = authStore((s) => s.checkLogin);

  // Run once on app load
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  if (authLoading) return <h1>Loading...</h1>;

  const role = userDetails?.role;

  if (role === "user") {
    return (
      <UserLayout>
        <Routes>
          <Route path="/user" element={<Menu />} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path="/dhruv" element={<h1>Hi Dhruv</h1>} />
        </Routes>
      </UserLayout>
    );
  }

  if (role === "admin") {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<h1>Hi From Admin</h1>} />
          <Route path="/admin/create" element={<CreateMenu />} />
          <Route path="/admin/all" element={<AdminMenu />} />
        </Routes>
      </AdminLayout>
    );
  }

  // Not logged in: render nothing, so the public routes in App.jsx show normally
  return null;
};

export default LayoutCheck;