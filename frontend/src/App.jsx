import { Routes,Route } from "react-router"
import HomePage from "./pages/Open/HomePage"
import Counter from "./Counter"



const App = () => {
  return (

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/counter" element={<Counter/>} />
    
    </Routes>

  )
}

export default App