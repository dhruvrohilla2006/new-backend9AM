import { Routes, Route } from "react-router";
import HomePage from "./pages/Open/HomePage";
import LoginPage from "./pages/Open/LoginPage";
import SignupPage from "./pages/Open/SignUpPage";
import UserLayout from "./pages/User/Layout";
import Menu from "./pages/User/Menu";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>

      <UserLayout>
        <Routes>
          <Route path="/user" element={<Menu />} />
          <Route path="/dhruv" element={<h1>Hi Dhruv</h1>} />
        </Routes>
      </UserLayout>
    </>
  );
};

export default App;
