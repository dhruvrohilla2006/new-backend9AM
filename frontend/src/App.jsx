import { Routes,Route } from "react-router"
import HomePage from "./pages/Open/HomePage"
import LoginPage from "./pages/Open/LoginPage"
import SignupPage from "./pages/Open/SignUpPage"



const App = () => {
  return (

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} /> 
      <Route path="/register" element={<SignupPage/>} />
    
    </Routes>

  )
}

export default App