import { Routes, Route } from "react-router";
import HomePage from "./pages/Open/HomePage";
import LoginPage from "./pages/Open/LoginPage";
import SignupPage from "./pages/Open/SignUpPage";
// import UserLayout from "./pages/User/Layout";
// import Menu from "./pages/User/Menu";
// import AdminLayout from "./pages/Admin/Layout";
import LayoutCheck from "./components/LayoutCheck";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>

      <LayoutCheck />
    </>
  );
};

export default App;
